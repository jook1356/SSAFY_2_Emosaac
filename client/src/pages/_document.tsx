/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="overlay-root" css={overlayCSS}/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

const overlayCSS = css`
  z-index: 9999;
  position: fixed;
`
