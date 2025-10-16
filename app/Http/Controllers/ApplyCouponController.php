<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\ApplyCouponRequest;

class ApplyCouponController extends Controller
{
    /** 
     * Handle the incoming request.
     */
    public function __invoke(ApplyCouponRequest $request)
    {
        $request->validated();
        $code = $request->safe()->coupon;
        $coupon = Coupon::where("code",$code)->first(['id','code','type','value']);
        $coupon['status'] = "valid";
        return back()->with(['coupon' => $coupon]);
    }
}
