<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids; // 'HasUuids' foi utilizado pois uso na migration

    // campos que podem ser alterados
    protected $fillable = [
        'name',
        'amount',
        'price',
        'img',
        'category_id',
        'description',
    ];

    // ligação entre a chave estrangeira da tabela Produtcs para a chave id da tabela categoria
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
