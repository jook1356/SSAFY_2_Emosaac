/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="overlay-root" className="overlay-root" css={overlayCSS} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const overlayCSS = css`
  z-index: 999999;
  position: fixed;
`;
