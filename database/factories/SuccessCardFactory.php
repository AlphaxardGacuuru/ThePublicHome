<?php

namespace Database\Factories;

use App\Models\Membership;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SuccessCardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $membership = Membership::where("name", "success_card")
            ->get()
            ->random();

        $location = ["home", "international"];

        return [
			'user_id' => User::all()->random()->id,
            'membership_id' => $membership->id,
            'locale' => $location[rand(0, 1)],
            'title' => 'Success to ' . fake()->firstName(),
            'poster' => 'success-card-posters/' . rand(1, 5) . '.jpg',
            'announcement' => fake()->catchPhrase(),
			'likes' => rand(1, 10)
        ];
    }
}
