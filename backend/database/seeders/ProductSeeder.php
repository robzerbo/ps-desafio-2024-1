<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //chamando a factory de produto
        Product::factory(3)->create();

        $category = Category::factory(1)->create();

        Product::factory(3)->create([
            'category_id' => $category[0]->id,
        ]);
    }
}
