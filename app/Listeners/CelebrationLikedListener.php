<?php

namespace App\Listeners;

use App\Events\CelebrationLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CelebrationLikedListener
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
     * @param  \App\Events\CelebrationLikedEvent  $event
     * @return void
     */
    public function handle(CelebrationLikedEvent $event)
    {
        //
    }
}
