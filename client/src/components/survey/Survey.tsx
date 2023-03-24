/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import SmallWideButton from "../UI/Button/SmallWideButton";
import getSurveyListByTypeCode from "@/api/survey/getSurveyListByTypeCode";
import { returnSurveyArrayType } from "@/types/survey";
// import thumbnail from "../../assets/thumbnail.png";
import { useState } from "react";
import Thumbnail from "./Thumbnail";
import postSurvey from "./../../api/survey/postSurveyList";
import { useRouter } from "next/router";

const Survey = () => {
  const router = useRouter();
  const [typeCode, setTypeCode] = useState(0);
  const [webtoonList, setWebtoonList] = useState<returnSurveyArrayType[]>([]);
  const [selectedWebtoons, setSelectedWebtoons] = useState<Set<number>>(
    new Set()
  );
  const [selectedNovels, setSelectedNovels] = useState<Set<number>>(new Set());

  // const checkwebtoon;
  const onClickNextButton = () => {
    setTypeCode(1);
    console.log("선택됨");
  };
  const onClickPrevButton = () => {
    setTypeCode(0);
  };
  const onClickSubmitButton = () => {
    // console.log("하하하하하");
    // alert("제출됨");
    console.log(Array.from(selectedWebtoons), Array.from(selectedNovels));
    postSurvey({
      webtoonIds: Array.from(selectedWebtoons),
      novelIds: Array.from(selectedNovels),
    }).catch((error) => {
      console.log(error);
    });
    alert("제출되었습니다!");
    router.push("/");
  };
  useEffect(() => {
    getSurveyListByTypeCode(typeCode).then(
      (res: returnSurveyArrayType[] | null) => {
        const data = res;
        // console.log(data);
        if (data !== null) {
          setWebtoonList(data);
        }
      }
    );
  }, [typeCode]);

  // 선택된 값을 넣는 함수
  const toggleSelectedItem = (itemId: number, type: "webtoon" | "novel") => {
    const setSelected =
      type === "webtoon" ? setSelectedWebtoons : setSelectedNovels;
    setSelected((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        if (newSelectedItems.size >= 5) {
          alert("5개만 선택해주세요!");
          return prevSelectedItems;
        }
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

  return (
    <>
      <section css={infoCSS}>
        <div>
          {typeCode === 0 && <h1>선호하는 웹툰을 5개 선택해주세요</h1>}
          {typeCode === 1 && <h1>선호하는 웹소설을 5개 선택해주세요</h1>}
          <div style={{ marginTop: "10px" }}>
            이모작의 추천방식에 깜짝 놀라실걸요?
          </div>
        </div>
        <div>
          <div>
            {typeCode === 0 ? (
              <SmallWideButton text={"다음"} onClick={onClickNextButton} />
            ) : (
              <div css={buttongridCSS}>
                <div>
                  <SmallWideButton text={"이전"} onClick={onClickPrevButton} />
                </div>
                <div css={submitbuttonCSS}>
                  <SmallWideButton
                    text={"제출"}
                    onClick={onClickSubmitButton}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section css={surveygridCSS}>
        {webtoonList.map((webtoon) => (
          <div key={webtoon.bookId}>
            <Thumbnail
              src={webtoon.thumbnail}
              alt="설문조사용 웹툰/웹소설 썸네일"
              isSelected={(typeCode === 0
                ? selectedWebtoons
                : selectedNovels
              ).has(webtoon.bookId)}
              onClick={() =>
                toggleSelectedItem(
                  webtoon.bookId,
                  typeCode === 0 ? "webtoon" : "novel"
                )
              }
            />
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

const buttongridCSS = css`
  display: flex;
`;

const submitbuttonCSS = css`
  margin-left: 20px;
`;
export default Survey;
