import { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { api } from '@/services/api'
import { authType } from '@/types/auth'

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const user: authType | null = await api.post(
            '/login',
            JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          return user
        } catch (e) {
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig
