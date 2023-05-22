<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index']);
    }

    public function index(Request $request)
    {
        $query = User::query();
        $users = new UserCollection($query->paginate($request->load));
        return inertia('Admin/User/Index', [
            'user' => $users
        ]);
    }
}
