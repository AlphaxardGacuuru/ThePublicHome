<?php

namespace Database\Factories;

use App\Models\Membership;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserMembership>
 */
class UserMembershipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
		$user = User::all()->random();
		
		$membership = Membership::all()->random();

        return [
            "user_id" => $user->id,
			"membership_id" => $membership->id
        ];
    }
}
