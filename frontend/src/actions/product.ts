'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

// funciona da mesma forma que a categoria

export async function createProduct(form: FormData) {
  try {
    await api.post('/products', form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/products')
}

export async function updateProduct(form: FormData) {
  try {
    await api.post(`/products/${form.get('id')}`, form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/products')
}

export async function destroyProduct(id: string) {
  await api.delete(`/products/${id}`)
  revalidatePath('/admin/products')
}
