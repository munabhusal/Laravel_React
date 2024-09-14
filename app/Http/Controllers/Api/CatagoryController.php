<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CatagoryRequest;
use App\Http\Resources\CatagoryResource;
use App\Models\Catagory;
use Illuminate\Http\Request;

class CatagoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CatagoryResource::collection(
            Catagory::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CatagoryRequest $request)
    {
        $data = $request->validated();
        $user = Catagory::create($data);
        return response(new CatagoryResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Catagory $catagory)
    {
        return new CatagoryResource($catagory);
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
    public function update(CatagoryRequest $request, Catagory $catagory)
    {
        $data =  $request->validated();
    
        $catagory->update($data);
        return new CatagoryResource($catagory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Catagory $catagory)
    {
        $catagory->delete();
        return response("", 204);
    }
}
