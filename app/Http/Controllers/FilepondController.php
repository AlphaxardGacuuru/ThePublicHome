<?php

namespace App\Http\Controllers;

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
     * Handle Death  Images Upload */
    public function storeDeathImages(Request $request)
    {
        $this->validate($request, [
            'filepond-images' => 'required|file',
        ]);

        $image = $request->file('filepond-images')->store('public/death-images');
        $imageShort = substr($image, 7);

        return $imageShort;
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
