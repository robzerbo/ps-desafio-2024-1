<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'price' => $this->faker->randomFloat(0, 1000),
            'amount' => $this->faker->numberBetween(0, 1000),
            'description' => $this->faker->text(200),
            // 'img' => $this->faker->imageUrl(100, 100, 'cats'),
            // 'categoria_id' => Categoria::factory()??
        ];
    }
}
