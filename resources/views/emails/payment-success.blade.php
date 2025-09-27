@component('mail::message')
# Thank you for your payment {{ $user->name }}! 

**Booking ID:** {{ $order_id }}

@foreach ($reservations as $reservation)
---

**Check-in:** {{ \Carbon\Carbon::parse($reservation->check_in)->format('F j, Y') }} (from 3:00 PM)  
**Check-out:** {{ \Carbon\Carbon::parse($reservation->check_out)->format('F j, Y') }} (until 11:00 AM)  

**Accommodation:** {{ $reservation->room->name }}  
{{ $reservation->room->bed }} • {{ $reservation->room->guests }} Guests • {{ $reservation->room->size }}

@endforeach

---

**Total Amount Paid:** ${{ number_format($total_amount, 2) }}

@component('mail::button', ['url' => route('payments.pdf', $payment->id)])
Download Receipt
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
