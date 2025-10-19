<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
    
    
    /**
     * Create a new audit log entry.
     *
     * @param string $action MODEL NAME + ACTION E.G UPDATED/DELETED/CREATED
     * @param array $details json describing the changes
     * @return static
     */
    public static function log(string $action, array $details = [])
    {
        return static::create([
            'user_id'   => Auth::id(),
            'action'    => $action,
            'details'   => $details,
            // 'ip_address'=> request()->ip(),
            'ip_address'=> '0.0.0.0',
        ]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
     
    protected $casts = [
        'details' => 'array',
    ];
}
