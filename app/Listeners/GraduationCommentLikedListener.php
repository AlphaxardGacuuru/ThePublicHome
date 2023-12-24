<?php

namespace App\Listeners;

use App\Events\GraduationCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GraduationCommentLikedListener
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
     * @param  \App\Events\GraduationCommentLikedEvent  $event
     * @return void
     */
    public function handle(GraduationCommentLikedEvent $event)
    {
        //
    }
}
