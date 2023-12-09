<?php

namespace App\Http\Controllers;

use App\Http\Services\CelebrationLikeService;
use App\Models\CelebrationLike;
use Illuminate\Http\Request;

class CelebrationLikeController extends Controller
{
    public function __construct(protected CelebrationLikeService $service)
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
     * @param  \App\Models\CelebrationLike  $celebrationLike
     * @return \Illuminate\Http\Response
     */
    public function show(CelebrationLike $celebrationLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CelebrationLike  $celebrationLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CelebrationLike $celebrationLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CelebrationLike  $celebrationLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(CelebrationLike $celebrationLike)
    {
        //
    }
}
