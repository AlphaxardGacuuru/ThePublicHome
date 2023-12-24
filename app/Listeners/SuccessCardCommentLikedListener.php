<?php

namespace App\Listeners;

use App\Events\SuccessCardCommentLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SuccessCardCommentLikedListener
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
     * @param  \App\Events\SuccessCardCommentLikedEvent  $event
     * @return void
     */
    public function handle(SuccessCardCommentLikedEvent $event)
    {
        //
    }
}
