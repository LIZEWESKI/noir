<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Coupon;
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
        $totalAmount = fake()->randomFloat(2, 100, 1000);
        $hasCoupon = fake()->boolean(40);
        $couponId = null;
        $discountAmount = null;

        if ($hasCoupon) {
            $coupon = Coupon::inRandomOrder()->first() ?? Coupon::factory()->create();
            $discountAmount = round($totalAmount * fake()->randomFloat(2, 0.05, 0.3), 2);
            $totalAmount = max($totalAmount - $discountAmount, 0);
            $couponId = $coupon->id;
        }

        return [
            'user_id' => User::factory(),
            'coupon_id' => $couponId,
            'discount_amount' => $discountAmount,
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
