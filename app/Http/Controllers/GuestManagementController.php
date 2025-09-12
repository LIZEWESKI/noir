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

        $now = now();
        $oneMonthAgo = $now->copy()->subMonth();
        $startOfWeek = $now->copy()->startOfWeek();
        $endOfWeek = $now->copy()->endOfWeek();

        $users = User::query()
            ->withCount(['reservations as stays' => function ($query) {
                $query->where('status', 'completed');
            }])
            ->withMax('reservations as last_stay', 'check_in')
            ->orderByDesc('stays')
        ->get();

        // Mark active/inactive based on last 1 month interaction (mainly the last stay)
        $users->transform(function ($user)  {
            $user->is_active = $user->last_stay && Carbon::parse($user->last_stay)->gte(now()->subMonth());
            return $user;
        });

        // Get users with last stay
        $usersStats = User::withMax('reservations as last_stay', 'check_in')->get();

        // Total users
        $total_guests = $usersStats->count();
        // Total active users
        $active_guests = $usersStats->filter(function ($user) use ($oneMonthAgo) {
            return $user->last_stay && Carbon::parse($user->last_stay)->gte($oneMonthAgo);
        })->count();
        // Total inactive users 
        $inactive_guests = $total_guests - $active_guests;

        // new sign-ups this week
        $new_users = User::whereBetween('created_at', [$startOfWeek, $endOfWeek])->orderByDesc('created_at')->limit(8)->get();
        // users with reservation this week
        $guests_with_reservations = User::whereHas('reservations', function ($query) use ($startOfWeek, $endOfWeek) {
            $query->whereBetween('check_in', [$startOfWeek, $endOfWeek])
                ->orWhereBetween('check_out', [$startOfWeek, $endOfWeek]);
        })->with(['reservations' => function ($q) use ($startOfWeek, $endOfWeek) {
            $q->whereBetween('check_in', [$startOfWeek, $endOfWeek])
            ->orWhereBetween('check_out', [$startOfWeek, $endOfWeek]);
        }])->get();

        return Inertia::render('admin/guests-management/index',compact(
            "users",
            "total_guests",
            "active_guests",
            "inactive_guests",
            "new_users",
            "guests_with_reservations"
        ));
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
