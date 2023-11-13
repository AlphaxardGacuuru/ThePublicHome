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
        $types = ["death", "graduation", "wedding", "annivesary", "celebration"];

        $memberships = [
            [
                "name" => "standard",
                "price" => "1",
            ],
            [
                "name" => "vip",
                "price" => "5",
            ],
            [
                "name" => "executive",
                "price" => "10",
            ],
        ];

        foreach ($types as $type) {
            foreach ($memberships as $membership) {
                Membership::factory()
                    ->create([
                        "name" => $membership["name"],
                        "price" => $membership["price"],
                        "type" => $type,
                    ]);
            }
        }
    }
}
