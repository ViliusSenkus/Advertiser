<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdvertiseController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'adv'], function(){
    Route::get('/', [AdvertiseController::class, 'index']);
    Route::get('/s/{keyword}', [AdvertiseController::class, 'search']);
    Route::get('/{field}/{order}', [AdvertiseController::class, 'order']);

    Route::get('/{id}', [AdvertiseController::class, 'singleAdv'])->where('id', '[0-9]+');
    Route::post('/', [AdvertiseController::class, 'create']);
    Route::put('/{id}', [AdvertiseController::class, 'edit'])->where('id', '[0-9]+');
    Route::delete('/{id}', [AdvertiseController::class, 'delete'])->where('id', '[0-9]+');

    // Route::middleware('auth:sanctum')->get('/{id}', [AdvertiseController::class, 'singleProduct'])->where('id', '[0-9]+');
    // Route::middleware('auth:sanctum')->post('/', [AdvertiseController::class, 'create']);
    // Route::middleware('auth:sanctum')->put('/{id}', [AdvertiseController::class, 'edit'])->where('id', '[0-9]+');
    // Route::middleware('auth:sanctum')->delete('/{id}', [AdvertiseController::class, 'delete'])->where('id', '[0-9]+');
	});

Route::group(['prefix' => 'comment'], function(){
    Route::get('/', [CommentController::class, 'index']);
    Route::get('/s/{keyword}', [CommentController::class, 'search']);
    Route::get('/{field}/{order}', [CommentController::class, 'order']);

    Route::get('/{id}', [CommentController::class, 'singleAdv'])->where('id', '[0-9]+');
    Route::post('/', [CommentController::class, 'create']);
    Route::put('/{id}', [CommentController::class, 'edit'])->where('id', '[0-9]+');
    Route::delete('/{id}', [CommentController::class, 'delete'])->where('id', '[0-9]+');
	});

Route::group(['prefix' => 'cat'], function(){
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/s/{keyword}', [CategoryController::class, 'search']);
    Route::get('/{field}/{order}', [CategoryController::class, 'order']);

    Route::get('/{id}', [CategoryController::class, 'singleAdv'])->where('id', '[0-9]+');
    Route::post('/', [CategoryController::class, 'create']);
    Route::put('/{id}', [CategoryController::class, 'edit'])->where('id', '[0-9]+');
    Route::delete('/{id}', [CategoryController::class, 'delete'])->where('id', '[0-9]+');
	});