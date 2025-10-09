<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCouponRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => ["required","string",Rule::unique('coupons', 'code')->ignore($this->coupon->id)],
            'type' => ["required",Rule::in(["fixed","percentage"])],
            'value' => ["required","integer","min:10",
                Rule::when($this->type === "percentage",["max:40"]),
                Rule::when($this->type === "fixed",["max:20"])
            ],
            "global_limit" => ["required","integer","min:10","max:100"],
            'start_date'  => ['required', 'date', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ];
    }
}
