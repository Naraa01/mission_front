import React, { createContext, useContext, useEffect, useState } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { UserResponse } from '../models/UserResponse'
import { restClient } from '../lib/httpClient'

interface CommonContextProps {
  // theme?: string
  user?: UserResponse | null | undefined
  // setTheme?: (theme: string) => void
  // locale?: string
  // setLocale?: (locale: string) => void
  setUser?: (userId: UserResponse | null | undefined) => void
  refetchUser?: () => void
  // t?: typeof en
  // locales?: string[]
  // bot?: BotI
  // folderId?: string
  // setfolderId?: (folderId: string) => void
  // menuChildrens?: MenuI[]
  // setMenuChildrens?: (value: MenuI[]) => void
  // persistFolderId?: string
  // setPersistFolderId?: (persistFolderId: string) => void
  // melonToken?: string | null | undefined
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
        refetchUser: onProtected
      }}
    >
      {children}
      {/* {clientLoaded && <div className={`${theme} theme-changer`}>{children}</div>} */}
    </Provider>
  )
}
