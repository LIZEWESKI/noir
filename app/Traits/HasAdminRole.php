<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;

trait HasAdminRole
{
    public function isAdmin()
    {
        return in_array(Auth::user()->role,['admin', 'manager', 'receptionist', 'accountant','housekeeping']);
    }
}
