<?php

namespace App\Http\Controllers;

use App\Events\GraduationLikedEvent;
use App\Http\Services\GraduationLikeService;
use App\Models\GraduationLike;
use Illuminate\Http\Request;

class GraduationLikeController extends Controller
{
	public function __construct(protected GraduationLikeService $service)
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
			"id" => "integer|required"
		]);

        [$saved, $message, $like] = $this->service->store($request);

        GraduationLikedEvent::dispatchIf(
            $saved,
            $like->graduation,
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
     * @param  \App\Models\GraduationLike  $graduationLike
     * @return \Illuminate\Http\Response
     */
    public function show(GraduationLike $graduationLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GraduationLike  $graduationLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GraduationLike $graduationLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GraduationLike  $graduationLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(GraduationLike $graduationLike)
    {
        //
    }
}
