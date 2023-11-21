<?php

namespace App\Http\Controllers;

use App\Http\Services\WeddingAnnouncementService;
use App\Models\WeddingAnnouncement;
use Illuminate\Http\Request;

class WeddingAnnouncementController extends Controller
{
	public function __construct(protected WeddingAnnouncementService $service)
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
     * @param  \App\Models\WeddingAnnouncement  $weddingAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function show(WeddingAnnouncement $weddingAnnouncement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WeddingAnnouncement  $weddingAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WeddingAnnouncement $weddingAnnouncement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WeddingAnnouncement  $weddingAnnouncement
     * @return \Illuminate\Http\Response
     */
    public function destroy(WeddingAnnouncement $weddingAnnouncement)
    {
        //
    }
}
