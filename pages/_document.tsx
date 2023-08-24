import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <div className="bg-default">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
