<?php

namespace App\Policies;

use App\Models\User;

class ExportPolicy
{
    public function export(User $user, string $resource): bool
    {
        return $user->hasPermission("export_{$resource}");
    }
}
