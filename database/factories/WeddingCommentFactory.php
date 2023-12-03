<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WeddingComment>
 */
class WeddingCommentFactory extends Factory
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
			'text' => fake()->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
			'likes' => rand(1, 10)
        ];
    }
}
