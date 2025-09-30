<?php

namespace App\Exports;

use App\Models\Payment;

class PaymentExport extends Export
{
    protected string $label = 'payments_';
    protected array $headers = [
        'Payment ID',
        'Guest Name',
        'Guest Email',
        'Total Amount',
        'Status',
        'Method',
        'Transaction ID',
        'Date',
        'Reservations'
    ];

    protected function queryData(): iterable
    {
        return Payment::with(['user', 'reservations.room'])
            ->latest()
            ->get();
    }

    protected function mapRow($payment): array
    {
        $reservations = $payment->reservations->map(function ($reservation) {
            return sprintf(
                "Room %s (%s, %s -> %s)",
                $reservation->room->room_number ?? 'N/A',
                $reservation->room->type ?? 'Unknown',
                $reservation->check_in,
                $reservation->check_out
            );
        })->implode('; ');

        return [
            $payment->id,
            $payment->user->name ?? 'N/A',
            $payment->user->email ?? 'N/A',
            "$" . number_format($payment->total_amount, 2),
            $payment->payment_status,
            $payment->payment_method,
            $payment->transaction_id,
            $payment->created_at->format('Y-m-d H:i:s'),
            $reservations,
        ];
    }
}
