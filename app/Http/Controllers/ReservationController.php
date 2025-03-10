<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

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
        return Inertia::render("Reservations/Index" ,compact('reservations'));
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
        // Parse dates and calculate nights count
        $checkIn = Carbon::parse($attributes['check_in']);
        $checkOut = Carbon::parse($attributes['check_out']);
        $nightsCount =(int) max(0, $checkIn->diffInDays($checkOut));    
        
        // Prepare data for saving
        $attributes['user_id'] = Auth::id();
        $attributes['nights'] = $nightsCount;
        $attributes['cleaning_fee'] = 25;
        $attributes['service_fee'] = 15;
        // Get room price and calculate total price
        $room = Room::findOrFail($attributes['room_id']);
        $totalPrice = ($room->price * $nightsCount) 
                        + $attributes['cleaning_fee'] 
                        + $attributes['service_fee'];
        $attributes['total_price'] = $totalPrice;
        // Save reservation
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
        $reservation->update(['status' => 'canceled']);
        return back()->with('success', 'Reservation has been canceled.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
