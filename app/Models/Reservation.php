<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;


class Reservation extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'user_id',
        "room_id",
        "check_in",
        "check_out",
        'nights',
        'cleaning_fee',
        'service_fee',
        'total_price',
        'status',
    ];
    function user():BelongsTo {
        return $this->belongsTo(User::class);
    }
    function room():BelongsTo {
        return $this->belongsTo(Room::class)->withTrashed();
    }
    public function payments():BelongsToMany {
        return $this->belongsToMany(Payment::class, 'payment_reservation');
    }

    protected $appends = ['expired','amount_due'];

    public function updateStatus()
    {
        $checkIn = Carbon::parse($this->check_in);

        if ($checkIn->isPast() && $this->status === "pending") {
            $this->update(['status' => 'expired']);
        }
    }

    public function getExpiredAttribute() {
        $checkIn = Carbon::parse($this->check_in);
        $overlapping = self::checkOverlap($this->room_id, $this->check_in, $this->check_out);
        $pastCheckIn = now()->greaterThan($checkIn);

        return $overlapping || $pastCheckIn;
    }

    public function getAmountDueAttribute()
    {
        // We need to grab the payment attached to this reservation
        $payment = $this->payments()->first();
        // if there is no payment attached return null
        if(!$payment) return null;
        // edge case detected, we only return the amount_due 
        // if both payment and reservation statuses are completed
        if ($payment->payment_status !== 'completed' || $this->status !== 'completed') return null;
        // else get the coupon id
        $coupon_id = $payment->coupon_id;
        // find the coupon by id
        $coupon = Coupon::find($coupon_id);
        // if there is no coupon return null
        if (!$coupon) return null; 
        // else get the type/value
        $coupon_type = $coupon->type;
        $coupon_value = $coupon->value;
        // if we do have only 1 reservation we simply return the payment total amount
        $count = $payment->reservations()->count();
        if($count === 1) return $payment->total_amount;
        // if coupon type is percentage 
        $discount_amount = null;
        if($coupon_type === "percentage") {
            // then calculate the amount due based on this reservation's total price and the coupon value
            // to calculate the amount due we need to follow the formula bellow:
            // discount amount = (reservation total price * percentage (e.g 20% = 0.20))
            // reservation total price - discount amount = amount due
            $discount_amount = $coupon->calculatePercentageDiscount($coupon_value,$this->total_price);
            return $this->total_price - $discount_amount;
        }
        // else if coupon type is fixed
        // we need to check if this payment has two reservations (if we get this far it is up to 2 reservations)
        // (we know we only accept up to 2 reservations per payment however we can make it dynamic by getting the count value using something like $payment->reservations()->count())
        // using that count value we can then define the amount due with this formula below:
        // reservation total price - (code value / count) 
        $discount_amount = $coupon_value / $count;
        return  $this->total_price - $discount_amount;
        // 190.00 - ( 11 / 2 )  = 195.5
        // 160.00 - ( 11 / 2 )  = 165.5
        // sum should be 339.00
    }

    public static function checkOverLap($roomId, $checkIn, $checkOut, $ignoreId = null): bool{
        $overlap = self::where('room_id', $roomId)
            ->where('status', 'completed')
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId)) // skip current reservation when editing
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out', [$checkIn, $checkOut])
                    ->orWhere(function ($query) use ($checkIn, $checkOut) {
                        $query->where('check_in', '<=', $checkIn)
                            ->where('check_out', '>=', $checkOut);
                    });
            })
        ->exists();
        if ($overlap) return true;
        return false;
    }

    public static function calculatePricing(Room $room, $checkIn, $checkOut): array {
        $nights = max(0, $checkIn->diffInDays($checkOut));

        $cleaningFee = 25;
        $serviceFee  = 15;

        $total = ($room->price * $nights) + $cleaningFee + $serviceFee;

        return [
            'nights'        => $nights,
            'cleaning_fee'  => $cleaningFee,
            'service_fee'   => $serviceFee,
            'total_price'   => $total,
        ];
    }

    // for dashboard page
    public static function recentBookingsForChart(int $months = 3) {
        return self::selectRaw('DATE(created_at) as date,
            SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END) as completed_count,
            SUM(CASE WHEN status = \'cancelled\' THEN 1 ELSE 0 END) as cancelled_count')
            ->where('created_at', '>=', now()->subMonths($months)->startOfDay())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn($item) => [
                'date' => Carbon::parse($item->date)->format('Y-m-d'),
                'completed' => (int) $item->completed_count,
                'cancelled' => (int) $item->cancelled_count,
            ]);
    }

    public static function latestReservations(){
        return self::select(['id','user_id','room_id','check_in','check_out','nights','total_price','service_fee','cleaning_fee','status'])
            ->with(['room:id,room_number,name', 'user:id,name,profile_picture_path,google_id,email'])
            ->latest()
            ->get();
    }

    // for reservations management page

    public static function quickStats(): array {
        $todayCheckIns = self::whereDate('check_in', today())->count();

        $todayCheckOuts = self::whereDate('check_out', today())->count();

        $totalRooms = Room::count();

        $occupiedRooms = self::where('status', 'completed')
            ->whereDate('check_in', '<=', today())
            ->whereDate('check_out', '>=', today())
            ->count();

        $occupancyPercentage = $totalRooms > 0
            ? round(($occupiedRooms / $totalRooms) * 100, 2)
            : 0;

        $pendingActions = self::where('status', 'pending')->count();

        return [
            [
                "key" => "checkins",
                'title' => "Today's Check-ins",
                'value' => $todayCheckIns,
                'description' => 'Expected arrivals',
            ],
            [
                "key" => "checkouts",
                'title' => "Today's Check-outs",
                'value' => $todayCheckOuts,
                'description' => 'Scheduled departures',
            ],
            [
                "key" => "occupancy",
                'title' => "Current Occupancy",
                'value' => $occupancyPercentage . '%',
                'description' => "{$occupiedRooms} of {$totalRooms} rooms",
            ],
            [
                "key" => "pending",
                'title' => "Pending Actions",
                'value' => $pendingActions,
                'description' => 'Require attention',
            ],
        ];
    }

    public static function recentLimitedReservations() {
        return self::select(['id','user_id','room_id','check_in','check_out','total_price','status'])
            ->with(['room:id,room_number,name', 'user:id,name,profile_picture_path,google_id'])
            ->latest()
            ->limit(8)
            ->get();
    }

    public static function timeline(): Collection {
        $today = Carbon::today();
        $tomorrow = Carbon::tomorrow();

        $dates = [
            'Today' => $today,
            'Tomorrow' => $tomorrow,
        ];

        $timeline = collect();

        foreach ($dates as $label => $date) {
            $checkIns = self::with(['user', 'room'])
                ->whereDate('check_in', $date)
                ->limit(2)
                ->get()
                ->map(fn($res) => [
                    'id' => $res->id,
                    'user_name' => $res->user->name,
                    'room_number' => $res->room->room_number,
                    'profile_picture_path' => $res->user->profile_picture_path,
                    'profile_picture_url' => $res->user->profile_picture_url,
                    'google_id' => $res->user->google_id
                ]);
                
            $checkOuts = self::with(['user', 'room'])
                ->whereDate('check_out', $date)
                ->limit(2)
                ->get()
                ->map(fn($res) => [
                    'id' => $res->id,
                    'user_name' => $res->user->name,
                    'room_number' => $res->room->room_number,
                    'profile_picture_path' => $res->user->profile_picture_path,
                    'profile_picture_url' => $res->user->profile_picture_url,
                    'google_id' => $res->user->google_id
                ]);

            $timeline->push([
                'date' => $label,
                'checkOuts' => $checkOuts,
                'checkIns' => $checkIns,
            ]);
        }

        return $timeline;
    }

    /**
     * Get reservations with rooms, replacing deleted rooms with ghost data.
    */
    // This method still not workin yet but will keep it for ref x)
    public static function withGhostedRooms(){
        return self::with(["room", "user"])->get()->map(function ($reservation) {
            if ($reservation->room && $reservation->room->trashed()) {
                // Replace room properties with ghost data
                $reservation->room = (object) Room::$ghostData;
            }
            return $reservation;
        });
    }
    
}
