<?php

namespace App\Http\Services;

use App\Models\DeathAnnouncement;
use App\Models\DeathAnnouncementLike;
use Illuminate\Support\Facades\DB;

class DeathAnnouncementLikeService extends Service
{
    /*
     * Add Death Announcement Like
     */
    public function store($request)
    {
        $getLike = DeathAnnouncementLike::where("death_announcement_id", $request->deathAnnouncementId)
            ->where("user_id", $this->id);

        $hasLiked = $getLike->exists();

        // Check if has liked
        if ($hasLiked) {
            // Get Like
            $like = $getLike->first();

            DB::transaction(function () use ($getLike, $request) {
                // Delete Like
                $getLike->delete();

                // Decrement Likes
                DeathAnnouncement::find($request->deathAnnouncementId)
                    ->decrement("likes");
            });

            // Set message
            $message = "Liked removed";
            $added = false;
        } else {
            $like = new DeathAnnouncementLike;
            $like->user_id = $this->id;
            $like->death_announcement_id = $request->deathAnnouncementId;

            DB::transaction(function () use ($like, $request) {
                $like->save();

                // Increment Likes
                DeathAnnouncement::find($request->deathAnnouncementId)
                    ->increment("likes");
            });

            $message = "Death Announcement Liked";
            $added = true;
        }

        return [$added, $message, $like];
    }
}
