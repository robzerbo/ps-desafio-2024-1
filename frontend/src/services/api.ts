import { auth } from '@/auth'
import { isServerSide } from '@/lib/is-server-side'
import axios from 'axios'
import { getSession } from 'next-auth/react'

function firstItemToObject(
  obj: Record<string, string[]>,
): Record<string, string> {
  const newObj: Record<string, string> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key][0]
    }
  }
  return newObj
}

export type ResponseErrorType = {
  message: string
  status: number
  errors: {
    [key: string]: string
  }
}

export class ResponseError extends Error implements ResponseErrorType {
  errors: {
    [key: string]: string
  }

  status: number

  constructor(
    message: string,
    errors: {
      [key: string]: string
    },
    status: number,
  ) {
    super(message)
    this.errors = errors
    this.status = status
  }
}

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
})

api.interceptors.request.use(async (config) => {
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

api.interceptors.response.use(
  (response) => response.data,
  async ({ response }) => {
    if (response.status === 422) {
      const errors = firstItemToObject(response.data.errors)

      throw new ResponseError(response.data.message, errors, response.status)
    }

    throw new Error(response.data.message)
  },
)
