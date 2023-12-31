<?php

namespace App\Http\Services;

use App\Http\Resources\SuccessCardResource;
use App\Models\SuccessCard;
use App\Models\UserMembership;
use Illuminate\Support\Facades\Storage;

class SuccessCardService extends Service
{
    /*
     * Get All SuccessCard s
     */
    public function index()
    {
        $getSuccessCards = SuccessCard::all();

        return SuccessCardResource::collection($getSuccessCards);
    }

    /*
     * Get One SuccessCard
     */
    public function show($id)
    {
        $getSuccessCard = SuccessCard::findOrFail($id);

        return new SuccessCardResource($getSuccessCard);
    }

    /*
     * Store Club
     */
    public function store($request)
    {
        $successCard = new SuccessCard;
        $successCard->user_id = $this->id;
        $successCard->membership_id = $request->membershipId;
        $successCard->locale = $request->locale;
        $successCard->title = $request->title;
        $successCard->poster = $request->poster;
        $successCard->announcement = $request->announcement;

        $saved = $successCard->save();

        // Update Membership
        $membership = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "pending")
            ->first();
        $membership->status = "used";
        $membership->save();

        $message = $successCard->title . " announcement created";

        return [$saved, $message, $successCard];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $successCard = SuccessCard::findOrFail($id);

        if ($request->locale) {
            $successCard->locale = $request->locale;
        }

        if ($request->title) {
            $successCard->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($successCard->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $successCard->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $successCard->announcement = $request->announcement;
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $successCard->photos = collect($successCard->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $successCard->videos = collect($successCard->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $successCard->save();
        // Define Message
        $message = $successCard->title . " updated";

        return [$saved, $message, $successCard];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $successCard = SuccessCard::findOrFail($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($successCard->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Photos
        if ($successCard->photos) {
            foreach ($successCard->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($successCard->videos) {
            foreach ($successCard->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Club
        $deleted = $successCard->delete();

        return [$deleted, $successCard->name . " announcement deleted"];
    }

}
