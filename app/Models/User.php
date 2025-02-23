<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $appends = ['profile_pic_url'];
    public function getProfilePicUrlAttribute()
    {
        // Laravel looks for methods in the get{Attribute}Attribute format, like getProfilePicUrlAttribute().
        // It automatically removes get and Attribute, then converts camelCase to snake_case — so profilePicUrl becomes profile_pic_url.
        // The value returned by this method is assigned to the $appends array’s profile_pic_url key.
        // Finally, when you access $user->profile_pic_url, it pulls the value straight from the method’s return.
        return $this->profile_pic ? asset('storage/' . $this->profile_pic) : null;
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
