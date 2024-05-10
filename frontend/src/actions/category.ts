'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

// as funções são "async" pois não acionam junto da página

// 'form: FormData' são os dados do furmulário que vai ser passado para o backend
export async function createCategory(form: FormData) {
  try {
    // ele vai tentar enviar uma requisição POST com com os dados do formulário
    // o 'api' simplifica o caminho até antes do '/categories'
    // o 'await' indicar que ele vai esperar a função assíncrona fazer o POST dos dados para então fazer o revalidatePath
    await api.post('/categories', form)
  } catch (e) {
    // caso não consiga, vai retornar o erro
    return JSON.stringify(e)
  }
  // após isso, revalida o path
  revalidatePath('/admin/categories')
}

export async function updateCategory(form: FormData) {
  try {
    // neste caso ele vai enviar o id junto para alterar um produto em específico
    await api.post(`/categories/${form.get('id')}`, form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/categories')
}

export async function destroyCategory(id: string) {
  // se ele encontrar a categoria, vai deletar, se não, faz nada
  await api.delete(`/categories/${id}`)
  revalidatePath('/admin/categories')
}
