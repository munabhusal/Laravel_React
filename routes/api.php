<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CatagoryController;
use App\Http\Controllers\Api\PostController;
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

    Route::get('/show_blog/{id}', [PostController::class, 'show_blog']);
    Route::get('/show_feeds', [PostController::class, 'show_feeds']);
    Route::get('/author_feeds/{id}', [PostController::class, 'author_feeds']);
    Route::get('/catagory_feeds/{id}', [PostController::class, 'catagory_feeds']);
    Route::get('/tag_feeds/{id}', [PostController::class, 'tag_feeds']);
    Route::get('/search_catagory/{search}', [PostController::class, 'search_catagory']);
    Route::get('/search_tag/{search}', [PostController::class, 'search_tag']);




Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);
});

Route::patch('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

