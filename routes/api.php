<?php 

use Illuminate\Support\Facades\Route;

Route::get('api/paypal-config', function () {
    return response()->json([
        'client_id' => config('paypal.sandbox.client_id') 
    ]);
});