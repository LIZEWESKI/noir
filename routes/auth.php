<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::middleware('guest')->group(function () {

    Route::get('/auth/redirect', function () {
        return Socialite::driver('google')->redirect();
    });
    
    // This was copied from medium blog
    Route::get('/auth/google/callback', function () {
        // Check if Google returned an error or if 'code' is missing
        if (request()->has('error')) {
            $errorReason = request('error');
            return redirect('/login')->with('error', "Google login failed: $errorReason");
        }
        $googleUser = Socialite::driver('google')->user();
        // Check if the user exists but doesn't have a google_id (regular account)
        $user = User::where('email', $googleUser->email)->first();

        if ($user && !$user->google_id) {
            // Option 1: Show an error or ask to link accounts
            return redirect('/login')->with('error', 'This email is already used for a normal account. Please log in and link Google in your profile settings.');
        }
        // Find or create user
        $user = User::updateOrCreate(
            ['email' => $googleUser->email], // Match existing user by email
            [
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'profile_picture_path' => $googleUser->avatar,
            ]
        );
        // Log the user in
        Auth::login($user);

        // Redirect to intended page or home
        return redirect('/');
    });

    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::post('login/demo', [AuthenticatedSessionController::class, 'storeDemo'])
        ->name('login.demo');
        
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');
    Route::get('/profile/password', [PasswordController::class, 'edit'])->name('profile.edit.password');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
