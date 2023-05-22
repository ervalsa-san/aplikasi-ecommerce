<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RedirectAuthenticatedUsersController extends Controller
{
    public function home()
    {
        if (auth()->user()->role == 'Admin') {
            return redirect('/admin/dashboard');
        }

        elseif (auth()->user()->role == 'User') {
            return redirect('/user/dashboard');
        }

        elseif (auth()->user()->role == 'Courier') {
            return redirect('/courier/dashboard');
        }

        else {
            return auth()->logout();
        }
    }
}
