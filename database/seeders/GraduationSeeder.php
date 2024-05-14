<?php

namespace Database\Seeders;

use App\Models\Graduation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GraduationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Graduation::factory()
		->count(100)
		->hasGraduationComments(rand(1, 10))
		->create();
    }
}
