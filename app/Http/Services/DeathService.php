<?php

namespace App\Http\Services;

use App\Http\Resources\DeathResource;
use App\Models\Death;
use App\Models\UserMembership;
use Illuminate\Support\Facades\Storage;

class DeathService extends Service
{
    /*
     * Get All Death s
     */
    public function index()
    {
        $getDeaths = Death::all();

        return DeathResource::collection($getDeaths);
    }

    /*
     * Get One Death
     */
    public function show($id)
    {
        $getDeath = Death::findOrFail($id);

        return new DeathResource($getDeath);
    }

    /*
     * Store Death
     */
    public function store($request)
    {
        $death = new Death;
        $death->user_id = $this->id;
        $death->membership_id = $request->membershipId;
        $death->locale = $request->locale;
        $death->name = $request->name;
        $death->sunrise = $request->sunrise;
        $death->sunset = $request->sunset;
        $death->burial_date = $request->burialDate;
        $death->announcement = $request->announcement;

        $saved = $death->save();

        // Update Membership
        $membership = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "pending")
            ->first();
        $membership->status = "used";
        $membership->save();

        $message = $death->name . " announcement created";

        return [$saved, $message, $death];
    }

    /*
     * Update Death
     */
    public function update($request, $id)
    {
        $death = Death::findOrFail($id);

        if ($request->locale) {
            $death->locale = $request->locale;
        }

        if ($request->name) {
            $death->name = $request->name;
        }

        if ($request->sunrise) {
            $death->sunrise = $request->sunrise;
        }

        if ($request->sunset) {
            $death->sunset = $request->sunset;
        }

        if ($request->burialDate) {
            $death->burial_date = $request->burialDate;
        }

        if ($request->announcement) {
            $death->announcement = $request->announcement;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($death->poster, 9);

            Storage::disk("public")->delete($oldPoster);

            $death->poster = $request->input("poster");
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $death->photos = collect($death->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $death->videos = collect($death->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $death->save();

        // Define Message
        $message = $death->name . " updated";

        return [$saved, $message, $death];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $death = Death::findOrFail($id);

        // Get old poster and delete it
        $poster = substr($death->poster, 8);

        Storage::disk("public")->delete($poster);

        // Delete Photos
        if ($death->photos) {
            foreach ($death->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($death->videos) {
            foreach ($death->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Eulogy
        Storage::disk("public")->delete($death->eulogy);

        // Delete Death
        $deleted = $death->delete();

        $message = $death->title . " announcement deleted";

        return [$deleted, $message];
    }

    /*
     * By User ID
     */
    public function byUserId($id)
    {
        $getDeaths = Death::where("user_id", $id)->get();

        return DeathResource::collection($getDeaths);
    }
}
