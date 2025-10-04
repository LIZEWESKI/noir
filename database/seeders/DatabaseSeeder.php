<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Reservation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $initials_admins = [
            [
                'name' => 'Rick Sanchez',
                'email' => 'rick@admin.com',
                "password" => "12345678",
                "role" => "admin",
            ],
            [
                'name' => 'Morty Smith',
                'email' => 'morty@manager.com',
                "password" => "12345678",
                "role" => "manager",
            ],
            [
                'name' => 'Summer Smith',
                'email' => 'summer@receptionist.com',
                "password" => "12345678",
                "role" => "receptionist",
            ],
            [
                'name' => 'Beth Smith',
                'email' => 'beth@accountant.com',
                "password" => "12345678",
                "role" => "accountant",
            ],
            [
                'name' => 'Jerry Smith',
                'email' => 'jerry@housekeeping.com',
                "password" => "12345678",
                "role" => "housekeeping",
            ],
        ];
        foreach ($initials_admins as $user) {
            User::factory()->create($user);
        }
        $this->call(RoomSeeder::class);
        $this->call(FeatureSeeder::class);
        $this->call(FeatureRoomSeeder::class);
        $this->call(ReservationSeeder::class);
        $this->call(AuditLogSeeder::class);
        $this->call(CouponSeeder::class);
    }
}
