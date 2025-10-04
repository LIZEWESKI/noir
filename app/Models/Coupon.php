<?php

namespace App\Models;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Coupon extends Model
{
    /** @use HasFactory<\Database\Factories\CouponFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'value',
        'limit',
        'start_date',
        'end_date',
    ];

    // I still am not sure why I attached coupon to user
    // I was thinking if I can limit coupon usage per user (a user can only use a coupon code once)
    public function users()
    {
        return $this->belongsToMany(User::class, 'coupon_user','coupon_id','user_id');
    }

    public function couponCodeExists(string $code):bool {
        // this is basically for validation if it doesn't exist then throw an exception
        // if it does return true
        $coupon = Coupon::where('code' === $code)->exists();
        if(!$coupon) {
            throw ValidationException::withMessages([
                'code' => 'This coupon code is invalid please try a new one',
            ]);
        }
        return true;
    }

    public function couponCodeValid(Coupon $coupon, User $user):bool {
        // assuming that the coupon code exists
        // we first need to check if it does hit the limit
        if ($coupon->global_limit <= 0) return false;
        
        $end_date = Carbon::parse($coupon->end_date);
        $start_date = Carbon::parse($coupon->start_date);
        // and if the coupon end date is expired
        if ($end_date->isPast()) return false;
        // if the coupon code start date hasn't been reached yet
        if ($start_date->isFuture()) return false;

        // we do have something like the usage_limit
        $coupons = $user->coupons;
        $user_coupon = $coupons->firstWhere('code', $coupon->code);

        if($user_coupon?->limit_usage === 0 ) return false;
        return true;
    }

    public function calculateDiscountedAmount(Coupon $coupon, int $originalAmount): int
    {
        $discountAmount = 0;

        if ($coupon->type === 'fixed') {
            $discountAmount = (int) $coupon->value;
        } elseif ($coupon->type === 'percentage') {
            $discountAmount = $this->calculatePercentageDiscount((int) $coupon->value, $originalAmount);
        }

        return $originalAmount - $discountAmount;
    }

    private function calculatePercentageDiscount(int $percentage, int $originalAmount): int
    {
        return (int) ($percentage / 100 * $originalAmount);
    }
}
