/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import BookCard from "@/components/UI/BookCard/BookCard";

interface HighlightedCarousel {
  bookData: object[];
}

const HighlightedCarousel = ({ bookData }: HighlightedCarousel) => {
  const [bookDataList, setBookDataList] = useState<any[]>([...bookData]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const dummyNormalRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<any>([]);
  // const dummyHighlightedRef = useRef<HTMLInputElement>(null);

  const cardLayout = {
    widthValue: 13,
    heightValue: 19,
    highlightedWidthValue: 20,
    highlightedHeightValue: 25,
    spaceValue: 5,
    unit: "vw",

    // min 관련 값들의 단위는 px
    minWidthValue: 150,
    minHeightValue: 225,
    minHighlightedWidthValue: 210,
    minHighlightedHeightValue: 280,
    minSpaceValue: 24,
  };

  useEffect(() => {
    const temp = bookDataList.concat(bookDataList.slice(0, 5));

    setBookDataList(() => temp);
    console.log(bookDataList);
    console.log(temp);
  }, []);

  const prevBtnHandler = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      setCurrentIdx(() => bookDataList.length - 6);
    }
  };

  const nextBtnHandler = () => {
    if (currentIdx < bookDataList.length - 6) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(() => 0);
    }
  };

  const renderBooks = bookDataList
    .slice(currentIdx, currentIdx + 5)
    .map((el, idx) => {
      return (
        <div
          ref={(ele) => (wrapperRef.current[idx] = ele)}
          key={el.title}
          css={imgWrapperCSS({
            idx,
            widthValue: cardLayout.widthValue,
            heightValue: cardLayout.heightValue,
            unit: cardLayout.unit,
            highlightedWidthValue: cardLayout.highlightedWidthValue,
            highlightedHeightValue: cardLayout.highlightedHeightValue,
            spaceValue: cardLayout.spaceValue,
            normalRef: dummyNormalRef,
            minWidthValue: cardLayout.minWidthValue,
            minHeightValue: cardLayout.minHeightValue,
            minHighlightedWidthValue: cardLayout.minHighlightedWidthValue,
            minHighlightedHeightValue: cardLayout.minHighlightedHeightValue,
            minSpaceValue: cardLayout.minSpaceValue,
          })}
        >
          {/* <img src={el.img} css={imgCSS} /> */}

          <BookCard
            bookData={el}
            showPlatform={true}
            // width={`${wrapperRef?.current[idx]?.clientWidth}px`}
            // height={`${wrapperRef?.current[idx]?.clientHeight}px`}
          />
          {/* <img src={el.img} css={imgCSS({idx, widthValue: cardLayout.widthValue, heightValue: cardLayout.heightValue, unit: cardLayout.unit, highlightedWidthValue: cardLayout.highlightedWidthValue, highlightedHeightValue: cardLayout.highlightedHeightValue, spaceValue: cardLayout.spaceValue, normalRef: dummyNormalRef, highlightedRef: dummyHighlightedRef, minWidthValue: cardLayout.minWidthValue, minHeightValue: cardLayout.minHeightValue, minHighlightedWidthValue: cardLayout.minHighlightedWidthValue, minHighlightedHeightValue: cardLayout.minHighlightedHeightValue, minSpaceValue: cardLayout.minSpaceValue })} /> */}
        </div>
      );
    });

  return (
    // <div css={carouselOuterWrapperCSS({highlightedHeightValue: cardLayout.highlightedHeightValue, unit: cardLayout.unit, minHighlightedHeightValue: cardLayout.minHighlightedHeightValue, highlightedRef: dummyHighlightedRef})}></div>
    <div css={carouselOuterWrapperCSS}>
      <div>
        <button onClick={prevBtnHandler}>prev</button>
        <button
          onClick={() => {
            console.log(bookDataList);
          }}
        >
          show
        </button>
        <button onClick={nextBtnHandler}>next</button>
        <div
          css={carouselInnerWrapperCSS({
            widthValue: cardLayout.widthValue,
            unit: cardLayout.unit,
            highlightedWidthValue: cardLayout.highlightedWidthValue,
            spaceValue: cardLayout.spaceValue,
          })}
        >
          {renderBooks}
        </div>

        <div
          ref={dummyNormalRef}
          css={dummyNormalCSS({
            widthValue: cardLayout.widthValue,
            heightValue: cardLayout.heightValue,
            unit: cardLayout.unit,
          })}
        />
        {/* <div ref={dummyHighlightedRef} css={dummyHighlightedCSS({highlightedWidthValue: cardLayout.highlightedWidthValue, highlightedHeightValue: cardLayout.highlightedHeightValue, unit: cardLayout.unit})} /> */}
      </div>
    </div>
  );
};

export default HighlightedCarousel;

// interface carouselOuterWrapperCSSProps {
//     highlightedHeightValue: number;
//     unit: string;
//     minHighlightedHeightValue: number;
//     highlightedRef: any;
// }

// const carouselOuterWrapperCSS = ({highlightedHeightValue, unit, minHighlightedHeightValue, highlightedRef}: carouselOuterWrapperCSSProps) => {
//     const calcHeight = highlightedRef?.current?.clientHeight < minHighlightedHeightValue ? minHighlightedHeightValue + 'px' : highlightedHeightValue + unit
//     return css`
//         width: 100%;
//         height: ${calcHeight};
//         margin: 0 auto;
//         display:flex;
//         justify-content: center;
//     `
// }

