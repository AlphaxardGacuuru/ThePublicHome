<?php

namespace App\Listeners;

use App\Events\DeathCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeathCommentLikedListener
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
     * @param  \App\Events\DeathCommentLikedEvent  $event
     * @return void
     */
    public function handle(DeathCommentLikedEvent $event)
    {
        //
    }
}
