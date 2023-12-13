<?php

namespace App\Http\Controllers;

use App\Models\Death;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilePondController extends Controller
{
    /*
     * Handle Death  Media
     */

    /*
     * Handle Death  Poster Upload */
    public function storeDeathPoster(Request $request)
    {
        $this->validate($request, [
            'filepond-poster' => 'required|file',
        ]);

        $poster = $request->file('filepond-poster')->store('public/death-posters');
        $posterShort = substr($poster, 7);

        return $posterShort;
    }

    /*
     * Handle Death  Photos Upload */
    public function storeDeathPhotos(Request $request, $id, $limit)
    {
        $this->validate($request, [
            'filepond-photos' => 'required|file',
        ]);

        // Update Death
        $death = Death::find($id);

        // Get Photos in Database
        $photosInDB = $death->photos ? $death->photos : [];

        // Check if user has reached photo upload limit
        if (count($photosInDB) <= $limit) {
            $photos = $request
                ->file('filepond-photos')
                ->store('public/death-photos');

            $photos = substr($photos, 7);
        } else {
            return response([
                "status" => "error",
                "message" => "Photo limit reached",
            ], 422);
        }

        // Add new photos to array
        array_push($photosInDB, $photos);

        $death->photos = $photosInDB;
        $saved = $death->save();

        return response([
            "status" => $saved,
            "message" => "Photo saved successfully",
        ], 200);
    }

    /*
     * Handle Death  Videos Upload */
    public function storeDeathVideos(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-videos' => 'required|file',
        ]);

        $videos = $request
            ->file('filepond-videos')
            ->store('public/death-videos');
        $videos = substr($videos, 7);

        // Update Death
        $death = Death::find($id);

        // Get Photos in Database
        $videosInDB = $death->videos ? $death->videos : [];

        // Add new photos to array
        array_push($videosInDB, $videos);

        $death->videos = $videosInDB;
        $saved = $death->save();

        return response([
            "status" => $saved,
            "message" => "Video saved successfully",
        ], 200);
    }

    /*
     * Handle Eulogy Upload */
    public function storeEulogy(Request $request)
    {
        $this->validate($request, [
            'filepond-eulogy' => 'required|file',
        ]);

        $eulogy = $request->file('filepond-eulogy')->store('public/eulogies');
        $eulogy = substr($eulogy, 7);

        return $eulogy;
    }

    /*
     * Handle Club Poster Delete */
    public function destoryDeathPoster($id)
    {
        Storage::delete('public/death-posters/' . $id);

        return response("Death  Poster deleted", 200);
    }

    /*
     * Avatar Media
     */

    /*
     * Handle Avatar Upload */
    public function updateAvatar(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-avatar' => 'required|image',
        ]);

        $avatar = $request->file('filepond-avatar')->store('public/avatars');
        $avatar = substr($avatar, 7);

        $user = User::find($id);

        // Delete Avatar if it's not the default one
        if ($user->avatar != '/storage/avatars/male-avatar.png') {

            // Get old avatar and delete it
            $oldAvatar = substr($user->avatar, 9);

            Storage::disk("public")->delete($oldAvatar);
        }

        $user->avatar = $avatar;
        $user->save();

        return response(["message" => "Avatar updated"], 200);
    }
}
