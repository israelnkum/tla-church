<?php

namespace Database\Factories;

use App\Enums\AccountRecordType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountRecord>
 */
class AccountRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $type = $this->faker->randomElement(AccountRecordType::cases());

        return [
            'account_id' => 1,
            'type' => $type->value,
            'amount' => $this->faker->numberBetween(50, 5000),
            'comments' => $this->faker->realTextBetween(10, 50),
            'member_id' => null,
            'user_id' => 1,
        ];
    }
}
