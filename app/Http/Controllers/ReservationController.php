<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::latest()
            ->with('room')
            ->where('user_id',Auth::id())
            ->where('status', 'pending')
            ->get();

        return Inertia::render("reservations" ,compact('reservations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date|before:check_out',
            'check_out' => 'required|date|after:check_in',
        ]);

        // Check if it has more than two reservations if so redirect back with error message
        $reservations_count = Reservation::where('user_id',Auth::id())
            ->where('status', 'pending')
            ->count();
        if ($reservations_count >= 2) {
            return back()->with([
                'error' => 'We’re sorry, but you can only reserve up to two rooms at a time. Please cancel an existing reservation if you wish to book a new room.'
            ]);
        }
        // Parse dates
        $checkIn = Carbon::parse($attributes['check_in']);
        $checkOut = Carbon::parse($attributes['check_out']);
        // Check for overlapping reservations
        $isOverlap = Reservation::checkOverLap($request->room_id, $request->check_in, $request->check_out,null);
        if($isOverlap) {
            throw ValidationException::withMessages([
                'error' => 'The selected dates overlap with an existing reservation.',
            ]);
        }
        // Get Room 
        $room = Room::findOrFail($attributes['room_id']);
        // helper method to calculate nights count & the total price 
        $pricing = Reservation::calculatePricing($room, $checkIn, $checkOut);

        $attributes = array_merge($attributes, ['user_id' => Auth::id()], $pricing);
        // Save reservation and Redirect
        Reservation::create($attributes);
        return redirect()->route('reservations.index')->with('success', 'Reservation created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
    public function cancel(Reservation $reservation)
    {
        $reservation->update(['status' => 'cancelled']);
        return back()->with('success', 'Reservation has been cancelled.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
