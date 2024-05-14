<?php

namespace Database\Seeders;

use App\Models\Celebration;
use Illuminate\Database\Seeder;

class CelebrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Celebration::factory()
            ->count(100)
            ->hasCelebrationComments(rand(1, 10))
            ->create();
    }
}
