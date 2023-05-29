<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductUserController extends Controller
{
    public function show($id) {
        $product = Product::findOrFail($id);

        return Inertia::render('Product', [
            'product' => fn () => Product::findOrFail($id)
        ]);
    }
}
