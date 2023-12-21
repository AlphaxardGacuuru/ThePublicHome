<?php

namespace App\Http\Services;

use App\Http\Resources\GraduationCommentResource;
use App\Models\GraduationComment;

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
        $graduationComment = new GraduationComment;
        $graduationComment->graduation_id = $request->input('id');
        $graduationComment->user_id = auth('sanctum')->user()->id;
        $graduationComment->text = $request->input('text');

        $saved = $graduationComment->save();
        // Check if commenter is owner of graduations
        $notCurrentUser = $graduationComment->graduation->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $graduationComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = GraduationComment::findOrFail($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
