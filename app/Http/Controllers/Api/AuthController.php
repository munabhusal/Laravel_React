<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($request['password']),
            'role_id'=>Role::where('role','User')->first()->id

        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));

    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();        
        $user = User::where('email', $request->email)->firstOrFail();        
        $attempts = $user->is_blocked;
        if(!Auth::attempt($credentials) || $attempts >= 2){
            if($attempts > 1){
                $msg = 'Talk to Concerned Authority. Your id has been blocked due to multiple attempts.';
            }else{
                User::where('id',$user->id)->update(['is_blocked'=>$attempts+1]);
                $user = User::where('email', $request->email)->firstOrFail();
                $attempts = $user->is_blocked;
                $msg = 'Provided data didn\'t matched. Only ' . 3- $attempts . ' attempt left.';
                if($attempts == 2){
                    $msg = 'Provided data didn\'t matched. ' . 'Last attempt left.';
                }
            }
            return response([
                'message'=>$msg
            ], status:422);
        }
        /** @var User $user */
        $user = Auth::user();
        User::where('id',$user->id)->update(['is_blocked'=>0]);
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }


    public function logout(Request $request){
        
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function user(Request $request){
        $user = User::with('role')->where('id', Auth::id())->first();
        return response(compact('user'));

    }


}
