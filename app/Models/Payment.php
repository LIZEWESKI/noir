<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        "total_amount",
        "payment_status",
        "payment_method",
        'nights',
        'transaction_id',
        'notes',
    ];
    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'payment_reservation');
    }
    public function reservationsWithRooms()
    {
        return $this->reservations()->with('room');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
