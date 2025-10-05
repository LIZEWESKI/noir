<?php

namespace App\Http\Middleware;

use App\Models\Room;
use App\Models\User;
use App\Models\Payment;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Foundation\Inspiring;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
                'isAdmin' => $request->user()?->isAdmin() || null,
                'permissions'  => [
                    'exportAnalytics' => $request->user()?->hasPermission('export_analytics') ?? false,

                    'viewAnyRooms'   => $request->user()?->can('viewAny', Room::class),
                    'createRooms' => $request->user()?->can('create', Room::class),
                    'updateRooms' => $request->user()?->can('update', new Room),
                    'deleteRooms' => $request->user()?->can('delete', new Room),
                    'exportRooms' => $request->user()?->hasPermission('export_rooms') ?? false,

                    'viewAnyGuests'   => $request->user()?->can('viewAny', User::class),
                    'createGuests' => $request->user()?->can('create', User::class),
                    'viewGuests'   => $request->user()?->can('view', new User),
                    'updateGuests' => $request->user()?->can('update', new User),
                    'deleteGuests' => $request->user()?->can('delete', new User),
                    'exportGuests' => $request->user()?->hasPermission('export_guests') ?? false,

                    'viewAnyReservations'   => $request->user()?->can('viewAny', Reservation::class),
                    'createReservations' => $request->user()?->can('create', Reservation::class),
                    'updateReservations' => $request->user()?->can('update', new Reservation),
                    'deleteReservations' => $request->user()?->can('delete', new Reservation),
                    'exportReservations' => $request->user()?->hasPermission('export_reservations') ?? false,
                    
                    'viewAnyPayments'   => $request->user()?->can('viewAny', Payment::class),
                    'exportPayments' => $request->user()?->hasPermission('export_payments') ?? false,
                ]
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => session('success'),
                'coupon' => session('coupon'),
                'error' => session('error'),
            ],
        ];
    }
}
