<?php

namespace App\Http\Controllers;

use App\Http\Services\DeathAnnouncementLikeService;
use App\Models\DeathAnnouncementLike;
use Illuminate\Http\Request;

class DeathAnnouncementLikeController extends Controller
{
    public function __construct(protected DeathAnnouncementLikeService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        [$saved, $message, $like] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $like,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeathAnnouncementLike  $deathAnnouncementLike
     * @return \Illuminate\Http\Response
     */
    public function show(DeathAnnouncementLike $deathAnnouncementLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeathAnnouncementLike  $deathAnnouncementLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeathAnnouncementLike $deathAnnouncementLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathAnnouncementLike  $deathAnnouncementLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeathAnnouncementLike $deathAnnouncementLike)
    {
        //
    }
}
