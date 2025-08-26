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
        $paymentStats = Payment::monthlyStats();
        $roomsAvailable = Room::availableCount();
        $roomsTrend = Room::trendComparedToYesterday();

        $metrics = [
            (object)[
                "name" => "booking",
                "description" => "Total bookings this month",
                "value" => $paymentStats['booking']['value'],
                "trend" => $paymentStats['booking']['trend'],
                "type" => "number"
            ],
            (object)[
                "name" => "revenue",
                "description" => "Total revenue this month",
                "value" => $paymentStats['revenue']['value'],
                "trend" => $paymentStats['revenue']['trend'],
                "type" => "currency"
            ],
            (object)[
                "name" => "rooms",
                "description" => "Rooms Available Today",
                "value" => $roomsAvailable,
                "trend" => $roomsTrend,
                "type" => "number"
            ]
        ];

        $reservations = Reservation::latestReservations();
        $charts_data = Reservation::recentBookingsForChart();

        return Inertia::render("dashboard", compact("metrics","reservations","charts_data"));
    }
}
