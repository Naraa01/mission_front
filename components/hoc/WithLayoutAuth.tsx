import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useQueryState } from 'next-usequerystate'
import { NextPageWithLayout } from '../../pages/_app'
import AppLayout from '../layouts/AppLayout'
import { useAuthGuard } from '../../lib/auth/auth'
// import { useLazyProtectedQuery } from '../../redux/services/auth'
// import { setCredentials } from '../../redux/slices/auth'
// import AppLayout from '../layouts/AppLayout'
// import { SocketProvider } from '../../context/SocketContext'
// import { UserI } from '../../types/common'
// import { useCookie } from '../hooks/UseCookie'

const LOGIN_PATH = '/login'

const withLayoutAuth =
  (layoutIncludeStyle = 'mx-8 md:mx-14 bg-red-300 xl:mx-24 my-6 xl:my-8') =>
  (Component: NextPageWithLayout) => {
    const Auth = ({ ...props }) => {
      const router = useRouter()
      const [auth, setAuth] = useState<string | null | number>()
      const { user } = useAuthGuard({ middleware: 'guest', redirectIfAuthenticated: '/' })
      console.log("🚀 ~ Auth ~ user:", user)

      // const [getProtected] = useLazyProtectedQuery()

      // const [token, setToken] = useQueryState('token')
      // const dispatch = useDispatch()
      // const [, setUser] = useCookie<UserI | null | undefined>('user')

      const getAuth = async () => {
        // TODO: Login hiisnii daraa neeh
        // router.push(LOGIN_PATH)
        try {
          // if (token) {
          //   dispatch(setCredentials({ token: token as string }))
          //   setToken('')
          // }

          if (!user) {
            router.push(LOGIN_PATH)
          }
          // setUser({ id: userId as number })
          // // dispatch(setCredentials({ user: { id: userId as number } }))
          // setAuth(userId)
        } catch (error) {
          router.push(LOGIN_PATH)
        }
      }

      useEffect(() => {
        // check user is valid
        getAuth()
      }, [])

      // TODO: Login hiisnii daraa neeh
      return <Component {...props} />
      // return auth ? <Component {...props} /> : <>No Page</>
    }
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps
    }

    if (layoutIncludeStyle) {
      Auth.getLayout = function getLayout(page: ReactElement) {
        return (
          <AppLayout>
            <div className={`${layoutIncludeStyle}`}>{page}</div>
          </AppLayout>
        )
        // return (
        //   <SocketProvider>
        //     <AppLayout>
        //       <div className={`${layoutIncludeStyle}`}>{page}</div>
        //     </AppLayout>
        //   </SocketProvider>
        // )
      }
    }

    return Auth
  }

export default withLayoutAuth
