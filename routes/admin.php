<?php

use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\ChangeLogController;
use App\Http\Controllers\CouponManagementController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoomManagementController;
use App\Http\Controllers\GuestManagementController;
use App\Http\Controllers\PaymentManagementController;
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
    Route::get('/dashboard/export/csv', [DashboardController::class, 'exportCsv'])
        ->name('dashboard.export.csv');
    Route::get('/dashboard/export/xlsx', [DashboardController::class, 'exportXlsx'])
        ->name('dashboard.export.xlsx');

    // Rooms Management resource (I could use Resource instead but I don't feel like it)
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
    Route::get('/rooms/export/csv', [RoomManagementController::class, 'exportCsv'])
        ->name('rooms.export.csv');
    Route::get('/rooms/export/xlsx', [RoomManagementController::class, 'exportXlsx'])
        ->name('rooms.export.xlsx');
    
    // Guests Management resource
    Route::get("/guests-management",[GuestManagementController::class,'index'])
        ->name('guests_management.index');
    Route::get("/guests-management/create",[GuestManagementController::class,'create'])
        ->name('guests_management.create');
    Route::post("/guests-management",[GuestManagementController::class,'store'])
        ->name('guests_management.store');
    Route::get("/guests-management/edit/{user}",[GuestManagementController::class,'edit'])
        ->name('guests_management.edit');
    Route::post("/guests-management/update/{user}",[GuestManagementController::class,'update'])
        ->name('guests_management.update');
    Route::get("/guests-management/{user}",[GuestManagementController::class,'show'])
        ->name('/guests_management.show');
    Route::delete('/guests-management/destroy/{user}', [GuestManagementController::class, 'destroy'])
        ->name('guests-management.destroy');
    Route::get('/guests/export/csv', [GuestManagementController::class, 'exportCsv'])
        ->name('guests.export.csv');
    Route::get('/guests/export/xlsx', [GuestManagementController::class, 'exportXlsx'])
        ->name('guests.export.xlsx');

    // Reservations Management resource
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
    Route::get('/reservations/export/csv', [ReservationManagementController::class, 'exportCsv'])
        ->name('reservations.export.csv');
    Route::get('/reservations/export/xlsx', [ReservationManagementController::class, 'exportXlsx'])
        ->name('reservations.export.xlsx');
    // Payments Management resource
    Route::get("/payments-management",[PaymentManagementController::class, 'index'])
        ->name("payments_management.index");
    Route::get('/payments/export/csv', [PaymentManagementController::class, 'exportCsv'])
        ->name('payments.export.csv');
    Route::get('/payments/export/xlsx', [PaymentManagementController::class, 'exportXlsx'])
        ->name('payments.export.xlsx');
    
    // Audit Log (should be invokable but didn't feel like it)
    Route::get('/audit-log', [AuditLogController::class,'index'])
        ->name('audit_log.index');

    // Coupons Management resource
    Route::get('/coupons-management',[CouponManagementController::class,'index'])
        ->name('coupons_management.index');
    Route::get('/coupons-management/create',[CouponManagementController::class,'create'])
        ->name('coupons_management.create');
    Route::post('/coupons-management',[CouponManagementController::class,'store'])
        ->name('coupons_management.store');
    Route::delete('/coupons-management/destroy/{coupon}',[CouponManagementController::class,'destroy'])
        ->name('coupons_management.destroy');
});