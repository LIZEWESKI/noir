<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        "total_amount",
        "payment_status",
        "payment_method",
        'nights',
        'transaction_id',
        'notes',
    ];
    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'payment_reservation');
    }
    public function reservationsWithRooms()
    {
        return $this->reservations()->with('room');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function statsForPeriod($start, $end): object
    {
        return self::selectRaw('COUNT(*) as totalBooking, SUM(total_amount) as totalRevenue')
            ->where('payment_status', 'completed')
            ->whereBetween('created_at', [$start, $end])
            ->first();
    }

    public static function averageBookingValue($start, $end)
    {
        $stats = self::selectRaw('COUNT(*) as totalBooking, SUM(total_amount) as totalRevenue')
            ->where('payment_status', 'completed')
            ->whereBetween('created_at', [$start, $end])
            ->first();

        if (!$stats || $stats->totalBooking == 0) {
            return 0;
        }

        return round($stats->totalRevenue / $stats->totalBooking, 2);
    }

    
    public static function monthlyStats(): array
    {
        $now = now();
        $firstDay = $now->copy()->startOfMonth();
        $lastDay = $now->copy()->endOfMonth();
        $lastMonthFirstDay = $now->copy()->subMonth()->startOfMonth();
        $lastMonthLastDay = $now->copy()->subMonth()->endOfMonth();

        $currentMonth = self::statsForPeriod($now->copy()->startOfMonth(), $now->copy()->endOfMonth());
        $lastMonth = self::statsForPeriod($now->copy()->subMonth()->startOfMonth(), $now->copy()->subMonth()->endOfMonth());

        $currentABV = Payment::averageBookingValue($firstDay, $lastDay);
        $lastABV = Payment::averageBookingValue($lastMonthFirstDay, $lastMonthLastDay);

        $calculateChange = fn($current, $previous) => $previous
            ? round((($current - $previous) / $previous) * 100, 2)
            : null;

        return [
            'booking' => [
                'value' => (int)($currentMonth->totalBooking ?? 0),
                'trend' => $calculateChange($currentMonth->totalBooking ?? 0, $lastMonth->totalBooking ?? 0)
            ],
            'revenue' => [
                'value' => number_format((float)($currentMonth->totalRevenue ?? 0), 2, '.', ''),
                'trend' => $calculateChange($currentMonth->totalRevenue ?? 0, $lastMonth->totalRevenue ?? 0)
            ],
            'avg_booking_value' => [
                'value' => number_format((float)($currentABV ?? 0), 2, '.', ''),
                'trend' => $calculateChange($currentABV ?? 0, $lastABV ?? 0)
            ]
        ];
    }

    public static function quickStats(): array {
        $totalRevenue = Self::where('payment_status', 'completed')->sum('total_amount');
        $totalPayments = Self::count();
        $completed = Self::where('payment_status', 'completed')->count();
        $pending = Self::where('payment_status', 'pending')->count();
        $cancelled = Self::where('payment_status', 'cancelled')->count();

        return [
            [
                "isCurrency" => true,
                'key' => 'total_revenue',
                'value' => $totalRevenue,
                'description' => 'Total revenue from completed payments',
            ],
            [
                "isCurrency" => false,
                'key' => 'total_payments',
                'value' => $totalPayments,
                'description' => 'Total number of payments',
            ],
            [
                "isCurrency" => false,
                'key' => 'completed_payments',
                'value' => $completed,
                'description' => 'Number of completed payments',
            ],
            [
                "isCurrency" => false,
                'key' => 'pending_payments',
                'value' => $pending,
                'description' => 'Number of pending payments',
            ],
            [
                "isCurrency" => false,
                'key' => 'cancelled_payments',
                'value' => $cancelled,
                'description' => 'Number of cancelled payments',
            ],
        ];
    }
}
