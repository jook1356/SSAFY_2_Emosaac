/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef } from "react";
import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";
import SwipeableGallery from "@/components/UI/SwipeableCarousel/SwipeableGallery";
import { recvBooks } from "../api/DummyData";
import banner1 from "../assets/temp_banner_1.png";
import banner2 from "../assets/temp_banner_2.png";
import Image from "next/image";
import HighlightedCarousel from "@/components/bookTab/HighlightedCarousel/HighlightedCarousel";

export default function Home() {
  const parentRef = useRef<HTMLInputElement>(null);

  const postData = {
    content: [
      <Image src={banner1} alt={""} css={bannerImage} />,
      <Image src={banner2} alt={""} css={bannerImage} />,
      <Image src={banner2} alt={""} css={bannerImage} />,
    ],
  };

  const getBookData = recvBooks(0, 20).then((res: any) => setBookData(() => res))

  const [bookData, setBookData] = useState<object[]>([])

  return (
    <div css={indexWrapper}>

      
      <div css={temp1} ref={parentRef}>
        <SwipeableGallery parentRef={parentRef} content={postData} />
      </div>

      <div css={temp} />
      <div css={highlightedCarouselWrapper}>
        {bookData.length !== 0 && <HighlightedCarousel bookData={bookData} />}
      </div>
      <div css={temp} />
      


      <div css={temp} />
      <ScrollableCarousel API={recvBooks} identifier={"test1"} />
      <div css={temp} />
      <div css={temp} />
      <ScrollableCarousel API={recvBooks} identifier={"test1"} />
      <div css={temp} />
      <div css={temp} />
      <ScrollableCarousel API={recvBooks} identifier={"test1"} />
      <div css={temp} />
      <div css={temp} />
      <ScrollableCarousel API={recvBooks} identifier={"test1"} />
      <div css={temp} />

      
      
      <div css={temp} />
      <div css={temp} />
      <div css={temp} />
      <div css={temp} />
      <div css={temp} />
      <div css={temp} />
      <div css={temp} />
    </div>
  );
}

const indexWrapper = css`
  overflow: hidden;
`

const bannerImage = css`
  width: 100%;
  height: auto;
`;

const temp = css`
  width: 50vw;
  height: 100px;
`;

const temp1 = css`
  width: 100%;
  overflow: hidden;
`;

const highlightedCarouselWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
`
