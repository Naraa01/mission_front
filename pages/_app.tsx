import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
// import { Provider as ReduxProvider } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { CommonProvider } from '../context/CommonContext'
// import { CommonProvider } from '../context/CommonContext'
// import { store } from '../redux/store'
// import { Widget } from '../components/Widget'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const router = useRouter()

  return (
    <>
      <CommonProvider>{getLayout(<Component {...pageProps} />)}</CommonProvider>
    </>
  )
  // return (
  //   <ReduxProvider store={store}>
  //     {!router?.pathname?.includes('webview') && <Widget />}
  //     <CommonProvider>{getLayout(<Component {...pageProps} />)}</CommonProvider>
  //   </ReduxProvider>
  // )
}
