<?php

namespace App\Http\Controllers;

use App\Models\Anniversary;
use App\Models\Celebration;
use App\Models\Death;
use App\Models\Graduation;
use App\Models\SuccessCard;
use App\Models\User;
use App\Models\Wedding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\PdfToImage\Pdf;

class FilePondController extends Controller
{

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

        $avatar = $request
            ->file('filepond-avatar'
            )->store('public/avatars');

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
     * Handle  Media
     */

    /*
     * Handle Poster Upload */
    public function storePoster(Request $request, $type, $id)
    {
        $this->validate($request, [
            'filepond-poster' => 'required|file',
        ]);

        // Store poster
        $poster = $request
            ->file('filepond-poster')
            ->store('public/' . $type . '-posters');

        $poster = substr($poster, 7);

        // Retrieve Model
        $model = $this->getModel($type, $id);

        $oldPoster = substr($model->poster, 8);

        // Delete the old poster
        Storage::disk("public")->delete($oldPoster);

        $model->poster = $poster;

        return $model->save();
    }

    /*
     * Handle Photos Upload */
    public function storePhotos(Request $request, $type, $id, $limit)
    {
        $this->validate($request, [
            'filepond-photos' => 'required|file',
        ]);

        // Update Model
        $model = $this->getModel($type, $id);

        // Get Photos in Database
        $photosInDB = $model->photos ? $model->photos : [];

        // Check if user has reached photo upload limit
        if (count($photosInDB) <= $limit) {
            $photos = $request
                ->file('filepond-photos')
                ->store('public/' . $type . '-photos');

            $photos = substr($photos, 7);
        } else {
            return response([
                "status" => "error",
                "message" => "Photo limit reached",
            ], 422);
        }

        // Add new photos to array
        array_push($photosInDB, $photos);

        $model->photos = $photosInDB;

        $model->save();

        return $photosInDB;
    }

    /*
     * Handle Videos Upload */
    public function storeVideos(Request $request, $type, $id, $limit)
    {
        $this->validate($request, [
            'filepond-videos' => 'required|file',
        ]);

        // Update Model
        $model = $this->getModel($type, $id);

        // Get Photos in Database
        $videosInDB = $model->videos ? $model->videos : [];

        $count = $this->calculateFileSize($videosInDB);

        if ($count <= $limit) {
            $videos = $request
                ->file('filepond-videos')
                ->store('public/' . $type . '-videos');

            $videos = substr($videos, 7);
        } else {
            return response([
                "status" => "error",
                "message" => "Video limit reached",
            ], 422);
        }

        // Add new photos to array
        array_push($videosInDB, $videos);

        $model->videos = $videosInDB;

        $model->save();

        return $videosInDB;
    }

    /*
     * Handle Eulogy Upload */
    public function storeEulogy(Request $request, $id, $limit)
    {
        $this->validate($request, [
            'filepond-eulogy' => 'required|file',
        ]);

        $eulogy = $request
            ->file('filepond-eulogy')
            ->getRealPath();

        $pdf = new Pdf($eulogy);

        $pageCount = $pdf->getNumberOfPages();

        if ($pageCount <= $limit) {
            $eulogy = $request
                ->file('filepond-eulogy')
                ->store('public/eulogies');

            $eulogy = substr($eulogy, 7);

            $death = Death::findOrFail($id);

            // Delete Old Eulogy
            $death->eulogy &&
            Storage::disk("public")
                ->delete($death->eulogy);

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
     * Handle Recaps Upload */
    public function storeRecaps(Request $request, $type, $id)
    {
        $this->validate($request, [
            'filepond-recap' => 'required|file',
        ]);

        // Update Model
        $model = $this->getModel($type, $id);

        $recap = $request
            ->file('filepond-recap')
            ->store('public/' . $type . '-recaps');

        // Delete Old Recap
        $oldRecap = substr($model->recap, 8);

        Storage::disk("public")->delete($oldRecap);

        $recap = substr($recap, 7);

        $model->recap = $recap;

        $model->save();

        return $recap;
    }

    /*
     * Handle Eulogy Delete */
    public function destoryEulogy($id)
    {
        Storage::delete('public/eulogies/' . $id);

        return response("Eulogy deleted", 200);
    }

    /*
     * Get Respective Model
     */
    public function getModel($type, $id)
    {
        switch ($type) {
            case "death":
                return Death::findOrFail($id);
                break;

            case "wedding":
                return Wedding::findOrFail($id);
                break;

            case "graduation":
                return Graduation::findOrFail($id);
                break;

            case "success-card":
                return SuccessCard::findOrFail($id);
                break;

            case "anniversary":
                return Anniversary::findOrFail($id);
                break;

            default:
                return Celebration::findOrFail($id);
                break;
        }
    }

    /*
     * Calculate Size of Files
     */
    public function calculateFileSize($filePaths)
    {
        // Calculate the total size of the specified files in bytes
        $totalSize = collect($filePaths)
            ->reduce(function ($carry, $file) {
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
