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
        $this->call(CouponSeeder::class);
        $demo_accounts = [
            [
                'name' => 'Mr. Meeseeks',
                'email' => 'meeseeks@meow.com',
                "password" => "12345678",
                "role" => "user",
                "profile_picture_path" => "/avatars/mr-meeseeks.jpeg"
            ],
            [
                'name' => 'Rick Sanchez',
                'email' => 'rick@admin.com',
                "password" => "12345678",
                "role" => "admin",
                "profile_picture_path" => "/avatars/rick.jpg"
            ],
            [
                'name' => 'Morty Smith',
                'email' => 'morty@manager.com',
                "password" => "12345678",
                "role" => "manager",
                "profile_picture_path" => "/avatars/morty.jpeg"
            ],
            [
                'name' => 'Summer Smith',
                'email' => 'summer@receptionist.com',
                "password" => "12345678",
                "role" => "receptionist",
                "profile_picture_path" => "/avatars/summer.jpg"
            ],
            [
                'name' => 'Beth Smith',
                'email' => 'beth@accountant.com',
                "password" => "12345678",
                "role" => "accountant",
                "profile_picture_path" => "/avatars/beth.jpeg"
            ],
            [
                'name' => 'Jerry Smith',
                'email' => 'jerry@housekeeping.com',
                "password" => "12345678",
                "role" => "housekeeping",
                "profile_picture_path" => "/avatars/jerry.jpeg"
            ],
        ];
        foreach ($demo_accounts as $user) {
            User::factory()->create($user);
        }
        $this->call(RoomSeeder::class);
        $this->call(FeatureSeeder::class);
        $this->call(FeatureRoomSeeder::class);
        $this->call(ReservationSeeder::class);
    }
}
