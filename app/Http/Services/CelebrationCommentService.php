<?php

namespace App\Http\Services;

use App\Http\Resources\CelebrationCommentResource;
use App\Models\CelebrationComment;
use Illuminate\Support\Facades\DB;

class CelebrationCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getCelebrationComments = CelebrationComment::where("celebration_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return CelebrationCommentResource::collection($getCelebrationComments);
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
        $comment = new CelebrationComment;
        $comment->celebration_id = $request->input('id');
        $comment->user_id = auth('sanctum')->user()->id;
        $comment->text = $request->input('text');

        $saved = DB::transaction(function () use ($comment) {
            // Increment Comments
            $comment->celebration->increment("comments");

            return $comment->save();
        });

		// Check if commenter is owner of celebrations
        $notCurrentUser = $comment->celebration->user_id != $this->id;

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
			$comment = CelebrationComment::findOrFail($id);
			
            // Decrement Comment
            $comment->celebration->decrement("comments");
			
            // Delete Comment
			return $comment->delete();
        });

        return [$deleted, "Comment deleted"];
    }
}
