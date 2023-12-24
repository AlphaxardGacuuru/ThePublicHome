<?php

namespace App\Listeners;

use App\Events\AnniversaryCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AnniversaryCommentLikedListener
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
     * @param  \App\Events\AnniversaryCommentLikedEvent  $event
     * @return void
     */
    public function handle(AnniversaryCommentLikedEvent $event)
    {
        //
    }
}
