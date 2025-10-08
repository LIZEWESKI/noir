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
        return $this->belongsToMany(User::class, 'coupon_user','coupon_id','user_id')
            ->withPivot('user_limit')
            ->withTimestamps();
    }

    public function payments() {
        return $this->hasMany(Payment::class);
    }

    public static function active() {
        return Coupon::where('start_date', '<=', today())
            ->where('end_date', '>=', today())
            ->where('global_limit', '>', 0);
    }
    public static function codeExists(string $code):bool {
        return Coupon::where('code',$code)->exists();
    }
    public static function globalLimitReached(Coupon $coupon) {
        // assuming that the coupon code exists
        // we need to check if it does hit the limit
        if ($coupon->global_limit <= 0) return true;
        return false;
    }
    public static function userLimitReached($coupon, User $user) {
        // we do have something like the user_limit
        // using that we can check if the user has reached the usage limit
        $user_coupon = $user->coupons()->Firstwhere('code', $coupon->code);

        if($user_coupon->pivot->user_limit <= 0 ) return true;
        return false;
    }
    
    public static function codeValid(Coupon $coupon):bool {
        $end_date = Carbon::parse($coupon->end_date);
        $start_date = Carbon::parse($coupon->start_date);
        // and if the coupon end date is expired
        if ($end_date->isPast()) return false;
        // if the coupon code start date hasn't been reached yet
        if ($start_date->isFuture()) return false;
        return true;
    }


    public function getDiscountAmount(float $originalAmount): float 
    {
        $discountAmount = 0;

        if ($this->type === 'fixed') {
            $discountAmount = (float) $this->value;
        } elseif ($this->type === 'percentage') {
            $discountAmount = $this->calculatePercentageDiscount((float) $this->value, $originalAmount);
        }
        return $discountAmount;
    }

    public function calculateDiscountedAmount(float $originalAmount): float
    {
        $discountAmount = $this->getDiscountAmount($originalAmount);

        return $originalAmount - $discountAmount;
    }

    private function calculatePercentageDiscount(float $percentage, float $originalAmount): float
    {
        return (float) ($percentage / 100 * $originalAmount);
    }

    protected static function booted()
    {
        static::created(function ($coupon) {
            $users = User::all();
            foreach ($users as $user) {
                $user->coupons()->syncWithoutDetaching([$coupon->id]);
            }
        });

        static::deleting(function ($coupon) {
            $coupon->users()->detach();
        });
    }

    public static function quickStats(): array
    {
        $totalCoupons = self::count();
        $activeCoupons = self::where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->count();

        $totalRedemptions = Payment::whereNotNull('coupon_id')
            ->where('payment_status', 'completed')
            ->count();

        $totalSavings = Payment::whereNotNull('coupon_id')
            ->where('payment_status', 'completed')
            ->sum('discount_amount');

        $averageDiscount = $totalRedemptions > 0
            ? round($totalSavings / $totalRedemptions, 2)
            : 0;

        return [
            [
                'key' => 'coupons',
                'title' => 'Total Coupons',
                'value' => $totalCoupons,
                'description' => "{$activeCoupons} currently active",
            ],
            [
                'key' => 'redemptions',
                'title' => 'Total Redemptions',
                'value' => $totalRedemptions,
                'description' => 'Across all coupons',
            ],
            [
                'key' => 'savings',
                'title' => 'Total Savings',
                'value' => '$' . number_format($totalSavings, 2),
                'description' => 'Given to customers',
            ],
            [
                'key' => 'average',
                'title' => 'Avg. Discount',
                'value' => '$' . number_format($averageDiscount, 2),
                'description' => 'Per redemption',
            ],
        ];
    }

    public static function recentRedemptions(int $limit = 5): array
    {
        return Payment::with(['coupon', 'user'])
            ->whereNotNull('coupon_id')
            ->where('payment_status', 'completed')
            ->latest()
            ->take($limit)
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'code' => $payment->coupon?->code ?? 'N/A',
                    'user' => $payment->user?->name ?? 'Unknown',
                    'amount' => (float) $payment->discount_amount,
                    'date' => $payment->created_at->toDateString(),
                ];
            })->toArray();
    }



}
