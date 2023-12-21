<?php

namespace App\Http\Services;

use App\Http\Resources\CelebrationCommentResource;
use App\Models\CelebrationComment;

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
        $celebrationComment = new CelebrationComment;
        $celebrationComment->celebration_id = $request->input('id');
        $celebrationComment->user_id = auth('sanctum')->user()->id;
        $celebrationComment->text = $request->input('text');

        $saved = $celebrationComment->save();
        // Check if commenter is owner of celebrations
        $notCurrentUser = $celebrationComment->celebration->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $celebrationComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = CelebrationComment::findOrFail($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
