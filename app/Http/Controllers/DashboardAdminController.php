<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index']);
    }

    public function index(Request $request)
    {
        return inertia('Admin/AdminDashboard', [
            'total_user' => User::count(),
            'total_product' => Product::count(),
            'total_category' => Category::count()
        ]);
    }
}
