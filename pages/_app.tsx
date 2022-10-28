import { Fragment } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const NonSSRWrapper = (props: { children: any }) => (
  <Fragment>{props.children}</Fragment>
)
const Wrapper = dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false
})

export default function App({ Component, pageProps }: AppProps) {
  return <Wrapper><Component {...pageProps} /></Wrapper>
}
