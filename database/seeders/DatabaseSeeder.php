<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
			UserSeeder::class,
			MembershipSeeder::class,
            DeathSeeder::class,
			WeddingSeeder::class,
			GraduationSeeder::class,
			SuccessCardSeeder::class,
			AnniversarySeeder::class,
			CelebrationSeeder::class,
			RecapSeeder::class
        ]);
    }
}
