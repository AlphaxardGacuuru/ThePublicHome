<?php

namespace App\Http\Services;

use App\Http\Resources\AnniversaryCommentResource;
use App\Models\AnniversaryComment;
use Illuminate\Support\Facades\DB;

class AnniversaryCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getAnniversaryComments = AnniversaryComment::where("anniversary_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return AnniversaryCommentResource::collection($getAnniversaryComments);
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
        $comment = new AnniversaryComment;
        $comment->anniversary_id = $request->input('id');
        $comment->user_id = auth('sanctum')->user()->id;
        $comment->text = $request->input('text');

        $saved = DB::transaction(function () use ($comment) {
            // Increment Comments
            $comment->anniversary->increment("comments");

            return $comment->save();
        });

		// Check if commenter is owner of anniversarys
        $notCurrentUser = $comment->anniversary->user_id != $this->id;
        
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
			$comment = AnniversaryComment::findOrFail($id);
			
            // Decrement Comment
            $comment->anniversary->decrement("comments");
			
            // Delete Comment
			return $comment->delete();
        });

        return [$deleted, "Comment deleted"];
    }
}
