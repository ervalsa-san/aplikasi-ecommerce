<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index']);
    }

    public function index(Request $request)
    {
        $request->validate([
            'direction' => ['in:asc,desc'],
            'field' => ['in:name,email']
        ]);

        $query = User::query();

        if ($request->q)
        {
            $query->where('name', 'like', '%'. $request->q .'%')
                ->orWhere('email', 'like', '%'. $request->q .'%');
        }

        if ($request->has(['field', 'direction']))
        {
            $query->orderBy($request->field, $request->direction);
        }

        $users = new UserCollection($query->paginate($request->load));
        return inertia('Admin/User/Index', [
            'user' => $users
        ]);
    }

    public function create(Request $request)
    {
        return inertia('Admin/User/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'role' => ['required'],
            'address' => ['required'],
            'phone_number' => ['required'],
            'store_name' => ['required'],
            'wallet' => ['required'],
            'password' => ['required'],
        ]);

        $request->user()->create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'store_name' => $request->store_name,
            'wallet' => $request->wallet,
            'password' => Hash::make($request->password),
        ]);

        return redirect(route('adminUserStore'));
    }

    public function edit(User $user)
    {
        return inertia('Admin/User/Edit');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect(route('adminUser'));
    }
}
