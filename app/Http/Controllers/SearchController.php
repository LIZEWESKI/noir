<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // $request->validate([
        //     "guests" => 'numeric|min:1|max:5',
        //     "check_in" => 'required|date|before:check_out',
        //     "check_out" => 'required|date|after:check_in'
        // ]);
        $rooms = Room::latest()->where("guests",'=',$request->input('guests'))->get();
        return Inertia::render("search",compact("rooms"));
    }
}
