<?php
use App\Http\Controllers\API\V1\PollController;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\API\V1\WidgetController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
  Route::get('/admin/polls', [PollController::class, 'index'])->name('admin.polls.index');
  Route::get('/admin/polls/{id}', [PollController::class, 'show'])->name('admin.polls.show');
  Route::post('/admin/polls', [PollController::class, 'store'])->name('admin.polls.store');
  Route::put('/admin/polls/{id}', [PollController::class, 'update'])->name('admin.polls.update');
  Route::delete('/admin/polls/{id}', [PollController::class, 'destroy'])->name('admin.polls.destroy');
  Route::get('/admin/user', [UserController::class, 'show'])->name('admin.user.show');
});

Route::get('/poll/{id}', [WidgetController::class, 'show'])->name('widget.polls.show');
Route::post('/poll', [WidgetController::class, 'store'])->name('widget.polls.store');

