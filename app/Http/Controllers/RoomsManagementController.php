<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RoomsManagementController extends Controller
{
    public function index() {
        $rooms_m = Room::latest()->with("features")->get();
        return Inertia::render('rooms-management',compact('rooms_m'));
    }
}
