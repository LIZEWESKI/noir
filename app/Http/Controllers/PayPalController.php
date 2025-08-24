<?php
namespace App\Http\Controllers;

use App\Mail\SuccessPayment;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
        $reservations = Reservation::where('user_id', Auth::id())
            ->where('status', 'pending')
            ->get();

        $totalAmount = $reservations->sum('total_price');
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
        Log::debug('PayPal createOrder response:', [$response]);
        $payment = Payment::create([
            'user_id' => Auth::id(),
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
                    $reservation->update(['status' => 'active']);
                }
                $reservations = $payment->reservationsWithRooms()->get();

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
}