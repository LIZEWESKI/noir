<?php

namespace App\Providers;

use App\Models\Room;
use App\Models\User;
use App\Models\Payment;
use App\Models\Reservation;
use App\Policies\RoomPolicy;
use App\Policies\UserPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\ReservationPolicy;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Srmklive\PayPal\Providers\PayPalServiceProvider;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;

class AppServiceProvider extends ServiceProvider
{

    protected $policies = [
        Room::class => RoomPolicy::class,
        User::class => UserPolicy::class,
        Reservation::class => ReservationPolicy::class,
        Payment::class => PaymentPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        RedirectIfAuthenticated::redirectUsing(fn($request) => route('home'));
    }
}
