<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class GuestManagementController extends Controller
{
    public function index() {
        $users = User::query()
            ->withCount(['reservations as stays' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->withMax('reservations as last_stay', 'check_in')
            ->orderByDesc('stays')
        ->get();

        // Mark active/inactive based on last 1 month interaction (mainly the last stay)
        // I should probably use the last_login_at but you know, what a drag
        $users->transform(function ($user) {
            $user->is_active = $user->last_stay && Carbon::parse($user->last_stay)->gte(now()->subMonths(1));
            return $user;
        });
        return Inertia::render('admin/guests-management/index',compact("users"));
    }
    public function show(User $user) {

        return Inertia::render('admin/guests-management/show');
    }
}
