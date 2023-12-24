<?php

namespace App\Listeners;

use App\Events\AnniversaryCommentedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AnniversaryCommentedListener
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
     * @param  \App\Events\AnniversaryCommentedEvent  $event
     * @return void
     */
    public function handle(AnniversaryCommentedEvent $event)
    {
        //
    }
}
