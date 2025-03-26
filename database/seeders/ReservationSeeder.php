<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reservations = [
            [
                'user_id' => '1',
                'room_id' => '1',
                'check_in' => '2025-03-28',
                'check_out' => '2025-03-29',
                'nights' => 3,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => 245,
                'status' => 'active'
            ],
            [
                'user_id' => '1',
                'room_id' => '1',
                'check_in' => '2025-03-24',
                'check_out' => '2025-03-26',
                'nights' => 3,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => 245,
                'status' => 'active'
            ],
            [
                'user_id' => '1',
                'room_id' => '1',
                'check_in' => '2025-03-21',
                'check_out' => '2025-03-22',
                'nights' => 3,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => 245,
                'status' => 'active'
            ],
        ];
        foreach ($reservations as $reservation) {
            Reservation::create($reservation);
        }
    }
}
