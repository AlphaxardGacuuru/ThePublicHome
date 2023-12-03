<?php

namespace Database\Factories;

use App\Models\User;
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
		$location = ["home", "international"];
		
        return [
			'user_id' => User::all()->random()->id,
            'name' => fake()->name(),
            'poster' => 'death-posters/'. rand(1, 5) . '.jpg',
            'announcement' => fake()->catchPhrase(),
            'locale' =>$location[rand(0, 1)],
			'likes' => rand(1, 10)
        ];
    }
}
