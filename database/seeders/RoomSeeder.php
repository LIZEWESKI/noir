<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $rooms = [
            ['name' => 'Standard Single Room', 'room_number' => '101', 'type' => 'Single', 'price' => 80.00, 'status' => 'Available', 'image_path' => 'rooms/1.jpg'],
            ['name' => 'Standard Single Room - Ocean View', 'room_number' => '102', 'type' => 'Single', 'price' => 85.00, 'status' => 'Booked', 'image_path' => 'rooms/2.jpg'],
            ['name' => 'Deluxe Double Room', 'room_number' => '201', 'type' => 'Double', 'price' => 120.00, 'status' => 'Available', 'image_path' => 'rooms/3.jpg'],
            ['name' => 'Deluxe Double Room - Mountain View', 'room_number' => '202', 'type' => 'Double', 'price' => 130.00, 'status' => 'Maintenance', 'image_path' => 'rooms/4.jpg'],
            ['name' => 'Luxury Double Room', 'room_number' => '203', 'type' => 'Double', 'price' => 140.00, 'status' => 'Booked', 'image_path' => 'rooms/5.jpg'],
            ['name' => 'Presidential Suite', 'room_number' => '301', 'type' => 'Suite', 'price' => 250.00, 'status' => 'Available', 'image_path' => 'rooms/6.jpg'],
            ['name' => 'Royal Suite', 'room_number' => '302', 'type' => 'Suite', 'price' => 270.00, 'status' => 'Booked', 'image_path' => 'rooms/7.jpg'],
            ['name' => 'Grand Suite', 'room_number' => '303', 'type' => 'Suite', 'price' => 300.00, 'status' => 'Maintenance', 'image_path' => 'rooms/8.jpg'],
            ['name' => 'Economy Single Room', 'room_number' => '104', 'type' => 'Single', 'price' => 90.00, 'status' => 'Available', 'image_path' => 'rooms/9.jpg'],
            ['name' => 'Budget Single Room', 'room_number' => '105', 'type' => 'Single', 'price' => 75.00, 'status' => 'Booked', 'image_path' => 'rooms/10.jpg'],
            ['name' => 'Superior Double Room', 'room_number' => '204', 'type' => 'Double', 'price' => 130.00, 'status' => 'Available', 'image_path' => 'rooms/11.jpg'],
            ['name' => 'Superior Double Room - Garden View', 'room_number' => '205', 'type' => 'Double', 'price' => 125.00, 'status' => 'Booked', 'image_path' => 'rooms/12.jpg'],
            ['name' => 'Executive Suite', 'room_number' => '304', 'type' => 'Suite', 'price' => 280.00, 'status' => 'Maintenance', 'image_path' => 'rooms/13.jpg'],
            ['name' => 'Honeymoon Suite', 'room_number' => '305', 'type' => 'Suite', 'price' => 310.00, 'status' => 'Available', 'image_path' => 'rooms/14.jpg'],
            ['name' => 'Skyline Suite', 'room_number' => '306', 'type' => 'Suite', 'price' => 320.00, 'status' => 'Booked', 'image_path' => 'rooms/15.jpg'],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
