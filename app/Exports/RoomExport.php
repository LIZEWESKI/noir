<?php

namespace App\Exports;

use App\Models\Room;

class RoomExport extends Export
{
    protected string $label = 'rooms_';
    protected array $headers = [
        'Room ID',
        'Room Name',
        'Type',
        'Price',
        'Capacity',
        'Features',
    ];

    protected function queryData(): iterable
    {
        return Room::with('features')->latest()->get();
    }

    protected function mapRow($room): array
    {
        $features = $room->features->map(function ($feature) {
            return sprintf(
                $feature->name ?? 'Unknown',
            );
        })->implode('; ');

        return [
            $room->id,
            $room->name,
            $room->type,
            "$".number_format($room->price, 2),
            $room->guests,
            $features,
        ];
    }
}
