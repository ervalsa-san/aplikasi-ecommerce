<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function buy(Request $request)
    {
        $data = $request->validate([
            'items' => 'required|array',
            'items.*.quantity' => 'required|min:1|numeric',
            'items.*.merchant_id' => 'required',
            'items.*.product_id' => 'required|numeric|exists:products,id'
        ]);

        $product = Product::whereIn("id", array_map(fn ($v) => $v['product_id'], $data['items']) )->get();

        // validate semua product dari user yang sama
        {
            $merchant_id = $product->firstOrFail()->user_id;
            $productUser = $product->map(fn($v) => ['merchant_id' => $v['user_id'], 'quantity' => $v['quantity']])->toArray();

            $validator = Validator::make([
                'products' => $productUser,
                'orders' => $data['items'],
            ], [
                'products.*.merchant_id' => [
                    Rule::in($merchant_id)
                ],
                'products.*.quantity' => 'gt:orders.*.quantity',
            ]);

            $validator->validate();
        }



        dd($data, $product, $validator, $merchant_id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