const carouselOuterWrapperCSS = css`
  width: 100%;
  margin: 0 auto;
  /* display:flex;
        justify-content: center; */
  display: grid;
  place-items: center;
`;

interface imgWrapperCSSProps {
  idx: number;
  widthValue: number;
  heightValue: number;
  unit: string;
  highlightedWidthValue: number;
  highlightedHeightValue: number;
  spaceValue: number;
  normalRef: any;

  minWidthValue: number;
  minHeightValue: number;
  minHighlightedWidthValue: number;
  minHighlightedHeightValue: number;
  minSpaceValue: number;
}

const imgWrapperCSS = ({
  idx,
  widthValue,
  heightValue,
  unit,
  highlightedWidthValue,
  highlightedHeightValue,
  spaceValue,
  normalRef,
  minWidthValue,
  minHeightValue,
  minHighlightedWidthValue,
  minHighlightedHeightValue,
  minSpaceValue,
}: imgWrapperCSSProps) => {
  const calcWidth =
    normalRef?.current?.clientWidth < minWidthValue
      ? (idx === 2 ? minHighlightedWidthValue : minWidthValue) + "px"
      : (idx === 2 ? highlightedWidthValue : widthValue) + unit;
  const calcHeight =
    normalRef?.current?.clientHeight < minHeightValue
      ? (idx === 2 ? minHighlightedHeightValue : minHeightValue) + "px"
      : (idx === 2 ? highlightedHeightValue : heightValue) + unit;
  const calcLeft =
    normalRef?.current?.clientWidth < minWidthValue
      ? (idx > 2
          ? idx * (minWidthValue + minSpaceValue) +
            (minHighlightedWidthValue - minWidthValue)
          : idx * (minWidthValue + minSpaceValue)) + "px"
      : (idx > 2
          ? idx * (widthValue + spaceValue) +
            (highlightedWidthValue - widthValue)
          : idx * (widthValue + spaceValue)) + unit;
  const calcTop =
    normalRef?.current?.clientWidth < minWidthValue
      ? (idx === 2 ? -(minHighlightedHeightValue - minHeightValue) / 2 : 0) +
        "px"
      : (idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) + unit;
  return css`
    transition-property: left top width height;
    transition-duration: 0.3s;
    position: absolute;
    left: ${calcLeft};
    top: ${calcTop};
    /* left: ${(idx > 2
      ? idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue)
      : idx * (widthValue + spaceValue)) + unit}; */
    /* top: ${(idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) +
    unit}; */
    width: ${calcWidth};
    height: ${calcHeight};
    visibility: ${idx < 5 ? "visible" : "hidden"};
    overflow: hidden;
  `;
};

// const imgWrapperCSS = ({idx, widthValue, heightValue, unit, highlightedWidthValue, highlightedHeightValue, spaceValue}: imgCSSProps) => {
//     return css`
//         transition-property: left top width height;
//         transition-duration: 0.3s;
//         position: absolute;
//         left: ${(idx > 2 ? (idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue)) : idx * (widthValue + spaceValue)) + unit};
//         top: ${(idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) + unit};
//         width: ${(idx === 2 ? highlightedWidthValue : widthValue) + unit};
//         height: ${(idx === 2 ? highlightedHeightValue : heightValue) + unit};
//         visibility: ${idx < 5 ? 'visible' : 'hidden'};
//         overflow: hidden;

//     `
// }

// interface imgCSSProps {
//     idx: number;
//     widthValue: number;
//     heightValue: number;
//     unit: string;
//     highlightedWidthValue: number;
//     highlightedHeightValue: number;
//     spaceValue: number;
//     normalRef: any;
//     highlightedRef: any;

//     minWidthValue: number;
//     minHeightValue: number;
//     minHighlightedWidthValue: number;
//     minHighlightedHeightValue: number;
//     minSpaceValue: number;

// }

// const imgCSS = ({idx, widthValue, unit, highlightedWidthValue, spaceValue}: imgCSSProps) => {
//     return css`
//         /* width: ${(idx === 2 ? highlightedWidthValue : widthValue) + unit};
//         height: auto; */
//         width: 100%;
//         height: auto;
//     `
// }

const imgCSS = css`
  width: 100%;
  height: auto;
`;

interface carouselInnerWrapperCSSProps {
  widthValue: number;
  unit: string;
  highlightedWidthValue: number;
  spaceValue: number;
}

const carouselInnerWrapperCSS = ({
  widthValue,
  unit,
  highlightedWidthValue,
  spaceValue,
}: carouselInnerWrapperCSSProps) => {
  return css`
    width: ${(widthValue + spaceValue) * 4 + highlightedWidthValue + unit};
    position: relative;
    display: flex;
  `;
};

interface dummyNormalCSSProps {
  widthValue: number;
  heightValue: number;
  unit: string;
}

const dummyNormalCSS = ({
  widthValue,
  heightValue,
  unit,
}: dummyNormalCSSProps) => {
  return css`
    width: ${widthValue + unit};
    height: ${heightValue + unit};
    /* display: none; */
  `;
};

interface dummyHighlightedCSSProps {
  highlightedWidthValue: number;
  highlightedHeightValue: number;
  unit: string;
}

const dummyHighlightedCSS = ({
  highlightedWidthValue,
  highlightedHeightValue,
  unit,
}: dummyHighlightedCSSProps) => {
  return css`
    width: ${highlightedWidthValue + unit};
    height: ${highlightedHeightValue + unit};
    /* display: none; */
  `;
};
