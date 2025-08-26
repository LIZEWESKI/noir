<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();

        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $firstDay = $now->copy()->startOfMonth();
        $lastDay = $now->copy()->endOfMonth();

        $lastMonthFirstDay = $now->copy()->subMonth()->startOfMonth();
        $lastMonthLastDay = $now->copy()->subMonth()->endOfMonth();

        $currentStats = Payment::selectRaw('COUNT(*) as totalBooking, SUM(total_amount) as totalRevenue')
            ->where('payment_status', 'completed')
            ->whereBetween('created_at', [$firstDay, $lastDay])
            ->first();

        $lastStats = Payment::selectRaw('COUNT(*) as totalBooking, SUM(total_amount) as totalRevenue')
            ->where('payment_status', 'completed')
            ->whereBetween('created_at', [$lastMonthFirstDay, $lastMonthLastDay])
            ->first();

        $calculateChange = fn($current, $previous) => $previous
            ? round((($current - $previous) / $previous) * 100, 2)
            : null;

        $roomsAvailableToday = Room::where('status', 'available')->count();

        $roomsAvailableYesterday = Room::where('status', 'available')
            ->whereDate('updated_at', '<=', $yesterday)
            ->count();

        $roomsTrend = $roomsAvailableYesterday
            ? round((($roomsAvailableToday - $roomsAvailableYesterday) / $roomsAvailableYesterday) * 100, 2)
            : null;

        $metrics = [
            (object)[
                "name" => "booking",
                "description"  => "Total bookings this month",
                "value" => (int)($currentStats->totalBooking ?? 0),
                "trend" => $calculateChange($currentStats->totalBooking ?? 0, $lastStats->totalBooking ?? 0),
                "type" => "number"
            ],
            (object)[
                "name" => "revenue",
                "description"  => "Total revenue this month",
                "value" => number_format((float)$currentStats->totalRevenue ?? 0, 2, '.', ''),
                "trend" => $calculateChange($currentStats->totalRevenue ?? 0, $lastStats->totalRevenue ?? 0),
                "type" => "currency"
            ],
            (object)[
                "name" => "rooms",
                "description"  => "Rooms Available Today",
                "value" => $roomsAvailableToday,
                "trend" => $roomsTrend,
                "type" => "number"
            ]
        ];

            $reservations = Reservation::select([
                'id',
                "user_id",
                "room_id",
                'check_in',
                'total_price',
                'status'
            ])
            ->with([
                'room:id,room_number',
                'user:id,name'
            ])
            ->latest()
            ->get();

            $bookings = Reservation::selectRaw('DATE(check_in) as date,
            SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed_count,
            SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled_count')
            ->where('check_in', '>=', now()->subMonths(3)->startOfDay())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

            $charts_data = $bookings->map(function ($item) {
                return [
                    'date' => Carbon::parse($item->date)->format('Y-m-d'),
                    'completed' => (int) $item->completed_count,
                    'cancelled' => (int) $item->cancelled_count,
                ];
            });
        return Inertia::render("dashboard",compact("metrics","reservations","charts_data"));
    }
}
