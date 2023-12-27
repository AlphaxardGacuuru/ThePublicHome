<?php

namespace App\Http\Services;

use App\Http\Resources\WeddingResource;
use App\Models\UserMembership;
use App\Models\Wedding;
use Illuminate\Support\Facades\Storage;

class WeddingService extends Service
{
    /*
     * Get All Wedding s
     */
    public function index()
    {
        $getWeddings = Wedding::all();

        return WeddingResource::collection($getWeddings);
    }

    /*
     * Get One Wedding
     */
    public function show($id)
    {
        $getWedding = Wedding::findOrFail($id);

        return new WeddingResource($getWedding);
    }

    /*
     * Store Club
     */
    public function store($request)
    {
        $wedding = new Wedding;
        $wedding->user_id = $this->id;
        $wedding->membership_id = $request->membershipId;
        $wedding->locale = $request->locale;
        $wedding->title = $request->title;
        $wedding->poster = $request->poster;
        $wedding->announcement = $request->announcement;
        $wedding->venue = $request->venue;
        $wedding->wedding_date = $request->weddingDate;

        $saved = $wedding->save();

        // Update Membership
        $membership = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "pending")
            ->first();
        $membership->status = "used";
        $membership->save();

        $message = $wedding->title . " announcement created";

        return [$saved, $message, $wedding];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $wedding = Wedding::findOrFail($id);

        if ($request->title) {
            $wedding->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($wedding->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $wedding->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $wedding->announcement = $request->announcement;
        }

        if ($request->venue) {
            $wedding->venue = $request->venue;
        }

        if ($request->weddingDate) {
            $wedding->wedding_date = $request->weddingDate;
        }

        $saved = $wedding->save();
        // Define Message
        $message = $wedding->name . " updated";

        return [$saved, $message, $wedding];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $wedding = Wedding::findOrFail($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($wedding->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Club
        $deleted = $wedding->delete();

        return [$deleted, $wedding->name . " announcement deleted"];
    }

}
