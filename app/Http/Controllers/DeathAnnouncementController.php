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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeathAnnouncement  $deathAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function show(DeathAnnouncement $deathAnnouncement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeathAnnouncement  $deathAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeathAnnouncement $deathAnnouncement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeathAnnouncement  $deathAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeathAnnouncement $deathAnnouncement)
    {
        //
    }
}
