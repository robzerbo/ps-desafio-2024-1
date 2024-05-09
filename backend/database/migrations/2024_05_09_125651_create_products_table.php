<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary(); // especificando que é a chave primária
            $table->string('name', 100);
            $table->integer('amount')->default(0); // valor padrão é 0 caso não seja informado.
            $table->double('price');
            $table->string('image');
            // foreignUlid() é a referencia para a tabela categories para usar o id dela
            $table->foreignUuid('category_id')->references('id')->on('categories');
            $table->text('description'); // campo nao obrigatório
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
