<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class WeddingAnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
		$user = User::all()->random();

        return [
			"user_id" => $user->id,
            'poster' => 'wedding-announcement-posters/'. rand(1, 5) . '.jpg',
            "title" => fake()->firstName() . " & " . fake()->firstName(),
            "venue" => fake()->address(),
            "date" => Carbon::now()->addDays(rand(10, 20)),
            "description" => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
        ];
    }
}
