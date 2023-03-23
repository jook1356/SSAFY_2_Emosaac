/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import SmallWideButton from "../UI/Button/SmallWideButton";
import Image from "next/image";
import getSurveyListByTypeCode from "@/api/survey/survey";
import { returnSurveyArrayType } from "@/types/survey";
// import thumbnail from "../../assets/thumbnail.png";
import { useState } from "react";

const Survey = () => {
  const [typeCode, setTypeCode] = useState(0);

  const [webtoonList, setWebtoonList] = useState<returnSurveyArrayType[]>([]);
  const onClickNextButton = () => {
    setTypeCode(1);
  };
  useEffect(() => {
    getSurveyListByTypeCode(typeCode).then(
      (res: returnSurveyArrayType[] | null) => {
        const data = res;
        console.log(data);
        if (data !== null) {
          setWebtoonList(data);
        }
      }
    );
  }, [typeCode]);
  return (
    <>
      <section css={infoCSS}>
        <div>
          <h1>선호하는 웹툰을 선택하세요</h1>
          <div style={{ marginTop: "10px" }}>
            이모작의 추천방식에 깜짝 놀라실걸요?
          </div>
        </div>
        <div>
          <SmallWideButton text={"다음"} onClick={onClickNextButton} />
        </div>
      </section>
      <section css={surveygridCSS}>
        {webtoonList.map((webtoon) => (
          <div key={webtoon.bookId}>
            <img src={webtoon.thumbnail} alt="설문조사용 웹툰 썸네일" />
          </div>
        ))}
      </section>
    </>
  );
};
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
  grid-gap: 10px;
  justify-content: center;
  & > div {
    width: 100%;
    height: 100%;
  }
  & > div > img {
    width: 100%;
    height: 100%;
  }
`;
export default Survey;
