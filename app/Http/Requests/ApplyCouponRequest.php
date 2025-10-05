<?php

namespace App\Http\Requests;

use App\Models\Coupon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ApplyCouponRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "coupon" => 'required|string'
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $coupon_code = $validator->safe()->coupon;
            $coupon = Coupon::where('code', $coupon_code)->first();
            $user = Auth::user();

            if (!Coupon::codeExists($coupon_code)) {
                $validator->errors()->add('coupon', "This coupon code doesn't exist, please try a new one");
                return;
            }
            if (Coupon::codeLimitReached($coupon,$user)) {
                $validator->errors()->add('coupon', 'This coupon has reached the limit usage');
            }
            if (!Coupon::codeValid($coupon)) {
                $validator->errors()->add('coupon', 'This coupon cannot be applied at this time');
            }
        });
    }

}
