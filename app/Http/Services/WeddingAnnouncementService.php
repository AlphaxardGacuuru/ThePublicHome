<?php

namespace App\Http\Services;

use App\Http\Resources\WeddingAnnouncementResource;
use App\Models\WeddingAnnouncement;

class WeddingAnnouncementService extends Service
{
    /*
     * List Wedding Announcements
     */
    public function index()
    {
        $weddingAnnouncemnts = WeddingAnnouncement::orderBy("id", "DESC")
            ->paginate();

        return WeddingAnnouncementResource::collection($weddingAnnouncemnts);
    }
}
