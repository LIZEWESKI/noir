<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Http\Request;

class RoomsManagementController extends Controller
{
    public function index() {
        $rooms_management = Room::latest()->with("features")->get();
        $features = Feature::get(['id','name']);
        return Inertia::render('rooms-management',compact('rooms_management','features'));
    }
}
