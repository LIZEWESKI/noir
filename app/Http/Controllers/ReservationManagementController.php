<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Requests\CancelReservationRequest;
use App\Http\Requests\UpdateReservationRequest;

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

        // Fetching all rooms with their unavailable dates
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
            unset($room->reservations);
        });
        return Inertia::render('admin/reservations-management/edit',compact("reservation","unavailable_dates","rooms"));
    }

    public function update(UpdateReservationRequest $request, Reservation $reservation) {
        $attributes = $request->validated();

        $room = Room::findOrFail($attributes['room_id']);
        // Parse dates
        $checkIn = Carbon::parse($attributes['check_in']);
        $checkOut = Carbon::parse($attributes['check_out']);
        
        // Check for overlapping reservations
        Reservation::checkOverLap(
            $attributes['room_id'],
            $attributes['check_in'],
            $attributes['check_out'],
            $reservation->id
        );
        // helper method to calculate nights count & the total price 
        $pricing = Reservation::calculatePricing($room, $checkIn, $checkOut);
        $attributes = array_merge($attributes, $pricing);

        // if the reservation status is completed we need to adjust some changes to payment or create a new payment record
        // else detach the relationship
        if ($attributes['status'] === 'completed') {
            // Check if reservation already has a payment
            $payment = $reservation->payments()->first();
            if ($payment) $payment->update([
                'total_amount' => $attributes['total_price'],
                'payment_status' => 'completed',
                'payment_status' => 'completed',
            ]);
            else {
                $newPayment = Payment::create([
                    'user_id' => $reservation->user_id,
                    'total_amount' => $attributes['total_price'],
                    'payment_status' => 'completed',
                    'payment_method' => 'cash',
                    'transaction_id' => 'CASH-RSV' . $reservation->id . '-' . now()->format('YmdHis'),
                ]);
                $reservation->payments()->attach($newPayment->id);
            }
        }else {
            $reservation->payments()->detach();
        }
        
        $reservation->update($attributes);
        return redirect()->route('admin.reservations_management.index')->with('success', 'Reservation updated successfully!');
    }

    public function cancel(CancelReservationRequest $request, Reservation $reservation) {
        $request->validated();
        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('admin.reservations_management.index')->with('success', 'Reservation updated successfully!');
    }
}
