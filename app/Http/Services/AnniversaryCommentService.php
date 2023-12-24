<?php

namespace App\Http\Services;

use App\Http\Resources\AnniversaryCommentResource;
use App\Models\AnniversaryComment;

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
        $anniversaryComment = new AnniversaryComment;
        $anniversaryComment->anniversary_id = $request->input('id');
        $anniversaryComment->user_id = auth('sanctum')->user()->id;
        $anniversaryComment->text = $request->input('text');

        $saved = $anniversaryComment->save();
        // Check if commenter is owner of anniversarys
        $notCurrentUser = $anniversaryComment->anniversary->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $anniversaryComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = AnniversaryComment::findOrFail($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
