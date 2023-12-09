<?php

namespace App\Http\Controllers;

use App\Http\Services\AnniversaryLikeService;
use App\Models\AnniversaryLike;
use Illuminate\Http\Request;

class AnniversaryLikeController extends Controller
{
    public function __construct(protected AnniversaryLikeService $service)
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
     * @param  \App\Models\AnniversaryLike  $anniversaryLike
     * @return \Illuminate\Http\Response
     */
    public function show(AnniversaryLike $anniversaryLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AnniversaryLike  $anniversaryLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AnniversaryLike $anniversaryLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AnniversaryLike  $anniversaryLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(AnniversaryLike $anniversaryLike)
    {
        //
    }
}
