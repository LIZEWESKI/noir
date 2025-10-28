<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'guests' => 'required|numeric|min:1|max:5',
            'check_in' => 'required|date|before:check_out',
            'check_out' => 'required|date|after:check_in',
        ]);

        $checkIn = Carbon::parse($validated['check_in'])->startOfDay();
        $checkOut = Carbon::parse($validated['check_out'])->startOfDay();

        // whatever the f*ck that is.
        // Actually lets break down what this code does
        // This line is obvious
        $rooms = Room::where('guests', '>=', $validated['guests'])
            // whatever this callback func returns, won't be fetched
            ->whereDoesntHave('reservations', function ($query) use ($checkIn, $checkOut) {
                // it filters the collection based on reservation's status
                $query->where('status', 'completed')
                    ->where(function ($query) use ($checkIn, $checkOut) {
                        // it checks if the validated checkIn/checkOut dates exist between check_in and check_out dates 
                        $query->whereBetween('check_in', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out', [$checkIn, $checkOut])
                            // vice versa, if check_in and check_out dates exist between validated checkIn/checkOut dates 
                            ->orWhere(function ($query) use ($checkIn, $checkOut) {
                                $query->where('check_in', '<=', $checkIn)
                                    ->where('check_out', '>=', $checkOut);
                            });
                    });
            })
            ->latest()
            ->get();

        return Inertia::render("search",compact("rooms"));
    }
}
