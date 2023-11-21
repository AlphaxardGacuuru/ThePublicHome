<?php

use App\Http\Controllers\DeathAnnouncementCommentController;
use App\Http\Controllers\DeathAnnouncementCommentLikeController;
use App\Http\Controllers\DeathAnnouncementController;
use App\Http\Controllers\DeathAnnouncementLikeController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeddingAnnouncementController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware(['auth:sanctum'])->group(function () {
// Authenticated User
Route::get('auth', [UserController::class, 'auth']);

Route::apiResources([
    "death-announcements" => DeathAnnouncementController::class,
    "death-announcement-likes" => DeathAnnouncementLikeController::class,
    "death-announcement-comments" => DeathAnnouncementCommentController::class,
    "death-announcement-comment-likes" => DeathAnnouncementCommentLikeController::class,
    "users" => UserController::class,
	"wedding-announcements" => WeddingAnnouncementController::class,
]);

// Filepond Controller
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {

        // Death Announcement
        Route::post('death-announcement-poster', 'storeDeathAnnouncementPoster');
        Route::delete('death-announcement-poster/{id}', 'destoryDeathAnnouncementPoster');

        // User
        Route::post('avatar/{id}', 'updateAvatar');
    });
});
