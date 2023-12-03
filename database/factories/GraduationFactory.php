<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class GraduationFactory extends Factory
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
            'title' => fake()->firstName() . ' Graduates',
            'poster' => 'graduation-posters/' . rand(1, 5) . '.jpg',
            'announcement' => fake()->catchPhrase(),
            'venue' => fake()->address(),
            'graduation_date' => Carbon::now()->addDays(rand(1, 10)),
            'likes' => rand(1, 10),
        ];
    }
}
