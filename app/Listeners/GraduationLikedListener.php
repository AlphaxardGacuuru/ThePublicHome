<?php

namespace App\Listeners;

use App\Events\GraduationLikedEvent;
use App\Notifications\GraduationLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GraduationLikedListener
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
     * @param  \App\Events\GraduationLikedEvent  $event
     * @return void
     */
    public function handle(GraduationLikedEvent $event)
    {
        $event
            ->graduation
            ->user
            ->notify(new GraduationLikedNotification($event->graduation, $event->user));
    }
}
