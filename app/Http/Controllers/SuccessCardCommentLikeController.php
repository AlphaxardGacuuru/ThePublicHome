<?php

namespace App\Http\Controllers;

use App\Events\SuccessCardCommentLikedEvent;
use App\Http\Services\SuccessCardCommentLikeService;
use App\Models\SuccessCardCommentLike;
use Illuminate\Http\Request;

class SuccessCardCommentLikeController extends Controller
{
    public function __construct(protected SuccessCardCommentLikeService $service)
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

        SuccessCardCommentLikedEvent::dispatchIf(
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
     * @param  \App\Models\SuccessCardCommentLike  $successCardCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(SuccessCardCommentLike $successCardCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SuccessCardCommentLike  $successCardCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SuccessCardCommentLike $successCardCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SuccessCardCommentLike  $successCardCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(SuccessCardCommentLike $successCardCommentLike)
    {
        //
    }
}
