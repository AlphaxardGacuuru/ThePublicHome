<?php

namespace App\Http\Services;

use App\Http\Resources\DeathAnnouncementCommentResource;
use App\Models\DeathAnnouncementComment;

class DeathAnnouncementCommentService extends Service
{
    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $getDeathAnnouncementComments = DeathAnnouncementComment::where("death_announcement_id", $id)
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return DeathAnnouncementCommentResource::collection($getDeathAnnouncementComments);
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
        $deathAnnouncementComment = new DeathAnnouncementComment;
        $deathAnnouncementComment->death_announcement_id = $request->input('id');
        $deathAnnouncementComment->user_id = auth('sanctum')->user()->id;
        $deathAnnouncementComment->text = $request->input('text');

        $saved = $deathAnnouncementComment->save();
        // Check if commenter is owner of deathAnnouncements
        $notCurrentUser = $deathAnnouncementComment->deathAnnouncement->user_id != $this->id;
        // Dispatch if comment is saved successfully and commenter is not owner of audio
        $canDispatch = $notCurrentUser && $saved;

        return [$canDispatch, "Comment posted", $deathAnnouncementComment];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deleted = DeathAnnouncementComment::find($id)->delete();

        return [$deleted, "Comment deleted"];
    }
}
