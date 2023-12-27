<?php

namespace App\Http\Services;

use App\Http\Resources\AnniversaryResource;
use App\Models\Anniversary;
use App\Models\UserMembership;
use Illuminate\Support\Facades\Storage;

class AnniversaryService extends Service
{
    /*
     * Get All Anniversary s
     */
    public function index()
    {
        $getAnniversarys = Anniversary::all();

        return AnniversaryResource::collection($getAnniversarys);
    }

    /*
     * Get One Anniversary
     */
    public function show($id)
    {
        $getAnniversary = Anniversary::findOrFail($id);

        return new AnniversaryResource($getAnniversary);
    }

    /*
     * Store Anniversary
     */
    public function store($request)
    {
        $anniversary = new Anniversary;
        $anniversary->user_id = $this->id;
        $anniversary->membership_id = $request->membershipId;
        $anniversary->locale = $request->locale;
        $anniversary->title = $request->title;
        $anniversary->poster = $request->poster;
        $anniversary->announcement = $request->announcement;
        $anniversary->venue = $request->venue;
        $anniversary->anniversary_date = $request->anniversaryDate;

        $saved = $anniversary->save();

        // Update Membership
        $membership = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "pending")
            ->first();
        $membership->status = "used";
        $membership->save();

        $message = $anniversary->title . " announcement created";

        return [$saved, $message, $anniversary];
    }

    /*
     * Update Anniversary
     */
    public function update($request, $id)
    {
        $anniversary = Anniversary::findOrFail($id);

        if ($request->name) {
            $anniversary->name = $request->name;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($anniversary->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $anniversary->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $anniversary->announcement = $request->announcement;
        }

        if ($request->venue) {
            $anniversary->venue = $request->venue;
        }

        if ($request->anniversaryDate) {
            $anniversary->anniversary_date = $request->anniversaryDate;
        }

        $saved = $anniversary->save();
        // Define Message
        $message = $anniversary->name . " updated";

        return [$saved, $message, $anniversary];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $anniversary = Anniversary::findOrFail($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($anniversary->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Anniversary
        $deleted = $anniversary->delete();

        return [$deleted, $anniversary->name . " announcement deleted"];
    }

}
