<?php

namespace App\Listeners;

use App\Events\SuccessCardLikedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SuccessCardLikedListener
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
     * @param  \App\Events\SuccessCardLikedEvent  $event
     * @return void
     */
    public function handle(SuccessCardLikedEvent $event)
    {
        //
    }
}
