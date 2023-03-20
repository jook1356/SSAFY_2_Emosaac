/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef } from "react";
import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";
import SwipeableGallery from "@/components/UI/SwipeableCarousel/SwipeableGallery";
import { recvBooks } from "@/api/DummyData";
import banner1 from "../../assets/temp_banner_1.png";
import banner2 from "../../assets/temp_banner_2.png";
import Image from "next/image";
import HighlightedCarousel from "@/components/bookTab/HighlightedCarousel/HighlightedCarousel";
import RowTitle from "@/components/bookTab/RowTitle/RowTitle";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import contentBannerDesktop from "../../assets/content_banner_desktop_tablet.png"
import contentBannerMobile from "../../assets/content_banner_mobile.png"

export default function Home() {
  const parentRef = useRef<HTMLInputElement>(null);

  const [isDeskTop, isTablet, isMobile] = useIsResponsive();

  // ________________________________________________________________________________________________
  // 임시 데이터
  const postData = {
    content: [
      <Image src={banner1} alt={""} css={bannerImage} />,
      <Image src={banner2} alt={""} css={bannerImage} />,
      <Image src={banner2} alt={""} css={bannerImage} />,
    ],
  };

  const getBookData = recvBooks(0, 20).then((res: any) =>
    setBookData(() => res)
  );
  const [bookData, setBookData] = useState<object[]>([]);
  // ________________________________________________________________________________________________

  return (
    <div css={indexWrapperCSS}>
      <div css={bannerWrapperCSS} ref={parentRef}>
        <SwipeableGallery parentRef={parentRef} content={postData} />
      </div>

      <div css={whiteSpace1CSS} />
      <div css={innerLayoutWrapperCSS({isDeskTop, isTablet, isMobile})}>
        <RowTitle
          beforeLabel="희MD"
          highlightedLabel=" EMOSAAC!"
          noLine={true}
          marginBottom={"45px"}
        />
      </div>
      
      <div css={highlightedCarouselWrapper}>
        {bookData.length !== 0 && <HighlightedCarousel bookData={bookData} />}
      </div>
      <div css={whiteSpace2CSS} />

      <div css={innerLayoutWrapperCSS({isDeskTop, isTablet, isMobile})}>
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
      </div>

      <Image src={isMobile === true ? contentBannerMobile : contentBannerDesktop} alt={""} css={bannerImage} />

      <div css={innerLayoutWrapperCSS({isDeskTop, isTablet, isMobile})}>
        <div css={whiteSpace1CSS} />
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
      </div>
    </div>
  );
}

const indexWrapperCSS = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const bannerImage = css`
  width: 100%;
  height: auto;
`;

const whiteSpace1CSS = css`
  width: 100%;
  height: 5vw;
  min-height: 48px;
`;

const whiteSpace2CSS = css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;

const bannerWrapperCSS = css`
  width: 100%;
  overflow: hidden;
`;

const highlightedCarouselWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const bookCarouselWrapperCSS = css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;


interface innerLayoutWrapperCSSProps {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const innerLayoutWrapperCSS = ({isDeskTop, isTablet, isMobile}: innerLayoutWrapperCSSProps) => {
  const whiteSpace = (isDeskTop && 210) || (isTablet && 100) || (isMobile && 0)
  return css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `
}