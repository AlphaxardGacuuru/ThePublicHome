<?php

namespace App\Listeners;

use App\Events\CelebrationCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CelebrationCommentLikedListener
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
     * @param  \App\Events\CelebrationCommentLikedEvent  $event
     * @return void
     */
    public function handle(CelebrationCommentLikedEvent $event)
    {
        //
    }
}
