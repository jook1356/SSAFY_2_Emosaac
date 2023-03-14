/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef } from "react"

import ridi from '../../../assets/platform_ridi.webp'
import naverSeries from '../../../assets/platform_naver_series.webp'
import naverWebtoon from '../../../assets/platform_naver_webtoon.webp'
import kakaoPage from '../../../assets/platform_kakao_page.png'

import BookCardModal from "@/components/bookCardModal/BookCardModal";
import Portal from "@/components/function/Portal";

interface BookData {
  title: string;
  img: string;
  platform: string;
}

interface Props {
  bookData?: any;
  showPlatform: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
}

const BookCard = ({
  bookData,
  showPlatform,
  width,
  height,
  minWidth,
  minHeight,
}: Props) => {

  const wrapperRef = useRef<HTMLInputElement>(null);
  const [modalToggler, setModalToggler] = useState<boolean>(false)

  const platformBar = (
    <div css={platformBarCSS}></div>
  )

  const modalHandler = () => {
    setModalToggler(() => true)
    console.log(wrapperRef)
    console.log(wrapperRef.current && wrapperRef.current.getBoundingClientRect().top)
  }
  

  const modal = (
    <Portal selector=".overlay-root">
      <BookCardModal modalToggler={modalToggler} setModalToggler={setModalToggler} bookData={bookData} parentRef={wrapperRef} />
    </Portal>
  )

  return (
    <div css={cardOuterWrapper} ref={wrapperRef} onMouseEnter={modalHandler} >
      {modalToggler && modal}
      
      <div  css={cardInnerWrapperCSS({ width, height, minWidth, minHeight })}>
        <div
          css={skeletonLoadingTagCSS({
            state: bookData !== "LOADING" ? true : false,
          })}
        />
        <img src={bookData && bookData.img} alt={bookData && bookData.title} css={imageCSS} />
        {showPlatform && bookData !== "LOADING" && platformBar}
      </div>
    </div>
  );
};

const cardOuterWrapper = css`
  position: relative;
  
`


interface CardInnerWrapperProps {
  width: string | undefined;
  height: string | undefined;
  minWidth: string | undefined;
  minHeight: string | undefined;
}

const cardInnerWrapperCSS = ({
  width,
  height,
  minWidth,
  minHeight,
}: CardInnerWrapperProps) => {
  return css`
    width: ${width !== null ? width : "100px"};
    height: ${height !== null ? height : "200px"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

  `;
};

const platformBarCSS = css`
  width: 100%;
  height: 3vw;
  min-height: 36px;
  background-color: rgba(0,0,0,0.2);
  position: absolute;
  bottom: 0;
`;

const imageCSS = css`
  width: auto;
  height: 100%;
`

interface skeletonLoadingTagCSSProps {
  state: boolean;
}

const skeletonLoadingTagCSS = ({ state }: skeletonLoadingTagCSSProps) => {
  return css`
    width: 100%;
    height: 100%;
    transition-property: opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: rgb(200, 200, 200);
    position: absolute;
    opacity: ${state ? "0" : "255"};
  `;
};

export default BookCard;
