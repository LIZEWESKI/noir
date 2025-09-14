<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->isAdmin();;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [

            'user_type' => ['required', 'string', 'in:existing,new'],

            'room_id'   => ['required', 'exists:rooms,id'],
            'check_in'  => ['required', 'date', 'after:today'],
            'check_out' => ['required', 'date', 'after:check_in'],
            'status' => ['required', 'in:pending,completed,cancelled'],

            // it is required if the user exist, if not then its nullable
            'user_id' => ['required_if:user_type,existing', 'nullable', 'exists:users,id'],

            // vice versa if its a new guest
            'name'  => ['required_if:user_type,new', 'nullable', 'string', 'max:255'],
            'email' => ['required_if:user_type,new', 'nullable', 'email', 'unique:users,email', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required_if'   => 'Please select an existing guest.',
            'name.required_if'  => 'Guest name is required when creating a new guest.',
            'email.required_if' => 'Guest email is required when creating a new guest.',
            'email.unique' => 'Guest email must be unique.',
        ];
    }


}