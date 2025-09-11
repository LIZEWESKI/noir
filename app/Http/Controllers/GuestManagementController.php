<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;

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
        $staysCount = $user->reservations()
            ->where('status', 'completed')
            ->count();

        $lastStay = $user->reservations()
            ->where('status', 'completed')
            ->latest('check_in')
            ->first();

        $totalNights = $user->reservations()
            ->where('status', 'completed')
            ->select(DB::raw('SUM(nights) as total_nights'))
            ->value('total_nights') ?? 0;

        $totalSpent = $user->reservations()
            ->where('status', 'completed')
            ->select(DB::raw('SUM(total_price) as total_spent'))
            ->value('total_spent') ?? 0;

        $stats = [
            'stays_count' => $staysCount,
            'last_stay' => $lastStay?->check_in,
            'total_nights' => $totalNights,
            'total_spent' => $totalSpent,
        ];

        $lastStayDate = $lastStay?->check_in;

        $guest = [
            'id' => $user->id,
            'name' => $user->name,
            'email'=> $user->email,
            'role'=> $user->role,
            'profile_picture_path'=> $user->profile_picture_path,
            'profile_picture_url' => $user->profile_picture_url,
            'created_at'=> $user->created_at,
            'is_active' => $lastStayDate ? Carbon::parse($lastStayDate)->gte(now()->subMonth(1)) : false,
        ];
        $reservations = $user->reservations()
            ->with('room:id,name,room_number')
            ->orderByDesc('check_in')
            ->get();
        $payments = $user->payments()
            ->with('reservations:id,room_id,check_in,check_out')
            ->latest()
            ->get();
        return Inertia::render('admin/guests-management/show',compact("guest","stats","reservations","payments"));
    }

    public function destroy(Request $request, User $user)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user->delete();

        return redirect()->route('admin.guests_management.index')->with('success', 'User deleted successfully!');
    }
}
