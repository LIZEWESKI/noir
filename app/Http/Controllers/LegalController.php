<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class LegalController extends Controller
{
    public function about() {
        return Inertia::render("legal/about");
    }
    public function contact() {
        return Inertia::render("legal/contact");
    }
    public function legal() {
        return Inertia::render("legal/legal");
    }
    public function privacyPolicy() {
        return Inertia::render("legal/privacy-policy");
    }
    public function TermsOfService() {
        return Inertia::render("legal/terms-of-service");
    }
}
