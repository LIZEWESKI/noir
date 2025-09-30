<?php

namespace App\Http\Controllers;

use App\Exports\DashboardExport;
use App\Models\Room;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{
    public function index()
    {

        $now = Carbon::now();
        $firstDay = $now->copy()->startOfMonth();
        $lastDay = $now->copy()->endOfMonth();
        $lastMonthFirstDay = $now->copy()->subMonth()->startOfMonth();
        $lastMonthLastDay = $now->copy()->subMonth()->endOfMonth();

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
                "name" => "avg_booking_value",
                "description"  => "Average booking value",
                "value" => $paymentStats['avg_booking_value']['value'],
                "trend" => $paymentStats['avg_booking_value']['trend'],
                "type" => "currency"
            ]
        ];

        $reservations = Reservation::latestReservations();
        $charts_data = Reservation::recentBookingsForChart();

        return Inertia::render("admin/dashboard", compact("metrics","reservations","charts_data"));
    }

    public function exportCsv(): StreamedResponse
    {
        return (new DashboardExport())->exportCsv();
    }

    public function exportXlsx(): StreamedResponse
    {
        return (new DashboardExport())->exportXlsx();
    }

}
