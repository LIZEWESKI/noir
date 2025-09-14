<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    /** @use HasFactory<\Database\Factories\AuditLogFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'action',
        'details',
        'ip_address',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
     
    protected $casts = [
        'details' => 'array',
    ];
}
