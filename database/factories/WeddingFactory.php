<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class WeddingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
			'user_id' => User::all()->random()->id,
            'title' => fake()->firstName() . ' weds ' . fake()->firstName(),
            'poster' => 'wedding-posters/'. rand(1, 5) . '.jpg',
            'announcement' => fake()->catchPhrase(),
            'venue' => fake()->address(),
            'wedding_date' => Carbon::now()->addDays(rand(1, 10)),
			'likes' => rand(1, 10)
        ];
    }
}
