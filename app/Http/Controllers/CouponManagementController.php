<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponManagementController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Coupon::class, 'coupon');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coupons = Coupon::latest()->get();
        $stats = Coupon::quickStats();
        $recent_redemptions = Coupon::recentRedemptions();
        return Inertia::render('admin/coupons-management/index',compact("coupons","stats","recent_redemptions"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    
        return Inertia::render('admin/coupons-management/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validated();
        $coupon = Coupon::create($attributes);
        User::all()->each(function ($user) use ($coupon) {
            $user->coupons()->attach($coupon->id);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Coupon $coupon)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        //
    }
}
