<?php

namespace App\Listeners;

use App\Events\WeddingLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class WeddingLikedListener
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
     * @param  \App\Events\WeddingLikedEvent  $event
     * @return void
     */
    public function handle(WeddingLikedEvent $event)
    {
        //
    }
}
