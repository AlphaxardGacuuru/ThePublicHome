<?php

namespace App\Http\Services;

use App\Http\Resources\WeddingCommentResource;
use App\Models\WeddingComment;
use Illuminate\Support\Facades\DB;

class WeddingCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getWeddingComments = WeddingComment::where("wedding_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return WeddingCommentResource::collection($getWeddingComments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        /* Create new post */
        $comment = new WeddingComment;
        $comment->wedding_id = $request->input('id');
        $comment->user_id = auth('sanctum')->user()->id;
        $comment->text = $request->input('text');

        $saved = DB::transaction(function () use ($comment) {
            // Increment Comments
            $comment->wedding->increment("comments");

            return $comment->save();
        });

		// Check if commenter is owner of weddings
        $notCurrentUser = $comment->wedding->user_id != $this->id;
        
		// Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $comment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = DB::transaction(function () use ($id) {
            $comment = WeddingComment::findOrFail($id);

            // Decrement Comment
            $comment->wedding->decrement("comments");

            // Delete Comment
            return $comment->delete();
        });

        return [$deleted, "Comment deleted"];
    }
}
