<?php

namespace App\Http\Controllers;

use App\Events\WeddingLikedEvent;
use App\Http\Services\WeddingLikeService;
use App\Models\WeddingLike;
use Illuminate\Http\Request;

class WeddingLikeController extends Controller
{
	public function __construct(protected WeddingLikeService $service)
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

        WeddingLikedEvent::dispatchIf(
            $saved,
            $like->wedding,
            $like->user
        );

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $like,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WeddingLike  $weddingLike
     * @return \Illuminate\Http\Response
     */
    public function show(WeddingLike $weddingLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WeddingLike  $weddingLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WeddingLike $weddingLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WeddingLike  $weddingLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(WeddingLike $weddingLike)
    {
        //
    }
}
