<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|min:1|max:100',
            'amount' => 'sometimes|min:1|max:100000',
            'price' => 'sometimes|min:1|max:1000000',
            'image' => 'sometimes',
            'category_id' => 'sometimes',
            'description' => 'sometimes',
        ];
    }
}
