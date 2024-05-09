<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Product extends Model
{
    use HasFactory, HasUuids; // 'HasUuids' foi utilizado pois uso na migration

    // campos que podem ser alterados
    protected $fillable = [
        'name',
        'amount',
        'price',
        'image',
        'category_id',
        'description',
    ];

    // ligação entre a chave estrangeira da tabela Produtcs para a chave id da tabela categoria
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    //função para deletar as imagens quando um player for apagado
    protected static function booted()
    {
        self::deleted(function (Product $product) {
            try {
                $image_name = explode('products/', $product['image']);
                Storage::disk('public')->delete('products/'.$image_name[1]);
            } catch (Throwable) {
            }
        });
    }
}
