<?php

namespace App\Http\Controllers;

use App\Http\Services\AnniversaryCommentLikeService;
use App\Models\AnniversaryCommentLike;
use Illuminate\Http\Request;

class AnniversaryCommentLikeController extends Controller
{
    public function __construct(protected AnniversaryCommentLikeService $service)
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

        AnniversaryCommentLikedEvent::dispatchIf(
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
     * @param  \App\Models\AnniversaryCommentLike  $anniversaryCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(AnniversaryCommentLike $anniversaryCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AnniversaryCommentLike  $anniversaryCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AnniversaryCommentLike $anniversaryCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AnniversaryCommentLike  $anniversaryCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(AnniversaryCommentLike $anniversaryCommentLike)
    {
        //
    }
}
