<?php

namespace App\Listeners;

use App\Events\GraduationCommentedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GraduationCommentedListener
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
     * @param  \App\Events\GraduationCommentedEvent  $event
     * @return void
     */
    public function handle(GraduationCommentedEvent $event)
    {
        //
    }
}
