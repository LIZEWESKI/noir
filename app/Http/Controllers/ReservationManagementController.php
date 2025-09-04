<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancelReservationRequest;
use App\Models\Reservation;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ReservationManagementController extends Controller
{
    public function index() {
        $reservations_management = Reservation::latestReservations();
        $stats = Reservation::quickStats();
        $timeline = Reservation::timeline();
        $recent_reservations = Reservation::recentLimitedReservations();
        return Inertia::render('admin/reservations-management/index',compact("reservations_management","stats","timeline","recent_reservations"));
    }
    public function edit(Reservation $reservation) {
        
        return Inertia::render('admin/reservations-management/edit',compact("reservation"));
    }

    public function cancel(CancelReservationRequest $request, Reservation $reservation) {
        $request->validated();
        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('admin.reservations_management.index')->with('success', 'Reservation updated successfully!');
    }
}
