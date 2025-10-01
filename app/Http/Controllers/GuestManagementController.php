<?php

namespace App\Http\Controllers;

use App\Exports\GuestExport;
use App\Models\User;
use Inertia\Inertia;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Http\Requests\Auth\StoreUserRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GuestManagementController extends Controller

{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index() {

        $now = now();
        $startOfWeek = $now->copy()->startOfWeek();
        $endOfWeek = $now->copy()->endOfWeek();
        
        $users = User::getUsersWithStays();
        $stats = User::stats(); 
        // it returns new users this week
        $new_users = User::whereBetween('created_at', [$startOfWeek, $endOfWeek])
        ->limit(8)
        ->orderByDesc('created_at')
        ->get();

        $guests_with_reservations = User::withReservationsInWeek($startOfWeek, $endOfWeek);

        return Inertia::render('admin/guests-management/index',compact("users","stats","new_users","guests_with_reservations"));
    }

    public function create() {
        
        return Inertia::render('admin/guests-management/create');
    }
    public function store(StoreUserRequest $request) {
        $attributes = $request->validated();
        if ($request->hasFile('profile_picture_path')) {
            $path = $request->file('profile_picture_path')->store('avatars');
            $attributes['profile_picture_path'] = $path;
        }

        $user = User::create($attributes);
        AuditLog::log("USER_CREATED", [
            'user_id'   => $user->id,
            'user_name' => $user->name,
        ]);
        return redirect()->route('admin.guests_management.index')->with('success', 'User created successfully!');
    }

    public function edit(User $user) {

        return Inertia::render('admin/guests-management/edit',compact("user"));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();
        // dd($validated);
        // Handle optional password
        if (!empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']); // keep existing password
        }

        // Handle profile picture upload
        if ($request->hasFile('profile_picture_path')) {
            $file = $request->file('profile_picture_path');
            $path = $file->store('avatars');
            $validated['profile_picture_path'] = $path;
        }else {
            unset($validated['profile_picture_path']);
        }

        $user->update($validated);

        AuditLog::log("USER_UPDATED", [
            'user_id'   => $user->id,
            'user_name' => $user->name,
        ]);

        return redirect()->route('admin.guests_management.index')->with('success', 'Guest updated successfully.');
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

        AuditLog::log("USER_DELETED", [
            'user_id'   => $user->id,
            'user_name' => $user->name,
        ]);

        return redirect()->route('admin.guests_management.index')->with('success', 'User deleted successfully!');
    }

    public function exportCsv(): StreamedResponse
    {
        return (new GuestExport())->exportCsv();
    }

    public function exportXlsx(): StreamedResponse
    {
        return (new GuestExport())->exportXlsx();
    }
}
