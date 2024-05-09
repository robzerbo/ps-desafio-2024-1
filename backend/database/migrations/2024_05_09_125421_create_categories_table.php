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
        // Criando a tabela 'categories'
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary(); // especificando que é a chave primária
            $table->string('name', 50)->unique(); // especificando que o name da categoria não pode ser repetido
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
