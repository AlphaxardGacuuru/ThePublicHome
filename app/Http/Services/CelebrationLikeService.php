<?php

namespace App\Http\Services;

use App\Models\Celebration;
use App\Models\CelebrationLike;
use Illuminate\Support\Facades\DB;

class CelebrationLikeService extends Service
{
    /*
     * Add Celebration  Like
     */
    public function store($request)
    {
        $getLike = CelebrationLike::where("celebration_id", $request->id)
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
                Celebration::find($request->id)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new CelebrationLike;
            $like->user_id = $this->id;
            $like->celebration_id = $request->id;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                Celebration::find($request->id)
                    ->increment("likes");
            });

            $message = "Celebration  Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
