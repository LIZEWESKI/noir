<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class LegalController extends Controller
{
    public function about() {
        return Inertia::render("Legal/About");
    }
    public function contact() {
        return Inertia::render("Legal/Contact");
    }
    public function legal() {
        return Inertia::render("Legal/Legal");
    }
    public function privacyPolicy() {
        return Inertia::render("Legal/PrivacyPolicy");
    }
    public function TermsOfService() {
        return Inertia::render("Legal/TermsOfService");
    }
}
