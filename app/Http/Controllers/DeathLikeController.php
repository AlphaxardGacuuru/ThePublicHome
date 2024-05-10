<?php

namespace App\Http\Controllers;

use App\Events\DeathLikedEvent;
use App\Http\Services\DeathLikeService;
use App\Models\DeathLike;
use Illuminate\Http\Request;

class DeathLikeController extends Controller
{
    public function __construct(protected DeathLikeService $service)
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
        $this->validate($request, [
            "id" => "integer|required",
        ]);

        [$saved, $message, $like] = $this->service->store($request);

        DeathLikedEvent::dispatchIf(
            $saved,
            $like->death,
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
     * @param  \App\Models\DeathLike  $deathLike
     * @return \Illuminate\Http\Response
     */
    public function show(DeathLike $deathLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeathLike  $deathLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeathLike $deathLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathLike  $deathLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeathLike $deathLike)
    {
        //
    }
}
