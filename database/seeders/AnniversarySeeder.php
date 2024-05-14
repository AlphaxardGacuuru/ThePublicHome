<?php

namespace Database\Seeders;

use App\Models\Anniversary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnniversarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Anniversary::factory()
		->count(100)
		->hasAnniversaryComments(rand(1, 10))
		->create();
    }
}
