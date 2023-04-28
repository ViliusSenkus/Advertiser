<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Advertise>
 */
class AdvertiseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->sentence(10, 20),
            'price' => rand(0, 1000).".".rand(0, 99),
            'photo'	=> fake()->sentence(1),
            'city' => fake()->name()
        ];
    }
}
