<?php

namespace App\Http\Services;

use App\Http\Resources\WeddingResource;
use App\Models\Wedding;
use App\Models\UserMembership;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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
        $membershipQuery = UserMembership::where("user_id", $this->id)
            ->where("membership_id", $request->membershipId)
            ->where("status", "pending");

        // Check if User Has Membership
        if ($membershipQuery->doesntExist()) {
            throw ValidationException::withMessages([
                'membership' => ['Membership Not Found.'],
            ]);
        }

        $wedding = new Wedding;
        $wedding->user_id = $this->id;
        $wedding->membership_id = $request->membershipId;
        $wedding->locale = $request->locale;
        $wedding->title = $request->title;
        $wedding->poster = $request->poster;
        $wedding->announcement = $request->announcement;
        $wedding->venue = $request->venue;
        $wedding->wedding_date = $request->weddingDate;

        // Try and save Death and update UserMembership
        $saved = DB::transaction(function () use ($wedding, $membershipQuery) {
            $wedding->save();

            // Update Membership
            $membership = $membershipQuery->first();
            $membership->status = "used";

            return $membership->save();
        });

        $message = $wedding->title . " announcement created";

        return [$saved, $message, $wedding];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $wedding = Wedding::findOrFail($id);

        if ($request->locale) {
            $wedding->locale = $request->locale;
        }

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

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $wedding->photos = collect($wedding->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $wedding->videos = collect($wedding->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $wedding->save();

        // Define Message
        $message = $wedding->title . " updated";

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

        // Delete Photos
        if ($wedding->photos) {
            foreach ($wedding->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($wedding->videos) {
            foreach ($wedding->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Club
        $deleted = $wedding->delete();

        return [$deleted, $wedding->name . " announcement deleted"];
    }

    /*
     * By User ID
     */
    public function byUserId($id)
    {
        $getWeddings = Wedding::where("user_id", $id)->get();

        return WeddingResource::collection($getWeddings);
    }
}
