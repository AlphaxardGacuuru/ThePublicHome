<?php

namespace App\Http\Services;

use App\Models\SuccessCardComment;
use App\Models\SuccessCardCommentLike;
use Illuminate\Support\Facades\DB;

class SuccessCardCommentLikeService extends Service
{
    /*
     * Store Like
     */
    public function store($request)
    {
        $getLike = SuccessCardCommentLike::where("success_card_comment_id", $request->input("commentId"))
            ->where("user_id", $this->id);

        $hasLiked = $getLike->exists();

        // Check
        if ($hasLiked) {
            // Get Like
            $like = $getLike->first();

            DB::transaction(function () use ($getLike, $request) {
                // Delete Like
                $getLike->delete();

                // Decrement Club Review Likes
                SuccessCardComment::find($request->input("commentId"))->decrement("likes");
            });

            $saved = false;
            $message = "Like removed";
        } else {

            $like = DB::transaction(function () use ($request) {
                $like = new SuccessCardCommentLike;
                $like->success_card_comment_id = $request->input("commentId");
                $like->user_id = $this->id;
                $like->save();

                // Decrement Club Review Likes
                SuccessCardComment::find($request->input("commentId"))->increment("likes");

                return $like;
            });

            $saved = true;
            $message = "Comment Liked";
        }

        return [$saved, $message, $like];}
}
