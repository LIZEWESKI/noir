<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $actions = [
            'USER_CREATED', 'USER_DELETED', 'USER_UPDATED',
            'RESERVATION_UPDATED','RESERVATION_CREATED', 'ROOM_CREATED', 'ROOM_DELETED',
            'ROOM_UPDATED', 'LOGIN_ATTEMPT'
        ];

        $action = $this->faker->randomElement($actions);

        return [
            'user_id' => User::where('role', 'admin')->inRandomOrder()->first()?->id ?? User::factory(),
            'action' => $action,
            'details' => ['note' => $this->faker->sentence()],
            'ip_address' => $this->faker->ipv4(),
            'created_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    
    }
}
