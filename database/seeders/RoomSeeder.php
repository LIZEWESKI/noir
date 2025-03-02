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
            [
                'room_number' => '101',
                'name' => 'Standard Single Room',
                'type' => 'Single',
                'price' => 80.00,
                'status' => 'Available',
                'size' => '20 m²',
                'guests' => 1,
                'bed' => '1 Single Bed',
                'bathrooms' => 1,
                'description' => 'A cozy room ideal for solo travelers, featuring modern amenities and a comfortable single bed.',
                'image_path' => 'rooms/1.jpg'
            ],
            [
                'room_number' => '102',
                'name' => 'Standard Single Room - Ocean View',
                'type' => 'Single',
                'price' => 85.00,
                'status' => 'Booked',
                'size' => '22 m²',
                'guests' => 1,
                'bed' => '1 Single Bed',
                'bathrooms' => 1,
                'description' => 'A tranquil single room with stunning ocean views, perfect for relaxing and unwinding.',
                'image_path' => 'rooms/2.jpg'
            ],
            [
                'room_number' => '104',
                'name' => 'Economy Single Room',
                'type' => 'Single',
                'price' => 90.00,
                'status' => 'Available',
                'size' => '18 m²',
                'guests' => 1,
                'bed' => '1 Single Bed',
                'bathrooms' => 1,
                'description' => 'An affordable and comfortable single room, ideal for travelers on a budget.',
                'image_path' => 'rooms/3.jpg'
            ],
            [
                'room_number' => '105',
                'name' => 'Budget Single Room',
                'type' => 'Single',
                'price' => 75.00,
                'status' => 'Booked',
                'size' => '17 m²',
                'guests' => 1,
                'bed' => '1 Single Bed',
                'bathrooms' => 1,
                'description' => 'A simple yet comfortable single room for those seeking affordability and convenience.',
                'image_path' => 'rooms/4.jpg'
            ],
            [
                'room_number' => '201',
                'name' => 'Deluxe Double Room',
                'type' => 'Double',
                'price' => 120.00,
                'status' => 'Available',
                'size' => '35 m²',
                'guests' => 2,
                'bed' => '1 King Bed',
                'bathrooms' => 1,
                'description' => 'A spacious double room with elegant decor, featuring a king-size bed and modern facilities.',
                'image_path' => 'rooms/5.jpg'
            ],
            [
                'room_number' => '202',
                'name' => 'Deluxe Double Room - Mountain View',
                'type' => 'Double',
                'price' => 130.00,
                'status' => 'Maintenance',
                'size' => '38 m²',
                'guests' => 2,
                'bed' => '1 King Bed',
                'bathrooms' => 1,
                'description' => 'Enjoy breathtaking mountain views from this deluxe double room, offering both comfort and style.',
                'image_path' => 'rooms/6.jpg'
            ],
            [
                'room_number' => '203',
                'name' => 'Luxury Double Room',
                'type' => 'Double',
                'price' => 140.00,
                'status' => 'Booked',
                'size' => '40 m²',
                'guests' => 2,
                'bed' => '1 Queen Bed',
                'bathrooms' => 1,
                'description' => 'A lavish double room with refined furnishings, offering a queen-size bed and elegant ambiance.',
                'image_path' => 'rooms/7.jpg'
            ],
            [
                'room_number' => '204',
                'name' => 'Superior Double Room',
                'type' => 'Double',
                'price' => 130.00,
                'status' => 'Available',
                'size' => '36 m²',
                'guests' => 2,
                'bed' => '1 Queen Bed',
                'bathrooms' => 1,
                'description' => 'An elegant double room with modern amenities and a spacious queen bed.',
                'image_path' => 'rooms/8.jpg'
            ],
            [
                'room_number' => '301',
                'name' => 'Presidential Suite',
                'type' => 'Suite',
                'price' => 250.00,
                'status' => 'Available',
                'size' => '80 m²',
                'guests' => 4,
                'bed' => '2 King Beds',
                'bathrooms' => 2,
                'description' => 'An opulent suite designed for luxury, featuring spacious living areas, two king-size beds, and premium amenities.',
                'image_path' => 'rooms/9.jpg'
            ],
            [
                'room_number' => '302',
                'name' => 'Royal Suite',
                'type' => 'Suite',
                'price' => 270.00,
                'status' => 'Booked',
                'size' => '85 m²',
                'guests' => 4,
                'bed' => '2 King Beds',
                'bathrooms' => 2,
                'description' => 'A regal suite offering luxury and comfort, complete with two king-size beds and a private lounge.',
                'image_path' => 'rooms/10.jpg'
            ],
            [
                'room_number' => '303',
                'name' => 'Grand Suite',
                'type' => 'Suite',
                'price' => 300.00,
                'status' => 'Maintenance',
                'size' => '90 m²',
                'guests' => 4,
                'bed' => '2 King Beds',
                'bathrooms' => 2,
                'description' => 'The epitome of grandeur, featuring spacious interiors, two luxurious beds, and an exclusive lounge area.',
                'image_path' => 'rooms/11.jpg'
            ],
            [
                'room_number' => '304',
                'name' => 'Penthouse Suite',
                'type' => 'Suite',
                'price' => 350.00,
                'status' => 'Available',
                'size' => '100 m²',
                'guests' => 5,
                'bed' => '2 King Beds, 1 Single Bed',
                'bathrooms' => 3,
                'description' => 'An exclusive penthouse suite offering luxury, privacy, and a stunning panoramic view.',
                'image_path' => 'rooms/12.jpg'
            ],
            [
                'room_number' => '305',
                'name' => 'Family Suite',
                'type' => 'Suite',
                'price' => 200.00,
                'status' => 'Booked',
                'size' => '70 m²',
                'guests' => 4,
                'bed' => '1 King Bed, 2 Single Beds',
                'bathrooms' => 2,
                'description' => 'A spacious family suite perfect for vacations, featuring a mix of king and single beds.',
                'image_path' => 'rooms/13.jpg'
            ],
            [
                'room_number' => '306',
                'name' => 'Junior Suite',
                'type' => 'Suite',
                'price' => 220.00,
                'status' => 'Available',
                'size' => '60 m²',
                'guests' => 3,
                'bed' => '1 Queen Bed, 1 Sofa Bed',
                'bathrooms' => 1,
                'description' => 'A stylish junior suite with modern furnishings and additional space for extra comfort.',
                'image_path' => 'rooms/14.jpg'
            ],
            [
                'room_number' => '307',
                'name' => 'Executive Suite',
                'type' => 'Suite',
                'price' => 280.00,
                'status' => 'Booked',
                'size' => '75 m²',
                'guests' => 3,
                'bed' => '1 King Bed, 1 Sofa Bed',
                'bathrooms' => 1,
                'description' => 'A sleek executive suite designed for business travelers, offering luxury and functionality.',
                'image_path' => 'rooms/15.jpg'
            ]
        ];
        
        
        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}
