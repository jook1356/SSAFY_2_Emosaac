/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import SmallWideButton from "../UI/Button/SmallWideButton";
import Image from "next/image";
// import thumbnail from "../../assets/thumbnail.png";
export default function Survey() {
  const onClickNextButton = () => {
    console.log("버튼");
  };
  return (
    <>
      <section css={infoCSS}>
        <div>
          <h2>선호하는 웹툰을 선택하세요</h2>
          <div>선택하신 웹툰을 기반으로 웹툰을 추천해드려요</div>
        </div>
        <div>
          <SmallWideButton text={"다음"} onClick={onClickNextButton} />
        </div>
      </section>
      <section>
        <div css={surveygridCSS}>
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
          <img src={"/assets/thumbnail.png"} alt="설문조사용 웹툰 썸네일입니다" />
        </div>
      </section>
    </>
  );
}
const infoCSS = css`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start; /* 이미지와 맞추기 위해 추가 */
`;

const surveygridCSS = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 30px 105px;
  justify-content: center;
  & > img {
    width: 100%;
    height: 80%;
  }
`;
