<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class ProductController extends Controller
{
    private Product $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    public function index(): JsonResponse
    {
        //pega todos os produtos e mostra
        $product = $this->product->with('category')->get();

        return response()->json($product, Response::HTTP_OK);
    }

    public function show(string $id): JsonResponse
    {
        $product = $this->product->with('category')->findOrFail($id); // pega um produto em específico

        return response()->json($product, Response::HTTP_OK);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $data = $request->validated(); // valida o request de store
        // se tiver uma imagem, deve-se salvar ela no diretório public/storage/<nome>
        // será salvo uma url
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $product = $this->product->create($data); // adiciona o novo produto no banco de dados
        // para retornar a resposta, é feito uma procura do produto em específico
        $id = $product->id;
        $product_category = $product->with('category')->findOrFail($id);

        return response()->json($product_category, Response::HTTP_CREATED);
    }

    public function update(UpdateProductRequest $request, string $id): JsonResponse
    {
        $data = $request->validated(); // valida o request de store
        $product = $this->product->findOrFail($id); // pega um produto em específico

        if ($request->hasFile('image')) {
            try { // vai tentar apagar a imagem atual que está guardada
                $image_name = explode('product/', $product->image);
                Storage::disk('public')->delete('products/'.$image_name[1]);
            } catch (Throwable) {
            } finally { // salva a nova imagem
                $path = $request->file('image')->store('products/', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $product->update($data); // altera algum campo do produto
        $product_category = $product->with('category')->findOrFail($id);

        return response()->json($product_category, Response::HTTP_OK);
    }

    public function destroy(string $id): JsonResponse
    {
        $product = $this->product->findOrFail($id); // pega um produto em específico
        $product->delete(); // deleta o produto

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    // criar um Request??
    public function updateAmount(string $id)
    {
        $product = $this->product->findOrFail($id);
        $product->update(['amount' => $product->amount - 1]);

        return response()->json($product, Response::HTTP_OK);
    }
}
