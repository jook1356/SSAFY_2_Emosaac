import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
import mainStore from '@/jotai/atom'

import Layout from '@/components/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={mainStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
