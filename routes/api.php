<?php

use App\Http\Controllers\DeathCommentController;
use App\Http\Controllers\DeathCommentLikeController;
use App\Http\Controllers\DeathController;
use App\Http\Controllers\DeathLikeController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\GraduationCommentController;
use App\Http\Controllers\GraduationCommentLikeController;
use App\Http\Controllers\GraduationController;
use App\Http\Controllers\GraduationLikeController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SuccessCardCommentController;
use App\Http\Controllers\SuccessCardCommentLikeController;
use App\Http\Controllers\SuccessCardController;
use App\Http\Controllers\SuccessCardLikeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserMembershipController;
use App\Http\Controllers\WeddingCommentController;
use App\Http\Controllers\WeddingCommentLikeController;
use App\Http\Controllers\WeddingController;
use App\Http\Controllers\WeddingLikeController;
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
    "deaths" => DeathController::class,
    "death-likes" => DeathLikeController::class,
    "death-comments" => DeathCommentController::class,
    "death-comment-likes" => DeathCommentLikeController::class,
    "users" => UserController::class,
    "memberships" => MembershipController::class,
    "user-memberships" => UserMembershipController::class,
    "weddings" => WeddingController::class,
    "wedding-likes" => WeddingLikeController::class,
    "wedding-comments" => WeddingCommentController::class,
    "wedding-comment-likes" => WeddingCommentLikeController::class,
    "graduations" => GraduationController::class,
    "graduation-likes" => GraduationLikeController::class,
    "graduation-comments" => GraduationCommentController::class,
    "graduation-comment-likes" => GraduationCommentLikeController::class,
    "success-cards" => SuccessCardController::class,
    "success-card-likes" => SuccessCardLikeController::class,
    "success-card-comments" => SuccessCardCommentController::class,
    "success-card-comment-likes" => SuccessCardCommentLikeController::class,
]);

// Filepond Controller
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {

        // Death
        Route::post('death-poster', 'storeDeathPoster');
        Route::post('death-images', 'storeDeathImages');
        Route::post('eulogy', 'storeEulogy');
        Route::delete('death-poster/{id}', 'destoryDeathPoster');

        // User
        Route::post('avatar/{id}', 'updateAvatar');
    });
});
