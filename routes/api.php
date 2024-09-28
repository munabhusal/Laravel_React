<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CatagoryController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// if the user is logged in
Route::middleware(['auth:sanctum'])->group(function () { 
    // Authorized for Admin   
    Route::group(['middleware'=>'admin'], function(){
        Route::apiResource('/users', UserController::class);
        Route::patch('/userstatus', [UserController::class, 'userstatus']);
        Route::apiResource('/catagories', CatagoryController::class);
        Route::apiResource('/tags', TagController::class);
        Route::apiResource('/blogs', BlogController::class);
        Route::get('/mypost', [BlogController::class, 'mypost']);
        Route::get('/getMyPostWithId/{id}', [BlogController::class, 'getMyPostWithId']);

    });

    // Route::get('/blogs/{id}', BlogController::class,'show');


Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);
});

Route::patch('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

