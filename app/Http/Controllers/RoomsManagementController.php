<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Models\Feature;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use Illuminate\Support\Facades\Storage;

class RoomsManagementController extends Controller
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

        $room = Room::create(Arr::except($data,"features"));
        if($data["features"] ?? false) {
           foreach($data["features"] as $feature) {
                $room->feature($feature);
           }
        }

        return redirect()->route('admin.rooms_management.index')->with('success', 'Room created successfully.');
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $data = $request->validated();
        
        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('rooms');
            $data['image_path'] = $path;
        }else {
            unset($data['image_path']);
        }

        $room->update(Arr::except($data, "features"));

        if(!empty($data["features"])) {
            $room->features()->detach();
            foreach($data["features"] as $featureName) {
                $room->feature($featureName);
            }
        }

        return redirect()->route('admin.rooms_management.index')->with('success', 'Room updated successfully!');
    }

    public function destroy(Room $room)
    {
        if ($room->image_path && Storage::disk('public')->exists($room->image_path)) {
            Storage::disk('public')->delete($room->image_path);
        }

        $room->delete();

        return redirect()->route('admin.rooms_management.index')
            ->with('success', 'Room deleted successfully.');
    }
}
