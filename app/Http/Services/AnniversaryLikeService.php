<?php

namespace App\Http\Services;

use App\Models\Anniversary;
use App\Models\AnniversaryLike;
use Illuminate\Support\Facades\DB;

class AnniversaryLikeService extends Service
{
    /*
     * Add Anniversary  Like
     */
    public function store($request)
    {
        $getLike = AnniversaryLike::where("anniversary_id", $request->anniversaryId)
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
                Anniversary::find($request->anniversaryId)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new AnniversaryLike;
            $like->user_id = $this->id;
            $like->anniversary_id = $request->anniversaryId;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                Anniversary::find($request->anniversaryId)
                    ->increment("likes");
            });

            $message = "Anniversary  Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
