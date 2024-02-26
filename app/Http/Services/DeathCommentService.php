<?php

namespace App\Http\Services;

use App\Http\Resources\DeathCommentResource;
use App\Models\Death;
use App\Models\DeathComment;
use Illuminate\Support\Facades\DB;

class DeathCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getDeathComments = DeathComment::where("death_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return DeathCommentResource::collection($getDeathComments);
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
        $comment = new DeathComment;
        $comment->death_id = $request->input('id');
        $comment->user_id = auth('sanctum')->user()->id;
        $comment->text = $request->input('text');

        $saved = DB::transaction(function () use ($comment) {
            // Increment Comments
            $comment->death->increment("comments");

            return $comment->save();
        });

        // Check if commenter is owner of deaths
        $notCurrentUser = $comment->death->user_id != $this->id;

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
			$comment = DeathComment::findOrFail($id);
			
            // Decrement Comment
            $comment->death->decrement("comments");
			
            // Delete Comment
            return $comment->delete();
        });

        return [$deleted, "Comment deleted"];
    }
}
