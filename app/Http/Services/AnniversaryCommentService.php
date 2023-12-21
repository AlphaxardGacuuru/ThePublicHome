<?php

namespace App\Http\Services;

use App\Http\Resources\DeathCommentResource;
use App\Models\DeathComment;

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
        $deathComment = new DeathComment;
        $deathComment->death_id = $request->input('id');
        $deathComment->user_id = auth('sanctum')->user()->id;
        $deathComment->text = $request->input('text');

        $saved = $deathComment->save();
        // Check if commenter is owner of deaths
        $notCurrentUser = $deathComment->death->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $deathComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = DeathComment::findOrFail($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
