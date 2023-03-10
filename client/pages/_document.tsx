import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        {/* 구글 폰트 적용 예제 */}
        <link href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Semi+Condensed&display=swap" rel="stylesheet"/>


      </Head>


      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
