<?php

namespace App\Exports;

use App\Models\Reservation;

class ReservationExport extends Export
{
    protected string $label = 'reservations_';
    protected array $headers = [
        'Guest',
        'Room',
        'Dates',
        'Total',
        'Status',
    ];

    protected function queryData(): iterable
    {
        return Reservation::latestReservations();
    }

    protected function mapRow($reservation): array
    {
        $room = sprintf(
            "(%s, %s)",
            $reservation->room->room_number ?? 'N/A',
            $reservation->room->name ?? 'Unknown'
        );
        $dates = sprintf(
            "(%s to %s) %s %s",
            $reservation->check_in ?? 'N/A',
            $reservation->check_out ?? 'N/A',
            $reservation->nights ?? 'N/A',
            $reservation->nights > 1 ? "nights" : "night"
        );

        return [
            $reservation->user->name,
            $room,
            $dates,
            "$" . number_format($reservation->total_price, 2),
            $reservation->status,
        ];
    }
}
