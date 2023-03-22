/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";

export const BasicButton = () => {
  const router = useRouter();
  function onClickLogin() {
    router.push({
      pathname: `/login`,
    });
  }
  return (
    <button id="basic-button" css={ButtonWrapCSS} onClick={onClickLogin}>
      로그인
    </button>
  );
};

const ButtonWrapCSS = css`
  cursor: pointer;
  height: 36px;
  border: 1px solid var(--border-color-2);
  border-radius: 5px;
  background-color: var(--back-color);
  color: var(--text-color-2);
`;
