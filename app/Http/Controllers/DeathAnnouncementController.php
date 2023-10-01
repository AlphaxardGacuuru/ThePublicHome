<?php

namespace App\Http\Controllers;

use App\Http\Services\DeathAnnouncementService;
use App\Models\DeathAnnouncement;
use Illuminate\Http\Request;

class DeathAnnouncementController extends Controller
{
    public function __construct(protected DeathAnnouncementService $service)
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
        return $this->service->index();
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
            "name" => "required|string",
            "poster" => "required",
            "eulogy" => "required|string",
        ]);

        [$saved, $message, $deathAnnouncement] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $deathAnnouncement,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeathAnnouncement  $deathAnnouncement
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
     * @param  \App\Models\DeathAnnouncement  $deathAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        [$saved, $message, $deathAnnouncement] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $deathAnnouncement,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathAnnouncement  $deathAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message] = $this->service->destroy($id);

        return response([
            "status" => $deleted,
            "message" => $message,
        ], 200);
    }
}
