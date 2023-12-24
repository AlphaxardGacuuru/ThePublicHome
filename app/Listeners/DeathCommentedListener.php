<?php

namespace App\Listeners;

use App\Events\DeathCommentedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeathCommentedListener
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
     * @param  \App\Events\DeathCommentedEvent  $event
     * @return void
     */
    public function handle(DeathCommentedEvent $event)
    {
        //
    }
}
