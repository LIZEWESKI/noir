<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PaymentManagementController extends Controller
{
    public function index(Request $request)
    {
        $summary = Payment::quickStats();

        $payments = Payment::with(['user', 'reservations.room'])->whereHas('reservations')
            ->latest()
            ->get();

        return inertia('admin/payments-management/index',compact('summary','payments'));
    }

    public function exportCsv(): StreamedResponse
    {
        $fileName = 'payments_' . now()->format('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
        ];

        $callback = function () {
            $handle = fopen('php://output', 'w');

            // CSV header row
            fputcsv($handle, [
                'Payment ID',
                'Guest Name',
                'Guest Email',
                'Total Amount',
                'Status',
                'Method',
                'Transaction ID',
                'Date',
                'Reservations'
            ]);

            $payments = Payment::with(['user', 'reservations.room'])
                ->latest()
                ->get();

            foreach ($payments as $payment) {
                $reservations = $payment->reservations->map(function ($reservation) {
                    return sprintf(
                        "Room %s (%s, %s -> %s)",
                        $reservation->room->room_number ?? 'N/A',
                        $reservation->room->type ?? 'Unknown',
                        $reservation->check_in,
                        $reservation->check_out
                    );
                })->implode('; ');

                fputcsv($handle, [
                    $payment->id,
                    $payment->user->name ?? 'N/A',
                    $payment->user->email ?? 'N/A',
                    $payment->total_amount,
                    $payment->payment_status,
                    $payment->payment_method,
                    $payment->transaction_id,
                    $payment->created_at->format('Y-m-d H:i:s'),
                    $reservations,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
