<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Coupon;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCouponRequest;
use App\Http\Requests\UpdateCouponRequest;

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
    public function store(StoreCouponRequest $request)
    {
        $attributes = $request->validated();
        $coupon = Coupon::create($attributes);

        User::all()->each(function ($user) use ($coupon) {
            $user->coupons()->attach($coupon->id);
        });

        AuditLog::log("COUPON_CREATED", [
            'coupon_id' => $coupon->id,
            'coupon_code' => $coupon->code,
            'coupon_value' => $coupon->value,
        ]);

        return redirect()->route('admin.coupons_management.index')->with('success', 'Coupon created successfully!');
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
        return Inertia::render('admin/coupons-management/edit',compact("coupon"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        $attributes = $request->validated();

        $coupon->update($attributes);

        AuditLog::log("COUPON_UPDATED", [
            'coupon_id' => $coupon->id,
            'coupon_code' => $coupon->code,
            'coupon_value' => $coupon->value,
        ]);

        return redirect()->route('admin.coupons_management.index')->with('success', 'Coupon updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {

        $coupon->users()->detach();
        $coupon->delete();

        AuditLog::log("COUPON_DELETED", [
            'coupon_id'   => $coupon->id,
            'coupon_code' => $coupon->code,
            'coupon_value' => $coupon->value,
        ]);

        return redirect()->route('admin.coupons_management.index')->with('success', 'Coupon deleted successfully!');
    }
}
