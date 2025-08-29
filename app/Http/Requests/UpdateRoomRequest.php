<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            "room_number" => ["required", "string", "max:255", Rule::unique('rooms', 'room_number')->ignore($this->room->id)],
            "type" => ["required", "string",Rule::in(["Single","Double","Suite"])],
            "price" => ["required", "numeric", "min:0"],
            "status" => ["required", "string", "max:50",Rule::in(["Available","Booked","Maintenance"])],
            "image_path" => ["nullable","image", "mimes:jpg,jpeg,png", "max:2048"],
            "size" => ["required", "string"],
            "guests" => ["required", "integer", "min:1"],
            "bathrooms" => ["required", "integer", "min:1","max:5"],
            "bed" => ["required", "string",Rule::in("1 Single Bed", "1 King Bed", "1 Queen Bed", "2 King Beds", "2 King Beds, 1 Single Bed","1 King Bed, 2 Single Beds","1 Queen Bed, 1 Sofa Bed","1 King Bed, 1 Sofa Bed")],
            "description" => ["required", "string"],
            "features" => ["nullable"]
        ];
    }
}
