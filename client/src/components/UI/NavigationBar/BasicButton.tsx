/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";

export const BasicButton = () => {
  return (
    <button id="basic-button" css={ButtonWrapCSS}>
      로그인
    </button>
  );
};

const ButtonWrapCSS = css`
  cursor: pointer;
  height: 45px;
  border: 1px solid var(--border-color-2);
  border-radius: 5px;
  background-color: var(--back-color);
  color: var(--text-color-2);
`;
