<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\LegalController;
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
// Invokable
Route::get('/search',SearchController::class)->name("search");
Route::get("/gallery",GalleryController::class)->name("gallery");
// Resource
Route::get('/rooms',[RoomController::class,'index']);
Route::get('/rooms/{room}',[RoomController::class,'show']);
// Static Legal Routes
Route::get("/about", [LegalController::class,'about'])->name("about");
Route::get("/contact", [LegalController::class,'contact'])->name("contact");
Route::get("/legal", [LegalController::class,'legal'])->name("legal");
Route::get("/privacy-policy", [LegalController::class,'privacyPolicy'])->name("privacy_policy");
Route::get("/terms-of-service", [LegalController::class,'TermsOfService'])->name("terms_of_service");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Middleware Auth Resource
Route::middleware('auth')->group(function () {
    Route::get('/reservations',[ReservationController::class,'index'])->name("reservations.index");
    Route::post('/reservation',[ReservationController::class,'store'])->name("reservation.store");
    Route::put('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
