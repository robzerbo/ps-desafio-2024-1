'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createUser(form: FormData) {
  try {
    await api.post('/users', form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/usuarios')
}

export async function updateUser(form: FormData) {
  try {
    await api.post(`/users/${form.get('id')}`, form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/usuarios')
}

export async function destroyUser(id: string) {
  await api.delete(`/users/${id}`)
  revalidatePath('/admin/usuarios')
}
