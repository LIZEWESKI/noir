<?php

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;

Route::get('/', function () {
    $rooms = Room::latest()->get();
    return Inertia::render('Home/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'rooms' => $rooms,
        'bg_hero' => asset('assets/hero_bg.jpg')
    ]);
})->name("home");
Route::inertia("/about","About");
Route::get("/gallery",function(){
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
});
Route::get('/rooms',[RoomController::class,'index']);
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
