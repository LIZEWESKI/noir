<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
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
        // -- we want to forbid demo accounts from being edited by users
        // We can use two approaches, authorization request that'd abort to 403 (NOT good UX)
        // we can throw a validation exception stating that these demo accounts shouldn't be edited (actually good UX :D)
        // to throw a validation exception we need to grab the $user->id 
        // check if the $user->id is in_array config('demo.ids')
        // if true we throw a validation exception if not we proceed
        // and since we're gonna need the same logic in other methods as well
        // its smart to make the validation check reusable
        $user = $request->user();
        $user->demoAccountValidation();

        $user->fill($request->validated());

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('avatars', config('filesystems.default'));
            if ($user->profile_picture_path) {
                Storage::disk(config('filesystems.default'))->delete($user->profile_picture_path);
            }
            $user->profile_picture_path = $path;
        }
        
        $user->save();
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
