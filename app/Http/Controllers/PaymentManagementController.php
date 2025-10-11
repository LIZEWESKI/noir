<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Exports\PaymentExport;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PaymentManagementController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Payment::class, 'payment');
    }

    public function index(Request $request)
    {
        $summary = Payment::quickStats();

        $payments = Payment::with(['user', 'reservations.room'])->whereHas('reservations')
            ->latest()
            ->get();

        return inertia('admin/payments-management/index',compact('summary','payments'));
    }

    public function exportCsv(): StreamedResponse
    {
        Gate::authorize('export', 'payments');
        $payment_export = new PaymentExport();
        return $payment_export->exportCsv();
    }
    
    public function exportXlsx(): StreamedResponse
    {
        Gate::authorize('export', 'payments');
        $payment_export = new PaymentExport();
        return $payment_export->exportXlsx();
    }
}
