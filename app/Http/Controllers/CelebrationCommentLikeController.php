<?php

namespace App\Http\Controllers;

use App\Events\CelebrationCommentLikedEvent;
use App\Http\Services\CelebrationCommentLikeService;
use App\Models\CelebrationCommentLike;
use Illuminate\Http\Request;

class CelebrationCommentLikeController extends Controller
{
    public function __construct(protected CelebrationCommentLikeService $service)
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

        CelebrationCommentLikedEvent::dispatchIf(
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
     * @param  \App\Models\CelebrationCommentLike  $celebrationCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(CelebrationCommentLike $celebrationCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CelebrationCommentLike  $celebrationCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CelebrationCommentLike $celebrationCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CelebrationCommentLike  $celebrationCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(CelebrationCommentLike $celebrationCommentLike)
    {
        //
    }
}
