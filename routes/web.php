<?php

use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => 'auth'], function () {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

    Route::get('/redirectAuthenticatedUsers', [RedirectAuthenticatedUsersController::class, "home"]);

    Route::group(['middleware' => 'checkRole:Admin'], function () {
       Route::inertia('/admin/dashboard', 'Admin/AdminDashboard')->name('adminDashboard');

       // Admin User Controller
       Route::resource('/admin/user', UserController::class);
       Route::get('/admin/user', [UserController::class, 'index'])->name('adminUser');
       Route::post('/admin/user', [UserController::class, 'store'])->name('adminUserStore');
       Route::put('/admin/user/{id}', [UserController::class, 'update'])->name('adminUserUpdate');
       Route::delete('/admin/user/{id}', [UserController::class, 'destroy'])->name('adminUserDestroy');

       // Admin Dashboard Controller Resource
       Route::resource('/admin/dashboard', DashboardAdminController::class);
       Route::get('/admin/dashboard', [DashboardAdminController::class, 'index'])->name('adminDashboard');
    });

    Route::group(['middleware' => 'checkRole:Customer'], function () {
        Route::inertia('/customer/dashboard', 'Customer/CustomerDashboard')->name('customerDashboard');
    });

    Route::group(['middleware' => 'checkRole:Courier'], function () {
        Route::inertia('/courier/dashboard', 'Courier/CourierDashboard')->name('courierDashboard');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
