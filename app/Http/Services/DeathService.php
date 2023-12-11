<?php

namespace App\Http\Services;

use App\Http\Resources\DeathResource;
use App\Models\Death;
use App\Models\Membership;
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
        $getDeath = Death::find($id);

        return new DeathResource($getDeath);
    }

    /*
     * Store Club
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
        $death->poster = $request->poster;
        $death->photos = $request->photos;
        $death->eulogy = $request->eulogy;

        $saved = $death->save();

        // Update Membership
        $membership = Membership::find($request->membershipId);
        $membership->status = "used";
        $membership->save();

        $message = $death->name . " announcement created";

        return [$saved, $message, $death];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $death = Death::find($id);

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
            $oldPoster = substr($death->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $death->poster = $request->input("poster");
        }

        if ($request->photos) {
            $death->photos = $request->photos;
        }

        if ($request->eulogy) {
            $death->eulogy = $request->eulogy;
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
        $death = Death::find($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($death->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Club
        $deleted = $death->delete();

        return [$deleted, $death->name . " announcement deleted"];
    }

}
