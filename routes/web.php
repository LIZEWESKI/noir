<?php

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplyCouponController;
use App\Http\Controllers\ReservationController;

Route::get('/', function () {
    $rooms = Room::inRandomOrder()
    ->limit(3)
    ->get();
    return Inertia::render('home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'rooms' => $rooms
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

// Page Not Found
Route::fallback(function() {
    return Inertia::render('not-found')->toResponse(request())->setStatusCode(404);
});

// Middleware Auth Resource
Route::middleware('auth')->group(function () {
    Route::get('/reservations',[ReservationController::class,'index'])->name("reservations.index");
    Route::post('/reservation',[ReservationController::class,'store'])->name("reservation.store");
    Route::put('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile/reservations', [ProfileController::class, 'show'])->name('profile.reservations');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/coupons/apply', ApplyCouponController::class)->name('coupons.apply');
    Route::get('/payment', [PayPalController::class, 'paymentGateway'])->name('payment');
    Route::post('/process-transaction', [PayPalController::class, 'processTransaction'])->name('processTransaction');
    Route::get('/success-transaction', [PayPalController::class, 'successTransaction'])->name('successTransaction');
    Route::get('/cancel-transaction', [PayPalController::class, 'cancelTransaction'])->name('cancelTransaction');
    Route::get('/payments/{payment}/pdf', [PayPalController::class, 'downloadPdf'])->name('payments.pdf');
});


require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/api.php';
