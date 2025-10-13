<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $demo_accounts = User::find(config('demo.ids'),['id','profile_picture_path','role','name']);
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'demo_accounts' => $demo_accounts
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        $request->authenticate();
        $request->session()->regenerate();
        AuditLog::log('LOGIN_ATTEMPT', [
            'success'    => true,
            'user_agent' => $request->header('User-Agent'),
        ]);
        // Should redirect to dashboard 
        // return redirect()->back();
        return redirect(route("home"));
    }
    
    public function storeDemo(Request $request) {
        $messages = [
            'id.required' => 'Please select an account!',
            'id.in' => "This demo account doesn't exist.",
        ];

        $request->validate([
            // since this is only for demo purposes, we only allow quick logins for these ids below
            "id" => ['required',Rule::In(config("demo.ids"))]
        ],$messages);

        $user = User::find($request->id,["email"]);

        // using demo accounts default password
        // this is a very naive way to handle auth but it does the work for now
        if (! Auth::attempt([
            'email' => $user->email,
            'password' => config("demo.password")
            ])) {
            throw ValidationException::withMessages([
                'id' => "This demo account doesn't exist.",
            ]);
        }

        $request->session()->regenerate();
        
        AuditLog::log('LOGIN_ATTEMPT', [
            'success'    => true,
            'user_agent' => $request->header('User-Agent'),
        ]);
        return redirect(route("home"));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
