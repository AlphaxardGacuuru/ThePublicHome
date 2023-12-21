<?php

namespace App\Http\Services;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserService extends Service
{

    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update($request, $id)
    {
        /* Update profile */
        $user = User::findOrFail($id);

        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('phone')) {
            $user->phone = $request->input('phone');
            // $user->password = Hash::make($request->input('phone'));
        }

        $saved = $user->save();

        return [$saved, "Account updated", $user];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function auth()
    {
        if (auth("sanctum")->check()) {
            $auth = auth('sanctum')->user();

            return new UserResource($auth);
        } else {
            return response([
                "status" => "error",
                "message" => "Not Authenticated"],
                401);
        }
    }
}
