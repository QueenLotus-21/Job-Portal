<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class postFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' =>$this->faker()->unique()->sentence(),
            'gender' =>$this->faker()->realText($maxNbChars=5),
            'person' =>$this->faker()->numberBetween(1,100),
            'skill' => $this->faker()->text(),
            'role' =>$this->faker()->text(),
            'workhour' =>$this->faker()->text(),
            'status' =>$this->faker()->text(),
            'name' =>fake()->name(),
            'description' =>$this->faker()->text(),
            'responsibility' => $this->faker()->text(),
            'location' =>$this->faker()->text(),
            'contact_info ' =>$this->faker()->text(),
            'user_id'=>1

        ];
    }
}
