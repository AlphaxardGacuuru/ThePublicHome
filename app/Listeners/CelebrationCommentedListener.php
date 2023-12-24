<?php

namespace App\Listeners;

use App\Events\CelebrationCommentedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CelebrationCommentedListener
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
     * @param  \App\Events\CelebrationCommentedEvent  $event
     * @return void
     */
    public function handle(CelebrationCommentedEvent $event)
    {
        //
    }
}
