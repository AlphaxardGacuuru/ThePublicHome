<?php

namespace App\Listeners;

use App\Events\DeathAnnouncementCommentedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeathAnnouncementCommentedListener
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
     * @param  \App\Events\DeathAnnouncementCommentedEvent  $event
     * @return void
     */
    public function handle(DeathAnnouncementCommentedEvent $event)
    {
        //
    }
}
