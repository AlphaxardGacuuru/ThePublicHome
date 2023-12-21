<?php

namespace App\Http\Services;

use App\Http\Resources\CelebrationResource;
use App\Models\Celebration;
use Illuminate\Support\Facades\Storage;

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
        $celebration = new Celebration;
        $celebration->user_id = $this->id;
        $celebration->name = $request->name;
        $celebration->poster = $request->poster;
        $celebration->announcement = $request->announcement;
        $celebration->venue = $request->venue;
        $celebration->celebration_date = $request->celebrationDate;

        $saved = $celebration->save();

        $message = $celebration->name . " announcement created";

        return [$saved, $message, $celebration];
    }

    /*
     * Update Anniversary
     */
    public function update($request, $id)
    {
        $celebration = Celebration::findOrFail($id);

        if ($request->name) {
            $celebration->name = $request->name;
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

        $saved = $celebration->save();
        // Define Message
        $message = $celebration->name . " updated";

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

        // Delete Anniversary
        $deleted = $celebration->delete();

        return [$deleted, $celebration->name . " announcement deleted"];
    }

}
