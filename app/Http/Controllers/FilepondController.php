<?php

namespace App\Http\Controllers;

use App\Models\Death;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\PdfToImage\Pdf;

class FilePondController extends Controller
{
    /*
     * Handle Death  Media
     */

    /*
     * Handle Death  Poster Upload */
    public function storeDeathPoster(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-poster' => 'required|file',
        ]);

        // Store poster
        $poster = $request->file('filepond-poster')->store('public/death-posters');

        $poster = substr($poster, 7);

        // Retrieve Death
        $death = Death::findOrFail($id);

        $oldPoster = substr($death->poster, 8);

        // Delete the old poster
        Storage::disk("public")->delete($oldPoster);

        $death->poster = $poster;

        return $death->save();
    }

    /*
     * Handle Death  Photos Upload */
    public function storeDeathPhotos(Request $request, $id, $limit)
    {
        $this->validate($request, [
            'filepond-photos' => 'required|file',
        ]);

        // Update Death
        $death = Death::findOrFail($id);

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

        $death->save();

        return $photosInDB;
    }

    /*
     * Handle Death  Videos Upload */
    public function storeDeathVideos(Request $request, $id, $limit)
    {
        $this->validate($request, [
            'filepond-videos' => 'required|file',
        ]);

        // Update Death
        $death = Death::findOrFail($id);

        // Get Photos in Database
        $videosInDB = $death->videos ? $death->videos : [];

        $count = $this->calculateFileSize($videosInDB);

        if ($count <= $limit) {
            $videos = $request
                ->file('filepond-videos')
                ->store('public/death-videos');

            $videos = substr($videos, 7);
        } else {
            return response([
                "status" => "error",
                "message" => "Photo limit reached",
            ], 422);
        }

        // Add new photos to array
        array_push($videosInDB, $videos);

        $death->videos = $videosInDB;

        $death->save();

        return $videosInDB;
    }

    /*
     * Handle Eulogy Upload */
    public function storeEulogy(Request $request, $id, $limit)
    {
        $this->validate($request, [
            'filepond-eulogy' => 'required|file',
        ]);

        $eulogy = $request->file('filepond-eulogy')->getRealPath();

        $pdf = new Pdf($eulogy);

        $pageCount = $pdf->getNumberOfPages();

        if ($pageCount <= $limit) {
            $eulogy = $request->file('filepond-eulogy')->store('public/eulogies');

            $eulogy = substr($eulogy, 7);

            $death = Death::findOrFail($id);
			
            $death->eulogy = $eulogy;

            return $death->save();
        } else {
            return response([
                "status" => "error",
                "message" => "Eulogy cannot have more than " . $limit . " pages",
            ], 422);
        }
    }

    /*
     * Handle Eulogy Delete */
    public function destoryEulogy($id)
    {
        Storage::delete('public/eulogies/' . $id);

        return response("Eulogy deleted", 200);
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

        $user = User::findOrFail($id);

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

    /*
     * Calculate Size of Files
     */
    public function calculateFileSize($filePaths)
    {
        // Calculate the total size of the specified files in bytes
        $totalSize = collect($filePaths)->reduce(function ($carry, $file) {
            // Check if the file exists in the storage
            if (Storage::disk("public")->exists($file)) {
                return $carry + Storage::disk("public")->size($file);
            }
            return $carry;
        }, 0);

        $mbs = $totalSize / (1024 * 1024);

        return round($mbs, 2);
    }
}
