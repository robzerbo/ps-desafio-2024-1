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

        $category = Category::factory(4)->create();

        Product::factory(3)->create([
            'category_id' => $category[0]->id,
        ]);

        Product::factory(4)->create([
            'category_id' => $category[1]->id,
        ]);

        Product::factory(5)->create([
            'category_id' => $category[2]->id,
        ]);

        Product::factory(6)->create([
            'category_id' => $category[3]->id,
        ]);
    }
}
