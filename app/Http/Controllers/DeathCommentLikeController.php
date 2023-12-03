<?php

namespace App\Http\Controllers;

use App\Http\Services\DeathCommentLikeService;
use App\Models\DeathCommentLike;
use Illuminate\Http\Request;

class DeathCommentLikeController extends Controller
{
	public function __construct(protected DeathCommentLikeService $service)
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

        DeathCommentLikedEvent::dispatchIf(
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
     * @param  \App\Models\DeathCommentLike  $deathCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(DeathCommentLike $deathCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeathCommentLike  $deathCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeathCommentLike $deathCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathCommentLike  $deathCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeathCommentLike $deathCommentLike)
    {
        //
    }
}
