<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {

Route::get('/user', function (Request $request) {
        return $request->user();
    });

    
Route::post('/logout', [AuthController::class, 'logout']);

// Route::apiResource('/users', UserController::class);

});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
// Route::post('/logout', [AuthController::class, 'logout']);

Route::apiResource('/users', UserController::class);
