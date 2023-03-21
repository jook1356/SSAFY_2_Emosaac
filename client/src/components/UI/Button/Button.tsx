/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ButtonProps {
  text: string;
  onClick: any;
  width: string;
  height: string;
  children: any;
}

export default function Button({ onClick, width, height, children }: ButtonProps) {
  return (
    <>
      <button css={buttonCSS({width, height})} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

interface buttonCSSProps {
  width: string;
  height: string;
}

const buttonCSS = ({width, height}: buttonCSSProps) => {
  return css`
    cursor: pointer;
    width: ${width};
    height: ${height};
    border: none;
    border-radius: 5px;
    font-size: 18px;
    padding: 0 20px;
    background-color: var(--main-color);
    color: black;
  `;
}