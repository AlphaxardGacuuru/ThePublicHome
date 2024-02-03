<?php

namespace App\Listeners;

use App\Events\DeathLikedEvent;
use App\Notifications\DeathLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeathLikedListener
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
     * @param  \App\Events\DeathLikedEvent  $event
     * @return void
     */
    public function handle(DeathLikedEvent $event)
    {
        $event
            ->death
            ->user
            ->notify(new DeathLikedNotification($event->death, $event->user));
    }
}
