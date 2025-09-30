<?php

namespace App\Exports;

use App\Models\Reservation;

class DashboardExport extends Export
{
    protected string $label = 'dashbord_';
    protected array $headers = [
        'Guest Name',
        'Room Number',
        'Check-in Date',
        'Status',
        'Total Price',
    ];

    protected function queryData(): iterable
    {
        return Reservation::latestReservations();
    }

    protected function mapRow($reservation): array
    {
        return [
            $reservation->user->name ?? 'N/A',
            $reservation->room->room_number,
            $reservation->check_in,
            $reservation->status,
            "$".number_format($reservation->total_price, 2),
        ];
    }
}

