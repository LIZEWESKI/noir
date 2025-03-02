<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $features = [
            ['name' => 'Ocean View'],
            ['name' => 'Mountain View'],
            ['name' => 'Garden View'],
            ['name' => 'Private Pool'],
            ['name' => 'Jacuzzi'],
            ['name' => 'Balcony'],
            ['name' => 'Terrace'],
            ['name' => 'Fireplace'],
            ['name' => 'Mini Bar'],
            ['name' => 'Room Service'],
            ['name' => 'Free WiFi'],
            ['name' => 'Air Conditioning'],
            ['name' => 'Flat Screen TV'],
            ['name' => 'Kitchenette'],
            ['name' => 'Coffee Maker'],
            ['name' => 'Bathrobe'],
            ['name' => 'Slippers'],
            ['name' => 'Safe Deposit Box'],
            ['name' => 'Hairdryer'],
            ['name' => 'Desk'],
        ];
        
        foreach ($features as $feature) {
            Feature::create($feature);
        }
    }
}
