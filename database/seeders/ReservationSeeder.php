<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        Reservation::factory(400)->create()->each(function ($reservation) {
            $payment = Payment::factory()
                ->forReservation($reservation)
                ->create();

            $payment->reservations()->attach($reservation->id);
        });
    }
}

