<?php

namespace App\Http\Controllers;

use App\Events\WeddingCommentLikedEvent;
use App\Http\Services\WeddingCommentLikeService;
use App\Models\WeddingCommentLike;
use Illuminate\Http\Request;

class WeddingCommentLikeController extends Controller
{
    public function __construct(protected WeddingCommentLikeService $service)
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

        WeddingCommentLikedEvent::dispatchIf(
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
     * @param  \App\Models\WeddingCommentLike  $weddingCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(WeddingCommentLike $weddingCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WeddingCommentLike  $weddingCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WeddingCommentLike $weddingCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WeddingCommentLike  $weddingCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(WeddingCommentLike $weddingCommentLike)
    {
        //
    }
}
