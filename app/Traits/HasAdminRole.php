<?php

namespace App\Traits;

trait hasAdminRole
{
    public function isAdmin()
    {
        return $this->role === "admin";
    }
}
