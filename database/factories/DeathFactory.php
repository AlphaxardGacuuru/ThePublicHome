<?php

namespace Database\Factories;

use App\Models\Membership;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Death>
 */
class DeathFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $membership = Membership::where("name", "death")
            ->get()
            ->random();

        $location = ["home", "international"];

        return [
            'user_id' => User::all()->random()->id,
            'membership_id' => $membership->id,
            'locale' => $location[rand(0, 1)],
            'name' => fake()->name(),
            'sunrise' => Carbon::now()->subYears(rand(10, 90)),
            'sunset' => Carbon::now()->subDays(rand(10, 90)),
            'burial_date' => Carbon::now()->addDays(rand(1, 10)),
            'poster' => 'death-posters/' . rand(1, 5) . '.jpg',
            'announcement' => fake()->catchPhrase(),
            'likes' => rand(1, 10),
        ];
    }
}
