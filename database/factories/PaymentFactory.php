<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Reservation;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total_amount' => fake()->randomFloat(2, 100, 1000),
            'payment_status' => fake()->randomElement(['cancelled', 'completed', 'pending']),
            'payment_method' => fake()->randomElement(['paypal', 'debit card', 'credit card']),
            'transaction_id' => Str::upper(Str::random(17)),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

        public function forReservation(Reservation $reservation): self
    {
        $paymentDate = Carbon::parse($reservation->check_in)
            ->subDays(rand(0, 2))
            ->addDays(rand(0, 1));

        return $this->state(fn () => [
            'user_id' => $reservation->user_id,
            'total_amount' => $reservation->total_price,
            'created_at' => $paymentDate,
            'updated_at' => $paymentDate,
        ]);
    }
}
