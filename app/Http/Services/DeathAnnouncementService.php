<?php

namespace App\Http\Services;

use App\Http\Resources\DeathAnnouncementResource;
use App\Models\DeathAnnouncement;
use Illuminate\Support\Facades\Storage;

class DeathAnnouncementService extends Service
{
	/*
	* Get All Death Announcements
	*/ 
	public function index()
	{
		$getDeathAnnouncements = DeathAnnouncement::all();

		return DeathAnnouncementResource::collection($getDeathAnnouncements);
	}

	/*
	* Get One Death Announcement
	*/ 
	public function show($id)
	{
		$getDeathAnnouncement = DeathAnnouncement::find($id);

		return new DeathAnnouncementResource($getDeathAnnouncement);
	}

    /*
     * Store Club
     */
    public function store($request)
    {
        $deathAnnouncement = new DeathAnnouncement;
        $deathAnnouncement->user_id = $this->id;
        $deathAnnouncement->name = $request->name;
        $deathAnnouncement->poster = $request->poster;
        $deathAnnouncement->eulogy = $request->eulogy;

		$saved = $deathAnnouncement->save();

		$message = $deathAnnouncement->name . " announcement created";

        return [$saved, $message, $deathAnnouncement];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $deathAnnouncement = DeathAnnouncement::find($id);

        if ($request->name) {
            $deathAnnouncement->name = $request->name;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($deathAnnouncement->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $deathAnnouncement->poster = $request->input("poster");
        }

        if ($request->eulogy) {
            $deathAnnouncement->eulogy = $request->eulogy;
        }

        $saved = $deathAnnouncement->save();
        // Define Message
        $message = $deathAnnouncement->name . " updated";

        return [$saved, $message, $deathAnnouncement];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $deathAnnouncement = DeathAnnouncement::find($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($deathAnnouncement->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Club
        $deleted = $deathAnnouncement->delete();

        return [$deleted, $deathAnnouncement->name . " announcement deleted"];
    }

}
