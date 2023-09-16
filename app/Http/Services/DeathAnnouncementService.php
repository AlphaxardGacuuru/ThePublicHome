<?php

namespace App\Http\Services;

use App\Http\Resources\DeathAnnouncementResource;
use App\Models\DeathAnnouncement;

class DeathAnnouncementService
{
	/*
	* Get All Death Announcements
	*/ 
	public function index()
	{
		$getDeathAnnouncements = DeathAnnouncement::all();

		return DeathAnnouncementResource::collection($getDeathAnnouncements);
	}
}
