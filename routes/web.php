<?php
use App\Http\Controllers\API\V1\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('{any?}', fn() => view('app'))->where('any', '.*');
