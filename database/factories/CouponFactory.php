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

        return [
            'code' => strtoupper(Str::random(8)),
            'type' => $type,
            'value' => $value,
            'global_limit' => $this->faker->numberBetween(10, 100),
            'start_date' => now()->subDays($this->faker->numberBetween(0, 5)),
            'end_date' => now()->addDays($this->faker->numberBetween(10, 30)),
        ];
    }
}
