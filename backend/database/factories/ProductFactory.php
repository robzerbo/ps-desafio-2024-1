<?php

namespace Database\Factories;

use App\Models\Category;
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
            'price' => $this->faker->randomFloat(3, 0, 1000),
            'amount' => $this->faker->numberBetween(0, 1000),
            'image' => $this->faker->imageUrl(100, 100, 'cats'),
            'category_id' => fn () => Category::factory()->create()->id,
            'description' => $this->faker->text(200),
        ];
    }
}
