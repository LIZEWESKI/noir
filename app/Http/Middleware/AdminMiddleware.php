<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            // not logged in → send to login
            return redirect()->route('login');
        }

        if (Auth::user()->role !== 'admin') {
            // logged in but not admin → send home (or wherever you want)
            return redirect()->route('home')->with('error', 'Access denied.');
        }

        return $next($request);
    }
}
