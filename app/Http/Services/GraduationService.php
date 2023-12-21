<?php

namespace App\Http\Services;

use App\Http\Resources\GraduationResource;
use App\Models\Graduation;
use Illuminate\Support\Facades\Storage;

class GraduationService extends Service
{
    /*
     * Get All Graduation s
     */
    public function index()
    {
        $getGraduations = Graduation::all();

        return GraduationResource::collection($getGraduations);
    }

    /*
     * Get One Graduation
     */
    public function show($id)
    {
        $getGraduation = Graduation::findOrFail($id);

        return new GraduationResource($getGraduation);
    }

    /*
     * Store Club
     */
    public function store($request)
    {
        $graduation = new Graduation;
        $graduation->user_id = $this->id;
        $graduation->title = $request->title;
        $graduation->poster = $request->poster;
        $graduation->announcement = $request->announcement;
        $graduation->venue = $request->venue;
        $graduation->graduation_date = $request->graduationDate;

        $saved = $graduation->save();

        $message = $graduation->name . " announcement created";

        return [$saved, $message, $graduation];
    }

    /*
     * Update Club
     */
    public function update($request, $id)
    {
        $graduation = Graduation::findOrFail($id);

        if ($request->title) {
            $graduation->title = $request->title;
        }

        if ($request->poster) {
            // Get old poster and delete it
            $oldPoster = substr($graduation->poster, 8);

            Storage::disk("public")->delete($oldPoster);

            $graduation->poster = $request->input("poster");
        }

        if ($request->announcement) {
            $graduation->announcement = $request->announcement;
        }

        if ($request->venue) {
            $graduation->venue = $request->venue;
        }

        if ($request->graduationDate) {
            $graduation->graduation_date = $request->graduationDate;
        }

        $saved = $graduation->save();
        // Define Message
        $message = $graduation->name . " updated";

        return [$saved, $message, $graduation];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $graduation = Graduation::findOrFail($id);

        // Get old poster and delete it
        $deleted = $oldPoster = substr($graduation->poster, 8);

        Storage::disk("public")->delete($oldPoster);

        // Delete Club
        $deleted = $graduation->delete();

        return [$deleted, $graduation->name . " announcement deleted"];
    }

}
