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
        // Get Room 
        $room = Room::findOrFail($attributes['room_id']);
        // Parse dates
        $checkIn = Carbon::parse($attributes['check_in']);
        $checkOut = Carbon::parse($attributes['check_out']);
        // Check for overlapping reservations
        $overlap = Reservation::where('room_id', $request->room_id)
        ->where(function ($query) use ($request) {
            $query->whereBetween('check_in', [$request->check_in, $request->check_out])
                ->orWhereBetween('check_out', [$request->check_in, $request->check_out])
                ->orWhere(function ($query) use ($request) {
                    $query->where('check_in', '<=', $request->check_in)
                            ->where('check_out', '>=', $request->check_out);
                });
        })->exists();
        if ($overlap) {
            throw ValidationException::withMessages([
                'date' => 'The selected dates overlap with an existing reservation.',
            ]);
        }
        // Calculate nights count
        $nightsCount =(int) max(0, $checkIn->diffInDays($checkOut));    
        
        // Prepare data for saving
        $attributes['user_id'] = Auth::id();
        $attributes['nights'] = $nightsCount;
        $attributes['cleaning_fee'] = 25;
        $attributes['service_fee'] = 15;
        // Get room price and calculate total price
        $totalPrice = ($room->price * $nightsCount) 
                        + $attributes['cleaning_fee'] 
                        + $attributes['service_fee'];
        $attributes['total_price'] = $totalPrice;
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
