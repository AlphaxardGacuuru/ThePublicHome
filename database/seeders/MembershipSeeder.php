<?php

namespace Database\Seeders;

use App\Models\Membership;
use Illuminate\Database\Seeder;

class MembershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $memberships = [
            "death" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "videos" => 0,
                    "eulogy" => [1, 1500],
                    "price" => 28,
                ],
                "vip" => [
                    "announcement" => 1000000,
                    "photos" => 60,
                    "videos" => 100,
                    "eulogy" => [10, 1000000],
                    "price" => 280,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 1000000,
                    "eulogy" => [1000000, 1000000],
                    "price" => 2800,
                ],
            ],
            "wedding" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 10,
                    "videos" => 0,
                    "price" => 10,
                ],
                "vip" => [
                    "announcement" => 400,
                    "photos" => 50,
                    "videos" => 20,
                    "price" => 50,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 40,
                    "price" => 100,
                ],
            ],
            "graduation" => [
                "standard" => [
                    "announcement" => 200,
                    "photos" => 5,
                    "videos" => 0,
                    "price" => 1,
                ],
                "vip" => [
                    "announcement" => 1000000,
                    "photos" => 20,
                    "videos" => 10,
                    "price" => 40,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 20,
                    "price" => 90,
                ],
            ],
            "success_card" => [
                "standard" => [
                    "announcement" => 200,
                    "photos" => 2,
                    "videos" => 0,
                    "price" => 1,
                ],
                "vip" => [
                    "announcement" => 1000000,
                    "photos" => 10,
                    "videos" => 5,
                    "price" => 30,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 10,
                    "price" => 80,
                ],
            ],
            "anniversary" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 10,
                    "videos" => 0,
                    "price" => 10,
                ],
                "vip" => [
                    "announcement" => 1000000,
                    "photos" => 50,
                    "videos" => 20,
                    "price" => 50,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 40,
                    "price" => 100,
                ],
            ],
            "celebration" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 10,
                    "videos" => 0,
                    "price" => 10,
                ],
                "vip" => [
                    "announcement" => 1000000,
                    "photos" => 50,
                    "videos" => 20,
                    "price" => 50,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 40,
                    "price" => 100,
                ],
            ],
        ];

        foreach ($memberships as $name => $tiers) {
            foreach ($tiers as $tierName => $features) {
                Membership::factory()->create([
                    "name" => $name,
                    "tier" => $tierName,
                    "features" => $features,
                    "price" => $features["price"],
                ]);
            }
        }
    }
}
