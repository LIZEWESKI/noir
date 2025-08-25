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
        $firstDay = $now->copy()->startOfMonth();
        $lastDay  = $now->copy()->endOfMonth();

        $paymentStats = Payment::selectRaw('COUNT(*) as totalBooking, SUM(total_amount) as totalRevenue')
            ->where('payment_status', 'completed')
            ->whereBetween('created_at', [$firstDay, $lastDay])
            ->first();

        $roomsAvailable = Room::where('status', 'available')->count();

        $metrics = [
            (object)[
                "name" => "booking",
                "description"  => "Total bookings this month",
                "value" => (int)($paymentStats->totalBooking ?? 0),
                "type" => "number"
            ],
            (object)[
                "name" => "revenue",
                "description"  => "Total revenue this month",
                "value" => number_format((float)$paymentStats->totalRevenue, 2, '.', ''),
                "type" => "currency"
            ],
            (object)[
                "name" => "rooms",
                "description"  => "Rooms Available Today",
                "value" => (int)($roomsAvailable),
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
            SUM(CASE WHEN status = "active" THEN 1 ELSE 0 END) as completed_count,
            SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled_count')
            ->where('check_in', '>=', now()->subMonths(3)->startOfDay())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

            $bookings = $bookings->map(function ($item) {
                return [
                    'date' => \Carbon\Carbon::parse($item->date)->format('Y-m-d'),
                    'completed' => (int) $item->completed_count,
                    'cancelled' => (int) $item->cancelled_count,
                ];
            });
        return Inertia::render("dashboard",compact("metrics","reservations","bookings"));
    }
}
