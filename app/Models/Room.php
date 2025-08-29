<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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
