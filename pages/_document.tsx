import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Closele</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="theme-color" content="#242424" />
        <meta name="description" content="Wordle - but better :D" />
        <meta name="author" content="Alon" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
