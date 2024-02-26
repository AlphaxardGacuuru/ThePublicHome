<?php

namespace App\Http\Services;

use App\Http\Resources\GraduationCommentResource;
use App\Models\GraduationComment;
use Illuminate\Support\Facades\DB;

class GraduationCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getGraduationComments = GraduationComment::where("graduation_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return GraduationCommentResource::collection($getGraduationComments);
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
        $comment = new GraduationComment;
        $comment->graduation_id = $request->input('id');
        $comment->user_id = auth('sanctum')->user()->id;
        $comment->text = $request->input('text');

        $saved = DB::transaction(function () use ($comment) {
            // Increment Comments
            $comment->graduation->increment("comments");

            return $comment->save();
        });

		// Check if commenter is owner of graduations
        $notCurrentUser = $comment->graduation->user_id != $this->id;
        
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
			$comment = GraduationComment::findOrFail($id);
			
            // Decrement Comment
            $comment->graduation->decrement("comments");
			
            // Delete Comment
			return $comment->delete();
        });

        return [$deleted, "Comment deleted"];
    }
}
