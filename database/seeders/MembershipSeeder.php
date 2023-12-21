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
                    "eulogy" => 1,
                    "price" => 28,
                ],
                "vip" => [
                    "announcement" => 1000000,
                    "photos" => 60,
                    "videos" => 100,
                    "eulogy" => 10,
                    "price" => 280,
                ],
                "executive" => [
                    "announcement" => 1000000,
                    "photos" => 1000000,
                    "videos" => 1000000,
                    "eulogy" => 1000000,
                    "price" => 2800,
                ],
            ],
            "wedding" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 10,
                    "price" => 10,
                ],
                "vip" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "executive" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
            ],
            "graduation" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "vip" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "executive" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
            ],
            "success_card" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "vip" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "executive" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
            ],
            "anniversary" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "vip" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "executive" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
            ],
            "celebration" => [
                "standard" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "vip" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
                ],
                "executive" => [
                    "announcement" => 400,
                    "photos" => 15,
                    "eulogy" => 1500,
                    "price" => 1,
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
