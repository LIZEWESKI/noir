<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roomsCount = Room::count();
        
        $reservations = collect(range(1,$roomsCount))->map(fn($i) => [
            'user_id' => '1',
            'room_id' => $i,
            'check_in' => now()->format('Y-m-d'),
            'check_out' => now()->addDays(2)->format('Y-m-d'),
            'nights' => 3,
            'cleaning_fee' => 25,
            'service_fee' => 15,
            'total_price' => 245,
            'status' => 'active'
        ])->toArray();
        // $reservations = [
        //     [
        //         'user_id' => '1',
        //         'room_id' => '1',
        //         'check_in' => '2025-03-28',
        //         'check_out' => '2025-03-29',
        //         'nights' => 3,
        //         'cleaning_fee' => 25,
        //         'service_fee' => 15,
        //         'total_price' => 245,
        //         'status' => 'active'
        //     ],
        //     [
        //         'user_id' => '1',
        //         'room_id' => '1',
        //         'check_in' => '2025-03-24',
        //         'check_out' => '2025-03-26',
        //         'nights' => 3,
        //         'cleaning_fee' => 25,
        //         'service_fee' => 15,
        //         'total_price' => 245,
        //         'status' => 'active'
        //     ],
        //     [
        //         'user_id' => '1',
        //         'room_id' => '1',
        //         'check_in' => '2025-03-21',
        //         'check_out' => '2025-03-22',
        //         'nights' => 3,
        //         'cleaning_fee' => 25,
        //         'service_fee' => 15,
        //         'total_price' => 245,
        //         'status' => 'active'
        //     ],
        // ];
        foreach ($reservations as $reservation) {
            Reservation::create($reservation);
        }
    }
}
