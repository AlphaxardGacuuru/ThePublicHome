<?php

namespace App\Listeners;

use App\Events\AnniversaryLikedEvent;
use App\Notifications\AnniversaryLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AnniversaryLikedListener
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
     * @param  \App\Events\AnniversaryLikedEvent  $event
     * @return void
     */
    public function handle(AnniversaryLikedEvent $event)
    {
        $event
            ->anniversary
            ->user
            ->notify(new AnniversaryLikedNotification($event->anniversary, $event->user));
    }
}
