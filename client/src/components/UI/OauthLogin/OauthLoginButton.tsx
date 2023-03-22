/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";

interface OauthLoginButtonProps {
  text: string;
  src: any;
  alt: string;
  backgroundColor: string;
  color: string;
}

export default function OauthLoginButton({
  text,
  src,
  alt,
  backgroundColor,
  color,
}: OauthLoginButtonProps) {
  return (
    <>
      <button
        type="button"
        style={{ backgroundColor, color }}
        css={oauthButtonCSS}
      >
        <div css={imageWrapCSS}>
          <img src={src} alt={alt} css={socialLogoCSS} />
        </div>
        <div css={textWrapCSS}>{text}</div>
      </button>
    </>
  );
}
const oauthButtonCSS = css`
  cursor: pointer;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 300px;
  height: 50px;
  position: relative;
  padding: 0px;
  border: none;
  border-radius: 5px;
`;
const imageWrapCSS = css`
  width: 80px;
  display: flex;
  justify-content: center;
`;

const socialLogoCSS = css`
  object-fit: contain;
  height: 100%;
`;

const textWrapCSS = css`
  /* width: calc(100% - 80px); */
  margin-left: 45px;
`;
