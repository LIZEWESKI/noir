<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Models\Feature;
use App\Models\AuditLog;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreRoomRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateRoomRequest;

class RoomManagementController extends Controller
{
    public function index() {
        $rooms_management = Room::latest()->with("features:name,id")->get();
        return Inertia::render('admin/rooms-management/index',compact('rooms_management'));
    }

    public function create()
    {
        $features_collection = Feature::get(['name']);
        $features = $features_collection->map(function ($item) {
            return (string) $item->name; 
        })->toArray();
        return Inertia::render('admin/rooms-management/create',compact("features"));
    }

    public function store(StoreRoomRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('rooms');
            $data['image_path'] = $path;
        }
        $data['size'] = $data['size'] . ' m²';
        $room = Room::create(Arr::except($data,"features"));
        if($data["features"] ?? false) {
           foreach($data["features"] as $feature) {
                $room->feature($feature);
           }
        }

        AuditLog::log('ROOM_CREATED', [
            'room_id'    => $room->id,
            'room_number'=> $room->room_number,
            'room_type'  => $room->type,
            'price'      => $room->price,
        ]);

        return redirect()->route('admin.rooms_management.index')->with('success', 'Room created successfully.');
    }

    public function edit(Room $room)
    {
        $room->loadMissing('features:name,id');
        $features_collection = Feature::get(['name']);
        $features = $features_collection->map(function ($item) {
            return (string) $item->name; 
        })->toArray();
        return Inertia::render('admin/rooms-management/edit',compact("room","features"));
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $oldPrice = $room->price;
        $data = $request->validated();

        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('rooms');
            $data['image_path'] = $path;
        }
        else {
            unset($data['image_path']);
        }

        $room->update(Arr::except($data, "features"));

        if(!empty($data["features"])) {
            $room->features()->detach();
            foreach($data["features"] as $featureName) {
                $room->feature($featureName);
            }
        }

        AuditLog::log('ROOM_UPDATED', [
            'room_id'    => $room->id,
            'room_number'=> $room->room_number,
            'changes'    => [
                'price' => "{$oldPrice} -> {$room->price}",
            ],
        ]);

        return redirect()->route('admin.rooms_management.index')->with('success', 'Room updated successfully!');
    }

    public function destroy(Room $room)
    {

        // we may want to keep the room image if want to restore the room in the future

        // if ($room->image_path && Storage::disk('public')->exists($room->image_path)) {
        //     Storage::disk('public')->delete($room->image_path);
        // }

        $room->delete();

        AuditLog::log('ROOM_DELETED', [
            'room_id'    => $room->id,
            'room_number'=> $room->room_number,
            'room_type'  => $room->type,
        ]);

        return redirect()->route('admin.rooms_management.index')
            ->with('success', 'Room deleted successfully.');
    }
}
