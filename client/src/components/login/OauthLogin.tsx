/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
// import emosaacLogo from "../../assets/emosaac_logo.png";
// import kakao from "../../assets/social_kakao.png";
import naver from "../../assets/social_naver.png";
import OauthLoginButton from "../UI/OauthLogin/OauthLoginButton";
export default function OauthLogin() {
  const onClickKakao = () => {
    window.location.href = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
  };
  const onClickNaver = () => {
    window.location.href = process.env.NEXT_PUBLIC_NAVER_AUTH_URL;
  };
  return (
    <>
      <main css={topWrapperCSS}>
        <section>
          <img
            css={imageWrapperCSS}
            src={"/assets/emosaac_logo.png"}
            alt="이모작의 로고입니다."
          />
        </section>
        <section>
          <div css={buttonWrapperCSS}>
            <div css={eachButtonCSS}>
              <OauthLoginButton
                src={"/assets/social_kakao.png"}
                alt={"카카오 로그인"}
                text={"카카오로 로그인"}
                backgroundColor="#FEE502"
                color="#000"
                onClick={onClickKakao}
              />
            </div>
            <div>
              <OauthLoginButton
                src={"/assets/social_naver.png"}
                alt={"네이버 로그인"}
                text={"네이버로 로그인"}
                backgroundColor="#24CD0B"
                color="#FFF"
                onClick={onClickNaver}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
const topWrapperCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const imageWrapperCSS = css`
  width: 70%;
  height: 70%;
  /* 범위 안에서 안 짤리게 */
  /* cover는 짤리더라도 꽉 채우게 */
  object-fit: contain;
  margin-right: 30vh;
`;

const buttonWrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const eachButtonCSS = css`
  margin-bottom: 50px;
`;
