<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_features', 'feature_id', 'room_id');
    }

}
