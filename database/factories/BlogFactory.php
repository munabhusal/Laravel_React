<?php

namespace Database\Factories;

use App\Models\Catagory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence();

        return [
            'title' => $title,
            'slug' =>str_replace(' ', '', Str::lower($title)),
            'body' => fake()->sentence(9),
            'status' => fake()->numberBetween(0,1),
            'image' => Str::random(10),
            'catagory_id' => $this->faker->randomElement(Catagory::pluck('id')),
            'user_id' => $this->faker->randomElement(User::pluck('id')),        ];
    }
}