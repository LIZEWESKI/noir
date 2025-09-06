<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Requests\CancelReservationRequest;

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
        $reservation->loadMissing(['user','room']);
        $unavailable_dates = Reservation::select('check_in','check_out')
            ->where('room_id', $reservation->room_id)
            ->where('status','completed')
            ->where('id', '!=', $reservation->id)
            ->get();

        // Fetch all rooms + attach their unavailable dates
        $rooms = Room::select('id', 'name', 'room_number',"guests","price")
            ->with(['reservations' => function ($q) {
                $q->select('id', 'room_id', 'check_in', 'check_out')
                ->where('status', 'completed');
            }])
            ->get();

        $rooms->each(function ($room) {
            $room->unavailable_dates = $room->reservations->map(fn($r) => [
                'check_in' => $r->check_in,
                'check_out' => $r->check_out,
            ]);
            unset($room->reservations); // optional, if you only want unavailable_dates
        });
        return Inertia::render('admin/reservations-management/edit',compact("reservation","unavailable_dates","rooms"));
    }

    public function cancel(CancelReservationRequest $request, Reservation $reservation) {
        $request->validated();
        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('admin.reservations_management.index')->with('success', 'Reservation updated successfully!');
    }
}
