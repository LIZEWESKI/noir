<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{

    public function show() {
        $reservations = Reservation::latest()->where('user_id',Auth::id())->with("room")->get();
        $payments = Payment::latest()->where('user_id',Auth::id())->get();
        return Inertia::render('profile/reservations-history',compact('reservations','payments'));
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('profile/update-profile-form', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        if ($request->hasFile('profile_picture')) {
            // Store file in storage/app/public/profile_pictures
            $path = $request->file('profile_picture')->store('avatars');
            // leaving this line here
            // Storage::disk(config('filesystems.default'))->put('images/foo.jpg', $data);
            // Delete old avatar if exists
            if ($request->user()->profile_picture_path) {
                Storage::disk('public')->delete($request->user()->profile_picture_path);
            }
            $request->user()->profile_picture_path = $path;
        }
        $request->user()->save();
        return Redirect::route('profile.edit')->with('success', 'Your profile has been updated.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
