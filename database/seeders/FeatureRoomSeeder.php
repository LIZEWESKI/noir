<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FeatureRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $roomFeatures = [
            ['room_id' => 1, 'feature_id' => 1],
            ['room_id' => 1, 'feature_id' => 2],
            ['room_id' => 1, 'feature_id' => 3],
        
            ['room_id' => 2, 'feature_id' => 1],
            ['room_id' => 2, 'feature_id' => 4],
            ['room_id' => 2, 'feature_id' => 5],
        
            ['room_id' => 3, 'feature_id' => 2],
            ['room_id' => 3, 'feature_id' => 4],
            ['room_id' => 3, 'feature_id' => 6],
        
            ['room_id' => 4, 'feature_id' => 3],
            ['room_id' => 4, 'feature_id' => 5],
            ['room_id' => 4, 'feature_id' => 7],
        
            ['room_id' => 5, 'feature_id' => 1],
            ['room_id' => 5, 'feature_id' => 2],
            ['room_id' => 5, 'feature_id' => 8],
        
            ['room_id' => 6, 'feature_id' => 4],
            ['room_id' => 6, 'feature_id' => 5],
            ['room_id' => 6, 'feature_id' => 9],
        
            ['room_id' => 7, 'feature_id' => 6],
            ['room_id' => 7, 'feature_id' => 7],
            ['room_id' => 7, 'feature_id' => 10],
        
            ['room_id' => 8, 'feature_id' => 2],
            ['room_id' => 8, 'feature_id' => 4],
            ['room_id' => 8, 'feature_id' => 9],
        
            ['room_id' => 9, 'feature_id' => 1],
            ['room_id' => 9, 'feature_id' => 3],
            ['room_id' => 9, 'feature_id' => 7],
        
            ['room_id' => 10, 'feature_id' => 5],
            ['room_id' => 10, 'feature_id' => 6],
            ['room_id' => 10, 'feature_id' => 8],
        
            ['room_id' => 11, 'feature_id' => 1],
            ['room_id' => 11, 'feature_id' => 7],
            ['room_id' => 11, 'feature_id' => 10],
        
            ['room_id' => 12, 'feature_id' => 2],
            ['room_id' => 12, 'feature_id' => 5],
            ['room_id' => 12, 'feature_id' => 8],
        
            ['room_id' => 13, 'feature_id' => 3],
            ['room_id' => 13, 'feature_id' => 6],
            ['room_id' => 13, 'feature_id' => 9],
        
            ['room_id' => 14, 'feature_id' => 4],
            ['room_id' => 14, 'feature_id' => 7],
            ['room_id' => 14, 'feature_id' => 10],
        
            ['room_id' => 15, 'feature_id' => 1],
            ['room_id' => 15, 'feature_id' => 4],
            ['room_id' => 15, 'feature_id' => 9]
        ];
        DB::table('feature_room')->insert($roomFeatures);
    }
}
