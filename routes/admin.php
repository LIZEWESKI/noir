<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoomManagementController;
use App\Http\Controllers\GuestManagementController;
use App\Http\Controllers\ReservationManagementController;

Route::middleware(['auth', AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

    // Minus point Laravel, +1 React Router for implementing the Indexed route :D
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });
    
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Rooms Management ressource (I could use Resource instead but I don't feel like it)
    Route::get("/rooms-management",[RoomManagementController::class, 'index'])
        ->name('rooms_management.index');
    Route::get("/rooms-management/create",[RoomManagementController::class, 'create'])
        ->name('rooms_management.create');
    Route::post("/rooms-management",[RoomManagementController::class, 'store'])
        ->name('rooms_management.store');
    Route::get("/rooms-management/edit/{room}",[RoomManagementController::class, 'edit'])
        ->name('rooms_management.edit');
    Route::post("/rooms-management/{room}",[RoomManagementController::class, 'update'])
        ->name('rooms_management.update');
    Route::delete('/rooms-management/{room}',[RoomManagementController::class, 'destroy'])
        ->name('rooms_management.destroy');
    
    // Guests Management ressource
    Route::get("/guests-management",[GuestManagementController::class,'index'])
        ->name('guests_management.index');
    Route::get("/guests-management/{user}",[GuestManagementController::class,'show'])
        ->name('/guests_management.show');
    Route::delete('/guests-management/destroy/{user}', [GuestManagementController::class, 'destroy'])
        ->name('guests-management.destroy');

    // Reservations Management ressource
    Route::get("/reservations-management",[ReservationManagementController::class, 'index'])
        ->name('reservations_management.index');
    Route::get("/reservations-management/create",[ReservationManagementController::class, 'create'])
        ->name('reservations_management.create');
    Route::post("/reservations-management",[ReservationManagementController::class, 'store'])
        ->name('reservations_management.store');
    Route::get("/reservations-management/edit/{reservation}",[ReservationManagementController::class, 'edit'])
        ->name('reservations_management.edit');
    Route::put('/reservations-management/{reservation}',[ReservationManagementController::class,'update'])
        ->name('reservations_management.update');
    Route::post('/reservations-management/cancel/{reservation}',[ReservationManagementController::class,'cancel'])
        ->name('reservations_management.cancel');
});