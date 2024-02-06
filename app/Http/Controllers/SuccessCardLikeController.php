<?php

namespace App\Http\Controllers;

use App\Events\SuccessCardLikedEvent;
use App\Http\Services\SuccessCardLikeService;
use App\Models\SuccessCardLike;
use Illuminate\Http\Request;

class SuccessCardLikeController extends Controller
{
	public function __construct(protected SuccessCardLikeService $service)
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

        SuccessCardLikedEvent::dispatchIf(
            $saved,
            $like->successCard,
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
     * @param  \App\Models\SuccessCardLike  $successCardLike
     * @return \Illuminate\Http\Response
     */
    public function show(SuccessCardLike $successCardLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SuccessCardLike  $successCardLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SuccessCardLike $successCardLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SuccessCardLike  $successCardLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(SuccessCardLike $successCardLike)
    {
        //
    }
}
