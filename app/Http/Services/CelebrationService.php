<?php

namespace App\Http\Services;

use App\Http\Resources\CelebrationResource;
use App\Models\Celebration;
use App\Models\UserMembership;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class CelebrationService extends Service
{
    /*
     * Get All Celebration s
     */
    public function index()
    {
        $getCelebrations = Celebration::all();

        return CelebrationResource::collection($getCelebrations);
    }

    /*
     * Get One Celebration
     */
    public function show($id)
    {
        $getCelebration = Celebration::findOrFail($id);

        return new CelebrationResource($getCelebration);
    }

    /*
     * Store Anniversary
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

        $celebration = new Celebration;
        $celebration->user_id = $this->id;
        $celebration->membership_id = $request->membershipId;
        $celebration->locale = $request->locale;
        $celebration->title = $request->title;
        $celebration->poster = $request->poster;
        $celebration->announcement = $request->announcement;
        $celebration->venue = $request->venue;
        $celebration->celebration_date = $request->celebrationDate;

        // Try and save Death and update UserMembership
        $saved = DB::transaction(function () use ($celebration, $membershipQuery) {
            $celebration->save();

            // Update Membership
            $membership = $membershipQuery->first();
            $membership->status = "used";

            return $membership->save();
        });

        $message = $celebration->title . " announcement created";

        return [$saved, $message, $celebration];
    }

    /*
     * Update Anniversary
     */
    public function update($request, $id)
    {
        $celebration = Celebration::findOrFail($id);

        if ($request->locale) {
            $celebration->locale = $request->locale;
        }

        if ($request->title) {
            $celebration->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($celebration->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $celebration->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $celebration->announcement = $request->announcement;
        }

        if ($request->venue) {
            $celebration->venue = $request->venue;
        }

        if ($request->celebrationDate) {
            $celebration->celebration_date = $request->celebrationDate;
        }

        if ($request->photo) {
            // Delete photo from storage
            Storage::disk("public")->delete($request->photo);

            // Remove photo from array
            $celebration->photos = collect($celebration->photos)
                ->reject(fn($photo) => $photo == $request->photo)
                ->values()
                ->all();
        }

        if ($request->video) {
            // Delete video from storage
            Storage::disk("public")->delete($request->video);

            // Remove video from array
            $celebration->videos = collect($celebration->videos)
                ->reject(fn($video) => $video == $request->video)
                ->values()
                ->all();
        }

        $saved = $celebration->save();

        // Define Message
        $message = $celebration->title . " updated";

        return [$saved, $message, $celebration];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $celebration = Celebration::findOrFail($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($celebration->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Photos
        if ($celebration->photos) {
            foreach ($celebration->photos as $photo) {
                Storage::disk("public")->delete($photo);
            }
        }

        // Delete Videos
        if ($celebration->videos) {
            foreach ($celebration->videos as $video) {
                Storage::disk("public")->delete($video);
            }
        }

        // Delete Anniversary
        $deleted = $celebration->delete();

        return [$deleted, $celebration->name . " announcement deleted"];
    }

    /*
     * By User ID
     */
    public function byUserId($id)
    {
        $getCelebrations = Celebration::where("user_id", $id)->get();

        return CelebrationResource::collection($getCelebrations);
    }
}
