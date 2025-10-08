<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['fixed', 'percentage']);
        $value = $type === 'fixed'
            ? $this->faker->numberBetween(10, 20)
            : $this->faker->numberBetween(5, 40);
        $status = $this->faker->randomElement(['active', 'expired', 'upcoming']);

        switch ($status) {
            case 'expired':
                $endDate = now()->subDays($this->faker->numberBetween(1, 30));
                $startDate = $endDate->copy()->subDays($this->faker->numberBetween(5, 15));
                break;

            case 'upcoming':
                $startDate = now()->addDays($this->faker->numberBetween(2, 15));
                $endDate = $startDate->copy()->addDays($this->faker->numberBetween(5, 30));
                break;

            default:
                $startDate = now()->subDays($this->faker->numberBetween(1, 10));
                $endDate = now()->addDays($this->faker->numberBetween(5, 30));
                break;
        }
        return [
            'code' => strtoupper(Str::random(8)),
            'type' => $type,
            'value' => $value,
            'global_limit' => $this->faker->numberBetween(10, 100),
            'start_date' => $startDate,
            'end_date' => $endDate,
        ];
    }
}
