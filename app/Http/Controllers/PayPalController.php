<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Coupon;
use App\Models\Payment;
use App\Models\Reservation;
use App\Mail\SuccessPayment;
use Illuminate\Http\Request;
use Illuminate\Mail\Markdown;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PayPalController extends Controller
{
    /**
     * create transaction.
     *
     * @return \Illuminate\Http\Response
     */
    public function paymentGateway(Request $request)
    {
        
        $query = $request->input("reservation");
        if(empty($query)){
            $reservations = Reservation::latest()
                ->with(['room',"user:id,name,email"])
                ->where('user_id',Auth::id())
                ->where('status', 'pending')
                ->get();
        }else {
            // This is a very naive version to handle authorization access (I should use Policy instead)
            $reservations = Reservation::where('user_id',Auth::id())
                ->with(['room',"user:id,name,email"])
                ->where("id",$query)
                ->where('status', 'pending')
                ->get();
        }
        return Inertia::render('payment/index',compact('reservations'));
    }
    /**
     * process transaction.
     *
     * @return \Illuminate\Http\Response
     */
    public function processTransaction(Request $request)
    {   
        $provider = new PayPalClient();
        $credentials = config("paypal");
        $provider->setApiCredentials($credentials);
        $paypalToken = $provider->getAccessToken();

        $reservationsIds = $request->input('reservationsIds');
        $couponId = $request->input('couponId');

        $reservations = Reservation::where('user_id',Auth::id())
            ->where('status', 'pending')
            ->whereIn('id',$reservationsIds)
            ->get();
        $totalAmount = $reservations->sum('total_price');

        if(isset($couponId))  {
            $coupon = Coupon::firstWhere("id",$couponId);
            $discount_amount = $coupon->getDiscountAmount($coupon,$totalAmount);

            $totalAmount = $coupon->calculateDiscountedAmount($coupon, $totalAmount);
        }

        // Log::debug('CouponId :', [$couponId]);
        // Log::debug('Coupon Data :', [$coupon]);
        // Log::debug('Coupon Value :', [$coupon->value]);
        // Log::debug('Coupon id :', [$coupon->id]);
        // Log::debug('Discount Amount :', [$discount_amount]);
        // Log::debug('Reservations total amount :', [$totalAmount]);

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "locale" => "en-US",
                "return_url" => route('processTransaction'),
                "cancel_url" => route('cancelTransaction'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $totalAmount
                    ]
                ]
            ]
        ], $paypalToken);
        // we want to prevent recreating payment record if it's already exist :

        // this doesn't work since response['id'] always regenerate when processing transaction
        // $payment_exist = Payment::where('transaction_id',$response['id'])->exists();
        // if($payment_exist) {
        //     return response()->json(['orderID' => $response['id']]);
        // }

        // we need a way to retrieve the actual payment record to prevent recreating a new one for the same reservation(s)
        // luckily we do have pivot table reservation_payment and we also do have reservationIds
        // the issue here is if a single payment is attached to two reservations
        // and we only want to pay for 1 reservation the payment status will be set to complete
        // 
        // which is not what we want
        // I guess I'm gonna go with easy approach here which is allowing only 1 reservation per payment

        // Actually no we attach reservations with payment only if the transaction is successful
        // if we do have two reservations and only 1 is paid, the payment will only be attached to the one we paid for 

        // so we do have reservationIds
        // we do have relationship between reservation and payment
        // we can do something like 
        // $paymentId = $reservation->payment->id 
        // with this id we can then check if the payment exists or not

        // however if a reservation does have a payment attached to it (and not paid yet meaning payment_status is set to pending)
        // and then the user decides to add a new reservation (total of 2)
        // this will leave the payment only attached to the first reservation
        // causing the second reservation to be an orphan or marked as paid

        // gonna leave this here for the next session
        $reservations->each(function($r) {
            Log::debug('payment id ',[$r->payments]);
        });
        $payment = Payment::create([
            'user_id' => Auth::id(),
            'coupon_id' => $coupon?->id ?? null,
            'discount_amount' => $discount_amount ?? null,
            'total_amount' => $totalAmount,
            'payment_status' => 'pending',
            'payment_method' => 'paypal',
            'transaction_id' => $response['id']
        ]);
        $payment->reservations()->attach($reservations->pluck('id'));

        return response()->json(['orderID' => $response['id']]);
    }

    /**
     * success transaction.
     *
     * @return \Illuminate\Http\Response
     */
    public function successTransaction(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        
        $response = $provider->capturePaymentOrder($request->token);
        
        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            // Update payment status
            $payment = Payment::where('transaction_id', $request->token)->first();
            if ($payment) {
                $payment->update(['payment_status' => 'completed']);
                // Update reservation status
                foreach ($payment->reservations as $reservation) {
                    $reservation->update(['status' => 'completed']);
                }
                $reservations = $payment->reservationsWithRooms()->get();

                // decremnting coupon's usage limit globally and per user
                $couponId = $payment->coupon_id ?? null;
                $user = Auth::user();
                if(isset($couponId)) {
                    $coupon = Coupon::firstWhere("id",$couponId);
                    $user_coupon = $user->coupons()->Firstwhere('coupon_id', $coupon->id);

                    if($coupon->global_limit > 0) {
                        $coupon->update(['global_limit' => $coupon->decrement('global_limit')]); 
                    }

                    if ($user_coupon && $user_coupon->pivot->user_limit > 0) {
                        $user->coupons()->updateExistingPivot($coupon->id, [
                            'user_limit' => $user_coupon->pivot->user_limit - 1
                        ]);
                    }
                }

                $totalAmount = $payment->total_amount;
                $orderId = $payment->transaction_id;
                
                // Redirect to success page with a success message
                Mail::to(Auth::user())->send(new SuccessPayment($payment));

                return Inertia::render('payment/success',compact('reservations',"orderId","totalAmount"));
            }
        }
        
        // Redirect to error page if something went wrong
        return redirect('/payment')->with('error', 'Something went wrong with your payment.');
        
    }
    /**
     * cancel transaction.
     *
     * @return \Illuminate\Http\Response
     */
    public function cancelTransaction(Request $request)
    {
        $payment = Payment::where('transaction_id', $request->token)->first();
        if ($payment) {
            $payment->update(['payment_status' => 'cancelled']);
        }
        return redirect('/payment')->with('success', 'Payment cancelled!');
    }

    public function downloadPdf(Payment $payment)
    {

        if ($payment->user_id !== Auth::user()->id) {
            abort(403);
        }
        $payment->load(['reservations.room','user']);
        // Since this pdf package doesn't support markdowns
        // I had to render the view as markdown first and then load it as html
        $markdown = new Markdown(view(), config('mail.markdown', []));

        $html = $markdown->render('emails.payment-success', [
            'payment' => $payment,
            'reservations' => $payment->reservations,
            'total_amount' => $payment->total_amount,
            'order_id' => $payment->transaction_id,
            'user' => $payment->user,
        ]);

        $pdf = Pdf::loadHtml($html);

        return $pdf->stream("payment-{$payment->id}.pdf");
    }
}