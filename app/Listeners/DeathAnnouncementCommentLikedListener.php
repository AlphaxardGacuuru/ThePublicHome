<?php

namespace App\Listeners;

use App\Events\DeathAnnouncementCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeathAnnouncementCommentLikedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\DeathAnnouncementCommentLikedEvent  $event
     * @return void
     */
    public function handle(DeathAnnouncementCommentLikedEvent $event)
    {
        //
    }
}
