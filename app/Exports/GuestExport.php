<?php

namespace App\Exports;

use App\Models\User;

class GuestExport extends Export
{
    protected string $label = 'guests_';
    protected array $headers = [
        'Full Name',
        'Email',
        'Role',
        'Total Stays',
        'Last Stay Date',
        'Account Status',
        'Creation Date',
    ];

    protected function queryData(): iterable
    {
        return User::getUsersWithStays();
    }

    protected function mapRow($user): array
    {
        return [
            $user->name ?? 'N/A',
            $user->email,
            $user->role,
            $user->stays,
            $user->last_stay,
            $user->is_active ? 'Active' : 'Inactive',
            $user->created_at,
        ];
    }
}
