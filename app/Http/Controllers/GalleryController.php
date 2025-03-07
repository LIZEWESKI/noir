<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $rooms = Room::latest()->get();
        $amenities = [
            ['name' => 'Elegant Lounge', 
            'image_path_url' => asset('assets/amenities/3.jpg'),
            "description" => "A mirrored wall lounge with comfy chairs for a perfect socializing spot."],
            ['name' => 'Gourmet Restaurant', 
            'image_path_url' => asset('assets/amenities/5.jpg'),
            "description" => "An elegant dining area serving a variety of cuisines with a cozy atmosphere."],
            ['name' => 'Infinity Pool', 
            'image_path_url' => asset('assets/amenities/2.jpg'),
            "description" => "A luxurious infinity pool with stunning views of the surrounding area."],
            ['name' => 'Rooftop Pool', 
            'image_path_url' => asset('assets/amenities/1.jpg'), 
            "description" => "A spacious outdoor pool perfect for relaxing under the sun."],
            ['name' => 'Family Splash Pool', 
            'image_path_url' => asset('assets/amenities/4.jpg'),
            "description" => "A heated, indoor pool offering a year-round swimming experience."],
        ];
        return Inertia::render("Gallery/Index",compact("rooms","amenities"));
    }
}