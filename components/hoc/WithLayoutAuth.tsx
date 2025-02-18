import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../../pages/_app'
import AppLayout from '../layouts/AppLayout'
import { useAuthGuard } from '../../lib/auth/auth'

const LOGIN_PATH = '/login'

const withLayoutAuth =
  (layoutIncludeStyle = 'mx-8 md:mx-14 xl:mx-24 my-6 xl:my-8') =>
  (Component: NextPageWithLayout) => {
    const Auth = ({ ...props }) => {
      const router = useRouter()
      const [auth, setAuth] = useState<string | null | number>()
      const { user } = useAuthGuard({ middleware: 'guest' })

      const getAuth = async () => {
        try {
          if (!user) {
            // console.log('🚀 ~ getAuth ~ 1111:')
            router.push(LOGIN_PATH)
          }
        } catch (error) {
          // console.info('🚀 ~ getAuth ~ 2222:')
          router.push(LOGIN_PATH)
        }
      }

      useEffect(() => {
        getAuth()
      }, [])

      return <Component {...props} />
      // return auth ? <Component {...props} /> : <>No Page</>
    }

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
      }
    }

    return Auth
  }

export default withLayoutAuth
