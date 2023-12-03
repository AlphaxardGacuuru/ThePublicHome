<?php

namespace Database\Factories;

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
        return [
            'user_id' => User::all()->random()->id,
            'title' => 'Success to ' . fake()->firstName(),
            'poster' => 'success-card-posters/' . rand(1, 5) . '.jpg',
            'announcement' => fake()->catchPhrase(),
			'likes' => rand(1, 10)
        ];
    }
}
