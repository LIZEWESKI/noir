<?php

use App\Http\Controllers\GalleryController;
use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;

Route::get('/', function () {
    $rooms = Room::latest()->get();
    return Inertia::render('Home/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'rooms' => $rooms,
        'bg_hero' => asset('assets/hero_bg.jpg')
    ]);
})->name("home");
Route::get('/search',SearchController::class)->name("search");
Route::inertia("/about","About")->name("about");
Route::get("/gallery",GalleryController::class)->name("gallery");
Route::get('/rooms',[RoomController::class,'index']);
Route::get('/rooms/{room}',[RoomController::class,'show']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/reservations',[ReservationController::class,'index'])->name("reservations.index");
    Route::post('/reservation',[ReservationController::class,'store'])->name("reservation.store");
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
