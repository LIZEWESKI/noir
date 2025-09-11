<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Storage;
use Illuminate\Support\Str;
use App\Traits\HasAdminRole;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
