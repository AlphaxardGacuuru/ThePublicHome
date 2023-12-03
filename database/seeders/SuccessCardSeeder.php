<?php

namespace Database\Seeders;

use App\Models\SuccessCard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuccessCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SuccessCard::factory()->count(20)->create();
    }
}
