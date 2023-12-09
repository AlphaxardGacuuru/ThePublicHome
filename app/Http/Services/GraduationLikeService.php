<?php

namespace App\Http\Services;

use App\Models\Graduation;
use App\Models\GraduationLike;
use Illuminate\Support\Facades\DB;

class GraduationLikeService extends Service
{
    /*
     * Add Graduation  Like
     */
    public function store($request)
    {
        $getLike = GraduationLike::where("graduation_id", $request->graduationId)
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
                Graduation::find($request->graduationId)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new GraduationLike;
            $like->user_id = $this->id;
            $like->graduation_id = $request->graduationId;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                Graduation::find($request->graduationId)
                    ->increment("likes");
            });

            $message = "Graduation  Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
