<?php

namespace App\Http\Services;

use App\Http\Resources\WeddingCommentResource;
use App\Models\WeddingComment;

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
        $weddingComment = new WeddingComment;
        $weddingComment->wedding_id = $request->input('id');
        $weddingComment->user_id = auth('sanctum')->user()->id;
        $weddingComment->text = $request->input('text');

        $saved = $weddingComment->save();
        // Check if commenter is owner of weddings
        $notCurrentUser = $weddingComment->wedding->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $weddingComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = WeddingComment::find($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
