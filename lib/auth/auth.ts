import useSWR from 'swr'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import httpClient, { restClient } from '../httpClient'
import { UserResponse } from '../../models/UserResponse'
import { LoginRequest } from '../../models/backend'
import { HttpErrorResponse } from '../../models/HttpErrorResponse'

interface AuthProps {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
}

export const useAuthGuard = ({ middleware, redirectIfAuthenticated }: AuthProps) => {
  const router = useRouter()

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/api/auth/me', () => httpClient.get<UserResponse>('/api/auth/me').then((res) => res.data))

  const login = async ({
    onError,
    props,
  }: {
    onError: (errors: HttpErrorResponse | undefined) => void
    props: LoginRequest
  }) => {
    onError(undefined)
    await csrf()
    restClient
      .login(props)
      .then(() => mutate())
      .catch((err) => {
        const errors = err.response.data as HttpErrorResponse
        onError(errors)
      })
  }

  const csrf = async () => {
    await restClient.csrf()
  }

  const logout = async () => {
    if (!error) {
      await restClient.logout().then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }

    if (middleware === 'auth' && error) {
      logout()
    }
  }, [user, error])

  return {
    user,
    login,
    logout,
    mutate,
  }
}
