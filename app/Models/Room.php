<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "name",
        "room_number",
        "type",
        "price",
        "status",
        "image_path",
        "size",
        "guests",
        "bathrooms",
        "bed",
        "description",
    ];

    public function reservations():HasMany
    {
        return $this->hasMany(Reservation::class);
    }
    protected $appends = ['image_path_url'];
    public function getImagePathUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    function feature(string $name) {
        $feature = Feature::firstOrCreate(["name" => $name]);
        return $this->features()->attach($feature);
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }

    public function updateStatus()
    {
        $today = now()->toDateString();

        $reservation = $this->reservations()
            ->where('status', '=', 'completed')
            ->whereDate('check_in', '<=', $today)
            ->whereDate('check_out', '>=', $today)
            ->first();

        if ($reservation) {
            $this->status = 'Booked';
        } else {
            // $upcoming = $this->reservations()
            //     ->where('status', '!=', 'cancelled')
            //     ->whereDate('check_in', '>', $today)
            //     ->orderBy('check_in', 'asc')
            //     ->first();
            $this->status = 'Available';
        }

        $this->save();
    }

    
    public static $ghostData = [
        'name' => '[Deleted Room]',
        'room_number' => '[Deleted]',
        'type' => '[Deleted]',
        'price' => 0.00,
        'status' => 'deleted',
        'image_path' => '/rooms/4YB1jLI54Y7H7GhRoKZwRdLIdoqqzfFMQyWS9O4t.jpg',
        'size' => '[Deleted]',
        'guests' => 0,
        'bathrooms' => 0,
        'bed' => '[Deleted]',
        'description' => '[Deleted]',
    ];

    public function toArray(): array
    {
        $array = parent::toArray();

        if ($this->trashed()) {
            return array_merge($array, self::$ghostData);
        }

        return $array;
    }

    public static function availableCount(): int
    {
        return self::where('status', 'available')->count();
    }

    public static function trendComparedToYesterday(): ?float
    {
        $today = self::availableCount();
        $yesterday = self::where('status', 'available')
            ->whereDate('updated_at', '<=', now()->subDay())
            ->count();

        return $yesterday ? round((($today - $yesterday) / $yesterday) * 100, 2) : null;
    }


}
