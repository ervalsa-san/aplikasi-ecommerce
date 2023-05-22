<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{

    public function handle(Request $request, Closure $next, string $role)
    {
        if ($role == 'Admin' && auth()->user()->role != 'Admin') {
            abort(403);
        }

        if ($role == 'Customer' && auth()->user()->role != 'Customer') {
            abort(403);
        }

        if ($role == 'Courier' && auth()->user()->role != 'Courier') {
            abort(403);
        }
        return $next($request);
    }
}
