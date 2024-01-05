<?php

namespace Database\Factories;

use App\Models\MemberClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $class = MemberClass::query()->inRandomOrder()->first();
        $gender = $this->faker->randomElement(['Male', 'Female']);
        $status = $this->faker->randomElement(['active', 'invalid', 'deceased']);

        return [
            'first_name' => $this->faker->firstName($gender),
            'last_name' => $this->faker->lastName(),
            'gender' => $gender,
            'home_town' => $this->faker->city,
            'ghana_card_number' => 'GHA-' . $this->faker->iban,
            'address' => $this->faker->address,
            'phone_number' => $this->faker->phoneNumber,
            'alt_phone_number' => $this->faker->phoneNumber,
            'class_leader' => null,
            'member_class_id' => $class?->id,
            'status' => $status,
            'email' => $this->faker->email,
            'user_id' => 1
        ];
    }
}
