<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coupons = Coupon::factory()->count(20)->create();
        $users = User::all();

        foreach ($users as $user) {
            $user->coupons()->syncWithoutDetaching($coupons->pluck('id')->toArray());
        }
    }
}
