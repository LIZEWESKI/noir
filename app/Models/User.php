<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Storage;
use Illuminate\Support\Str;
use App\Traits\HasAdminRole;
use Illuminate\Support\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasAdminRole;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'google_id',
        'profile_picture_path',
        'password',
        'role'
    ];
    function reservations():HasMany {
        return $this->hasMany(Reservation::class);
    }
    function payments():HasMany {
        return $this->hasMany(Payment::class);
    }
    protected $appends = ['profile_picture_url'];
    public function getProfilePictureUrlAttribute()
    {
        return $this->google_id && !Str::contains($this->profile_picture_path,"avatars")
        ? $this->profile_picture_path 
        : ($this->profile_picture_path ? asset('storage/' . $this->profile_picture_path) : null);
    }

    public function isActive(int $months = 1): bool
    {
        return $this->last_stay && Carbon::parse($this->last_stay)->gte(now()->subMonths($months));
    }

    public static function getUsersWithStays(int $months = 1)
    {
        $users = User::query()
            ->withCount(['reservations as stays' => function ($query) { 
                $query->where('status', 'completed'); }]) 
            ->withMax('reservations as last_stay', 'check_in')
            ->orderByDesc('stays')
            ->get();
        $users->transform(function ($u) { 
            $u->is_active = $u->isActive(); 
            return $u; 
        });
        return $users;
    }

    public static function withReservationsInWeek($startOfWeek,$endOfWeek)
    {
        $guests_with_reservations = User::whereHas('reservations', 
        function ($query) use ($startOfWeek, $endOfWeek) { 
            $query->where(function ($q) use ($startOfWeek, $endOfWeek) {
                $q->whereBetween('check_in', [$startOfWeek, $endOfWeek])
                ->orWhereBetween('check_out', [$startOfWeek, $endOfWeek]);
            })
            ->where('status', 'completed');
        })
        ->with(['reservations' => function ($query) use ($startOfWeek, $endOfWeek) {
            $query->where(function ($q) use ($startOfWeek, $endOfWeek) {
                $q->whereBetween('check_in', [$startOfWeek, $endOfWeek])
                    ->orWhereBetween('check_out', [$startOfWeek, $endOfWeek]);
                })
            ->where('status', 'completed');
        }])
        ->limit(6)
        ->get();
        return $guests_with_reservations;
    }
    public static function stats(int $months = 1)
    {
        $users = self::withCount(['reservations as stays' => function ($q) {
            $q->where('status', 'completed');
        }])
        ->withMax('reservations as last_stay', 'check_in')
        ->orderByDesc('stays')
        ->get();

        $total = $users->count();
        $active = $users->filter(fn($u) => $u->isActive($months))->count();
        $inactive = $total - $active;

        $activeRate = $total > 0 ? round(($active / $total) * 100) : 0;
        $inactiveRate = 100 - $activeRate;
        return [
            [
                "key" => "total_guests",
                "title" => "Total Guests",
                "value" => $total,
                "description" => "All registered guests",
            ],
            [
                "key" => "active_guests",
                "title" => "Active Guests",
                "value" => $active,
                "description" => "{$activeRate}% engaged in the last {$months} month" . ($months > 1 ? 's' : ''),
            ],
            [
                "key" => "inactive_guests",
                "title" => "Inactive Guests",
                "value" => $inactive,
                "description" => "{$inactiveRate}% haven’t stayed recently",
            ],
        ];
    }
    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
