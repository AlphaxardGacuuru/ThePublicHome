<?php

namespace Database\Seeders;

use App\Models\Death;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeathSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Death::factory()
		->count(100)
		->hasDeathComments(rand(1, 10))
		->create();
    }
}
