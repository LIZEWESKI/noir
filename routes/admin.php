<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoomsManagementController;

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
    Route::get("/rooms-management",[RoomsManagementController::class, 'index'])
        ->name('rooms_management.index');
    Route::get("/rooms-management/create",[RoomsManagementController::class, 'create'])
        ->name('rooms_management.create');
    Route::post("/rooms-management",[RoomsManagementController::class, 'store'])
        ->name('rooms_management.store');
    Route::put("/rooms-management/{room}",[RoomsManagementController::class, 'update'])
        ->name('rooms_management.update');
    Route::delete('/rooms-management/{room}',[RoomsManagementController::class, 'destroy'])
        ->name('rooms_management.destroy');
});