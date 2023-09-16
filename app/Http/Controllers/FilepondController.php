<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilePondController extends Controller
{
	/*
	* Handle Death Announcement Media
	*/ 

    /*
     * Handle Death Announcement Poster Upload */
    public function storeDeathAnnouncementPoster(Request $request)
    {
        $this->validate($request, [
            'filepond-poster' => 'required|file',
        ]);

        $poster = $request->file('filepond-poster')->store('public/death-announcement-posters');
        $posterShort = substr($poster, 7);

        return $posterShort;
    }

    /*
     * Handle Club Poster Delete */
    public function destoryDeathAnnouncementPoster($id)
    {
		Storage::delete('public/death-announcement-posters/' . $id);

        return response("Death Announcement Poster deleted", 200);
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
