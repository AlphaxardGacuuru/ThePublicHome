<?php

namespace App\Http\Controllers;

use App\Events\GraduationCommentLikedEvent;
use App\Http\Services\GraduationCommentLikeService;
use App\Models\GraduationCommentLike;
use Illuminate\Http\Request;

class GraduationCommentLikeController extends Controller
{
    public function __construct(protected GraduationCommentLikeService $service)
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

        GraduationCommentLikedEvent::dispatchIf(
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
     * @param  \App\Models\GraduationCommentLike  $graduationCommentLike
     * @return \Illuminate\Http\Response
     */
    public function show(GraduationCommentLike $graduationCommentLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GraduationCommentLike  $graduationCommentLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GraduationCommentLike $graduationCommentLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GraduationCommentLike  $graduationCommentLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(GraduationCommentLike $graduationCommentLike)
    {
        //
    }
}
