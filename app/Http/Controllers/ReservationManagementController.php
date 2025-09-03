<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ReservationManagementController extends Controller
{
    public function index() {
        $reservations = Reservation::with(["user","room","payments"])->latest()->get();
        $stats = Reservation::quickStats();
        $timeline = Reservation::timeline();
        $recent_reservations = Reservation::recentLimitedReservations();
        return Inertia::render('admin/reservations-management/index',compact("reservations","stats","timeline","recent_reservations"));
    }
}
