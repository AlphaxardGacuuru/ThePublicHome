<?php

namespace App\Http\Services;

use App\Models\AnniversaryComment;
use App\Models\AnniversaryCommentLike;
use Illuminate\Support\Facades\DB;

class AnniversaryCommentLikeService extends Service
{
	/*
	* Store Like
	*/ 
	public function store($request)
	{
        $getLike = AnniversaryCommentLike::where("anniversary_comment_id", $request->input("commentId"))
            ->where("user_id", $this->id);

        $hasLiked = $getLike->exists();

        // Check
        if ($hasLiked) {
            // Get Like
            $like = $getLike->first();

            DB::transaction(function () use ($getLike, $request) {
                // Delete Like
                $getLike->delete();

                // Decrement Anniversary Review Likes
                AnniversaryComment::find($request->input("commentId"))->decrement("likes");
            });

            $saved = false;
            $message = "Like removed";
        } else {

            $like = DB::transaction(function () use ($request) {
                $like = new AnniversaryCommentLike;
                $like->anniversary_comment_id = $request->input("commentId");
                $like->user_id = $this->id;
                $like->save();

                // Decrement Anniversary Review Likes
                AnniversaryComment::find($request->input("commentId"))->increment("likes");

                return $like;
            });

            $saved = true;
            $message = "Comment Liked";
        }

        return [$saved, $message, $like];	}
}