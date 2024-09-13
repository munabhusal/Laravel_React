<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     // return $request->user();
//     $user = $request->user();
//     $mydata = $user->role()->role;
//     return $mydata;
// })->middleware('auth:sanctum');

Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');


// if the user is logged in
Route::middleware(['auth:sanctum'])->group(function () { 
    // Authorized for Admin   
    Route::group(['middleware'=>'admin'], function(){
        Route::apiResource('/users', UserController::class);
    });

Route::post('/logout', [AuthController::class, 'logout']);
// Route::get('/user', [AuthController::class, 'user']);
});

Route::patch('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);


