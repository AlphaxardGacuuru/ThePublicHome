<?php

namespace App\Http\Services;

use App\Models\SuccessCard;
use App\Models\SuccessCardLike;
use Illuminate\Support\Facades\DB;

class SuccessCardLikeService extends Service
{
    /*
     * Add SuccessCard Like
     */
    public function store($request)
    {
        $getLike = SuccessCardLike::where("success_card_id", $request->successId)
            ->where("user_id", $this->id);

        $hasLiked = $getLike->exists();

        // Check if has liked
        if ($hasLiked) {
            // Get Like
            $like = $getLike->first();

            DB::transaction(function () use ($getLike, $request) {
                // Delete Like
                $getLike->delete();

                // Decrement Likes
                SuccessCard::find($request->successId)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new SuccessCardLike;
            $like->user_id = $this->id;
            $like->success_card_id = $request->successId;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                SuccessCard::find($request->successId)
                    ->increment("likes");
            });

            $message = "Success Card  Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
