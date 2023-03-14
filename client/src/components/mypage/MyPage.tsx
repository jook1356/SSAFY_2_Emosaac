/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import profile from "../../assets/profileexample.jpg";
import thumbnail from "../../assets/thumbnail.png";
import Image from "next/image";
import MiddleWideButton from "../UI/Button/MiddleWidebutton";
import { useState } from "react";
import Chart from "./Chart";
// import Image from "next/image";

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  function onClickOpenModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <section css={userinfoCSS}>
        <div css={profileimagewrapperCSS}>
          <Image src={profile} alt="프로필 이미지" css={profileimageCSS} />
        </div>
        <div>
          <h2 css={nicknameCSS}>밥먹고올게</h2>
          <h3>notify9637@naver.com</h3>
          <div css={buttonCSS}>
            <MiddleWideButton
              text={"회원 정보 수정"}
              onClick={onClickOpenModal}
            />
          </div>
        </div>
      </section>
      <section css={chartwrapperCSS}>
        <article css={chartCSS}>
          <Chart />
        </article>
        <article css={recommendCSS}>
          <div>
            <div>가장 많이 본 장르의 작품을 추천해줄게요</div>
            <div css={imagewrapperCSS}>
              <Image css={imageCSS} src={thumbnail} alt="많이 본 장르 썸네일" />
            </div>
          </div>
          <div>
            <div>가장 적게 본 장르의 작품을 추천해줄게요</div>
            <div css={imagewrapperCSS}>
              <Image css={imageCSS} src={thumbnail} alt="적게 본 장르 썸네일" />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
const userinfoCSS = css`
  display: flex;
  margin-left: 105px;
`;
const profileimagewrapperCSS = css`
  border-radius: 100%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin-right: 40px;
`;

const profileimageCSS = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const nicknameCSS = css`
  margin-bottom: 10px;
`;

const buttonCSS = css`
  margin-top: 40px;
`;

const chartwrapperCSS = css`
  display: grid;
  grid-template-columns: 500px 1fr;
  column-gap: 50px;
`;

const chartCSS = css`
  height: 350px;
  margin-top: 80px;
  margin-left: 60px;
`;
const recommendCSS = css`
  margin-top: 80px;
  display: flex;
  & > div {
    margin-right: 105px;
    /* line-height: 200px; */
  }
`;
const imagewrapperCSS = css`
  width: 150px;
  height: 200px;
  margin-top: 20px;
  overflow: hidden;
`;
const imageCSS = css`
  height: calc(100% - 16px);
  width: 100%;
  object-fit: contain;
`;
// line-height
