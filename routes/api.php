<?php

use App\Http\Controllers\DeathAnnouncementCommentController;
use App\Http\Controllers\DeathAnnouncementCommentLikeController;
use App\Http\Controllers\DeathAnnouncementController;
use App\Http\Controllers\DeathAnnouncementLikeController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\GraduationAnnouncementCommentController;
use App\Http\Controllers\GraduationAnnouncementCommentLikeController;
use App\Http\Controllers\GraduationAnnouncementController;
use App\Http\Controllers\GraduationAnnouncementLikeController;
use App\Http\Controllers\SuccessCardAnnouncementCommentController;
use App\Http\Controllers\SuccessCardAnnouncementCommentLikeController;
use App\Http\Controllers\SuccessCardAnnouncementController;
use App\Http\Controllers\SuccessCardAnnouncementLikeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeddingAnnouncementCommentController;
use App\Http\Controllers\WeddingAnnouncementCommentLikeController;
use App\Http\Controllers\WeddingAnnouncementController;
use App\Http\Controllers\WeddingAnnouncementLikeController;
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
    "deaths" => DeathAnnouncementController::class,
    "death-likes" => DeathAnnouncementLikeController::class,
    "death-comments" => DeathAnnouncementCommentController::class,
    "death-comment-likes" => DeathAnnouncementCommentLikeController::class,
    "users" => UserController::class,
    "weddings" => WeddingAnnouncementController::class,
    "wedding-likes" => WeddingAnnouncementLikeController::class,
    "wedding-comments" => WeddingAnnouncementCommentController::class,
    "wedding-comment-likes" => WeddingAnnouncementCommentLikeController::class,
    "graduations" => GraduationAnnouncementController::class,
    "graduation-likes" => GraduationAnnouncementLikeController::class,
    "graduation-comments" => GraduationAnnouncementCommentController::class,
    "graduation-comment-likes" => GraduationAnnouncementCommentLikeController::class,
    "success-cards" => SuccessCardAnnouncementController::class,
    "success-card-likes" => SuccessCardAnnouncementLikeController::class,
    "success-card-comments" => SuccessCardAnnouncementCommentController::class,
    "success-card-comment-likes" => SuccessCardAnnouncementCommentLikeController::class,
]);

// Filepond Controller
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {

        // Death Announcement
        Route::post('death-poster', 'storeDeathAnnouncementPoster');
        Route::delete('death-poster/{id}', 'destoryDeathAnnouncementPoster');

        // User
        Route::post('avatar/{id}', 'updateAvatar');
    });
});
