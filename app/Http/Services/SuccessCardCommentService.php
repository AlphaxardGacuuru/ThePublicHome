<?php

namespace App\Http\Services;

use App\Http\Resources\SuccessCardCommentResource;
use App\Models\SuccessCardComment;
use Illuminate\Support\Facades\DB;

class SuccessCardCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getSuccessCardComments = SuccessCardComment::where("success_card_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return SuccessCardCommentResource::collection($getSuccessCardComments);
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
        $comment = new SuccessCardComment;
        $comment->success_card_id = $request->input('id');
        $comment->user_id = auth('sanctum')->user()->id;
        $comment->text = $request->input('text');

        $saved = DB::transaction(function () use ($comment) {
            // Increment Comments
            $comment->successCard->increment("comments");

            return $comment->save();
        });

		// Check if commenter is owner of successCards
        $notCurrentUser = $comment->successCard->user_id != $this->id;
        
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
			$comment = SuccessCardComment::findOrFail($id);
			
            // Decrement Comment
            $comment->successCard->decrement("comments");
			
            // Delete Comment
			return $comment->delete();
        });

        return [$deleted, "Comment deleted"];
    }
}
