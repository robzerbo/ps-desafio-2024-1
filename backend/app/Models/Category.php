<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasUuids; // 'HasUuids' foi utilizado pois uso na migration

    // campos que podem ser alterados
    protected $fillable = [
        'name',
    ];

    // ligação entre a chave estrangeira da tabela Produtcs para a chave id da tabela categoria
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
