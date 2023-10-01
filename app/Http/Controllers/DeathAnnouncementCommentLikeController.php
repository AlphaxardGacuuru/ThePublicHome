<?php

namespace App\Http\Controllers;

use App\Events\DeathAnnouncementCommentLikedEvent;
use App\Http\Services\DeathAnnouncementCommentLikeService;
use App\Models\DeathAnnouncementCommentLike;
use Illuminate\Http\Request;

class DeathAnnouncementCommentLikeController extends Controller
{
	public function __construct(protected DeathAnnouncementCommentLikeService $service)
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

        DeathAnnouncementCommentLikedEvent::dispatchIf(
            $saved,
            $like->comment,
            $like->user
        );

        return response([
            "message" => $message,
            "data" => $like,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeathAnnouncementCommentLike  $deathAnnouncementCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(DeathAnnouncementCommentLike $deathAnnouncementCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeathAnnouncementCommentLike  $deathAnnouncementCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeathAnnouncementCommentLike $deathAnnouncementCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathAnnouncementCommentLike  $deathAnnouncementCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeathAnnouncementCommentLike $deathAnnouncementCommentLike)
    {
        //
    }
}
