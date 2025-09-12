<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentManagementController extends Controller
{
    public function index(Request $request)
    {
        $summary = Payment::quickStats();

        $payments = Payment::with(['user', 'reservations.room'])->whereHas('reservations')
            ->latest()
            ->get();

        return inertia('admin/payments-management/index',compact('summary','payments'));
    }
}
