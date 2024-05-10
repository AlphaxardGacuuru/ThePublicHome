<?php

namespace App\Http\Services;

use App\Models\Wedding;
use App\Models\WeddingLike;
use Illuminate\Support\Facades\DB;

class WeddingLikeService extends Service
{
    /*
     * Add Wedding  Like
     */
    public function store($request)
    {
        $getLike = WeddingLike::where("wedding_id", $request->id)
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
                Wedding::find($request->id)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new WeddingLike;
            $like->user_id = $this->id;
            $like->wedding_id = $request->id;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                Wedding::find($request->id)
                    ->increment("likes");
            });

            $message = "Wedding  Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
