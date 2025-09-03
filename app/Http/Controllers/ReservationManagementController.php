<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ReservationManagementController extends Controller
{
        public function index() {

        return Inertia::render('admin/reservations-management/index');
    }
}
