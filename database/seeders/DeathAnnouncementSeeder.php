<?php

namespace Database\Seeders;

use App\Models\DeathAnnouncement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeathAnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DeathAnnouncement::factory()->count(10)->create();
    }
}
