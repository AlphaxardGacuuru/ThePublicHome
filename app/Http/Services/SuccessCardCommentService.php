<?php

namespace App\Http\Services;

use App\Http\Resources\SuccessCardCommentResource;
use App\Models\SuccessCardComment;

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
        $successCardComment = new SuccessCardComment;
        $successCardComment->success_card_id = $request->input('id');
        $successCardComment->user_id = auth('sanctum')->user()->id;
        $successCardComment->text = $request->input('text');

        $saved = $successCardComment->save();
        // Check if commenter is owner of successCards
        $notCurrentUser = $successCardComment->success_card->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $successCardComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = SuccessCardComment::find($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
