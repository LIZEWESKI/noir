<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $checkIn = fake()->dateTimeBetween('-90 days', 'now');
        // checkout 1–3 nights later
        $checkOut = (clone $checkIn)->modify('+' . fake()->numberBetween(1, 3) . ' days');

        $nights = $checkIn->diff($checkOut)->days;
        $room = Room::inRandomOrder()->first();

        return [
            'user_id' => User::factory(),
            'room_id' => $room->id ?? Room::factory(), 
            'check_in' => $checkIn->format('Y-m-d'),
            'check_out' => $checkOut->format('Y-m-d'),
            'nights' => $nights,
            'cleaning_fee' => 25,
            'service_fee' => 15,
            'total_price' => fake()->numberBetween(100, 1000),
            'status' => fake()->randomElement(['pending', 'completed', 'cancelled']),
        ];
    }
}
