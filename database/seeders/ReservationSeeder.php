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
                'check_in' => '2025-03-09',
                'check_out' => '2025-03-12',
                'nights' => 3,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => 245,
                'status' => 'confirmed'
            ],
            [
                'user_id' => '1',
                'room_id' => '1',
                'check_in' => '2025-03-15',
                'check_out' => '2025-03-18',
                'nights' => 3,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => 245,
                'status' => 'confirmed'
            ],
            [
                'user_id' => '1',
                'room_id' => '1',
                'check_in' => '2025-03-21',
                'check_out' => '2025-03-24',
                'nights' => 3,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => 245,
                'status' => 'confirmed'
            ],
        ];
        foreach ($reservations as $reservation) {
            Reservation::create($reservation);
        }
    }
}
