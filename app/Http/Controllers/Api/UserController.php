<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        if(Auth::check()){

            if(isset($request->role_id)){
                $data['role_id']= $request->role_id;
            }

            if(isset($request->is_blocked)){
                $data['is_blocked']= $request->is_blocked;
            }

        }else{
            $data['role_id']=Role::where('role','User')->first()->id;
        }

        $data['password']= bcrypt($data['password']);

        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {   
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data =  $request->validated();

        if(Auth::check()){             

            if(isset($request->role_id)){
                $data['role_id']= $request->role_id;
            }

            if(isset($request->is_blocked)){
                $data['is_blocked']= $request->is_blocked;
            }
            
        }

        if(isset($data['password'])){
            $data['password']= bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }

    public function userstatus(Request $request)
    {
        // $user = User::where('id', $request->id)->update(['role_id'=>2])
        // return response("");

        
    }

}