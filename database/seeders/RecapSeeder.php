<?php

namespace Database\Seeders;

use App\Models\Anniversary;
use App\Models\Celebration;
use App\Models\Death;
use App\Models\Graduation;
use App\Models\Recap;
use App\Models\SuccessCard;
use App\Models\Wedding;
use Illuminate\Database\Seeder;

class RecapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Death::limit(10)
            ->get()
            ->each(function ($death) {
                Recap::factory()->create([
                    "death_id" => $death->id,
                    "user_id" => $death->user_id,
                ]);
            });

        Wedding::limit(10)
            ->get()
            ->each(function ($wedding) {
                Recap::factory()->create([
                    "wedding_id" => $wedding->id,
                    "user_id" => $wedding->user_id,
                ]);
            });

        Graduation::limit(10)
            ->get()
            ->each(function ($graduation) {
                Recap::factory()->create([
                    "graduation_id" => $graduation->id,
                    "user_id" => $graduation->user_id,
                ]);
            });

        SuccessCard::limit(10)
            ->get()
            ->each(function ($successCard) {
                Recap::factory()->create([
                    "success_card_id" => $successCard->id,
                    "user_id" => $successCard->user_id,
                ]);
            });

        Anniversary::limit(10)
            ->get()
            ->each(function ($anniversary) {
                Recap::factory()->create([
                    "anniversary_id" => $anniversary->id,
                    "user_id" => $anniversary->user_id,
                ]);
            });

        Celebration::limit(10)
            ->get()
            ->each(function ($celebration) {
                Recap::factory()->create([
                    "celebration_id" => $celebration->id,
                    "user_id" => $celebration->user_id,
                ]);
            });
    }
}
