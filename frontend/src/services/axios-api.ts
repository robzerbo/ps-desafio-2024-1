import { auth } from '@/auth'
import { isServerSide } from '@/lib/is-server-side'
import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'

export const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
})

axiosApi.interceptors.request.use(async (config) => {
  let token = null
  if (isServerSide()) {
    const session = await auth()
    token = session?.user.token
  } else {
    const session = await getSession()
    token = session?.user.token
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosApi.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const { response } = error

    if (response?.status === 401 || response?.status === 403) {
      //
    }
    throw error
  },
)
