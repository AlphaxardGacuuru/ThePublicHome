<?php

namespace App\Listeners;

use App\Events\SuccessCardCommentedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SuccessCardCommentedListener
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
     * @param  \App\Events\SuccessCardCommentedEvent  $event
     * @return void
     */
    public function handle(SuccessCardCommentedEvent $event)
    {
        //
    }
}
