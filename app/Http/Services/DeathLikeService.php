<?php

namespace App\Http\Services;

use App\Models\Death;
use App\Models\DeathLike;
use Illuminate\Support\Facades\DB;

class DeathLikeService extends Service
{
    /*
     * Add Death  Like
     */
    public function store($request)
    {
        $getLike = DeathLike::where("death_id", $request->id)
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
                Death::find($request->id)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new DeathLike;
            $like->user_id = $this->id;
            $like->death_id = $request->id;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                Death::find($request->id)
                    ->increment("likes");
            });

            $message = "Death  Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
