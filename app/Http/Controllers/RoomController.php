<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Reservation;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::latest()->with("features")->paginate(5);
        
        return Inertia::render('rooms/index',compact("rooms"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        if(!$room) Inertia::render('not-found')->toResponse(request())->setStatusCode(404);
        $room->loadMissing('features');
        $related_rooms = Room::latest()->whereIn('type',[$room->type])->get();
        $unavailable_dates = Reservation::select('check_in','check_out')->where('room_id', $room->id)->where('status','completed')->get();
        return Inertia::render('rooms/show',compact("room","related_rooms",'unavailable_dates'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
