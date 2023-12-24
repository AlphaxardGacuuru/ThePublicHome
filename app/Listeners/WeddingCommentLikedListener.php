<?php

namespace App\Listeners;

use App\Events\WeddingCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class WeddingCommentLikedListener
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
     * @param  \App\Events\WeddingCommentLikedEvent  $event
     * @return void
     */
    public function handle(WeddingCommentLikedEvent $event)
    {
        //
    }
}
