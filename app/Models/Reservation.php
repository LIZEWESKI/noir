<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reservation extends Model
{
    use HasFactory;
    
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
    public function payments()
    {
        return $this->belongsToMany(Payment::class, 'payment_reservation');
    }


    public static function recentBookingsForChart(int $months = 3)
    {
        return self::selectRaw('DATE(check_in) as date,
            SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed_count,
            SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled_count')
            ->where('check_in', '>=', now()->subMonths($months)->startOfDay())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn($item) => [
                'date' => Carbon::parse($item->date)->format('Y-m-d'),
                'completed' => (int) $item->completed_count,
                'cancelled' => (int) $item->cancelled_count,
            ]);
    }

    public static function latestReservations()
    {
        return self::select(['id','user_id','room_id','check_in','total_price','status'])
            ->with(['room:id,room_number', 'user:id,name'])
            ->latest()
            ->get();
    }
}
