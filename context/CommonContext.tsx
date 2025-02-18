import React, { createContext, useContext, useEffect, useState } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { UserResponse } from '../models/UserResponse'
import { restClient } from '../lib/httpClient'

interface CommonContextProps {
  user?: UserResponse | null | undefined
  setUser?: (userId: UserResponse | null | undefined) => void
  refetchUser?: () => void
}

const DEFUAL_LOCALE = 'mn'

const CommonContext = createContext<CommonContextProps>({})

const { Provider } = CommonContext

export const useCommonContext = (): CommonContextProps => useContext(CommonContext)

export const CommonProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null | undefined>()

  const router = useRouter()

  const onProtected = async () => {
    restClient
      .getSession()
      .then((data: any) => {
        console.info('🚀 ~ .then ~ data:', data)
        setUser(data)
      })
      .catch((error: any) => {
        // console.error('🚀 ~ onProtected ~ error:', error)
      })
  }

  useEffect(() => {
    if (!user) {
      onProtected()
    }
  }, [])

  return (
    <Provider
      value={{
        user,
        setUser,
        refetchUser: onProtected,
      }}
    >
      {children}
    </Provider>
  )
}
