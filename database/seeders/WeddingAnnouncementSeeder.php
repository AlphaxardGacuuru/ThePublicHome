<?php

namespace Database\Seeders;

use App\Models\WeddingAnnouncement;
use Illuminate\Database\Seeder;

class WeddingAnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        WeddingAnnouncement::factory()->count(10)->create();
    }
}
