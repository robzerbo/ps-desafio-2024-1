<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    // definindo uma variável pra usar ela nos métodos
    private Category $category;

    public function __construct(Category $category)
    {
        //'$this->category' representa a variável que foi criada ali em cima
        //'$category' representa a variável passada pelo parâmetro do contructor
        $this->category = $category;
    }

    // função para visualizar os dados de todas as categorias
    public function index(): JsonResponse // tipo de resposta
    {
        $category = $this->category->all(); // pega todos os dados do atributo do tipo 'Category'

        return response()->json($category, Response::HTTP_OK); // envia um objeto do tipo json para o frontend
    }

    //mostra uma categoria em específico
    public function show(string $id): JsonResponse
    {
        $category = $this->category->findOrFail($id); //usa a função findOrFail para procurar a categoria

        return response()->json($category, Response::HTTP_OK);
    }

    // função para armazenar os dados no banco de dados
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $data = $request->validated(); // função para validar os dados
        $category = $this->category->create($data); // cria no banco de dados um campo com os valores da variável data

        return response()->json($category, Response::HTTP_CREATED); // retorna uma resposta para indicar a conclusão da operação
    }

    public function update(UpdateCategoryRequest $request, string $id): JsonResponse
    {
        $data = $request->validated(); // valida o request
        $category = $this->category->findOrFail($id); // porcura a categoria e atribui a variavel '$category'
        $category->update($data); // altera a categoria encontrada

        return response()->json($category, Response::HTTP_OK); // retorna uma resposta para indicar a conclusão da operação

    }

    public function destroy(string $id): JsonResponse
    {
        $category = $this->category->findOrFail($id); // porcura a categoria e atribui a variavel '$category'
        $category->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
