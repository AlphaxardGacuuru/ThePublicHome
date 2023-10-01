<?php

namespace App\Http\Controllers;

use App\Events\DeathAnnouncementCommentedEvent;
use App\Http\Services\DeathAnnouncementCommentService;
use App\Models\DeathAnnouncementComment;
use Illuminate\Http\Request;

class DeathAnnouncementCommentController extends Controller
{
    public function __construct(protected DeathAnnouncementCommentService $service)
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
            'text' => 'required',
        ]);

        [$canDispatch, $message, $deathAnnouncementComment] = $this->service->store($request);

        DeathAnnouncementCommentedEvent::dispatchIf(
            $canDispatch,
            $deathAnnouncementComment->deathAnnouncement,
            $deathAnnouncementComment->user
        );

        return response([
            "message" => $message,
            "data" => $deathAnnouncementComment,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeathAnnouncementComment  $deathAnnouncementComment
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeathAnnouncementComment  $deathAnnouncementComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathAnnouncementComment  $deathAnnouncementComment
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response([
			"status" => $deleted,
			"message" => $message
		], 200);
    }
}
