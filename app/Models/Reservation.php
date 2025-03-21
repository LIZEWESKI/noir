<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        "room_id",
        "check_in",
        "check_out",
        'nights',
        'cleaning_fee',
        'service_fee',
        'total_price',
        'status',
    ];
    function user():BelongsTo {
        return $this->belongsTo(User::class);
    }
    function room():BelongsTo {
        return $this->belongsTo(Room::class);
    }
    public function payments()
    {
        return $this->belongsToMany(Payment::class, 'payment_reservation');
    }
}
