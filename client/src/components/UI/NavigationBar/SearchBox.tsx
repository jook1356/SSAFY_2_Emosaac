/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

interface Props {
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchBox = (props: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  function onClickBack() {
    props.setIsSearchBoxOpen(false);
  }
  return (
    <div css={searchWrapCSS}>
      <div
        css={searchBoxCSS({
          isDeskTop,
          isTablet,
          isMobile,
        })}
      >
        열림용
      </div>
      <div
        css={boxBackCSS({
          isDeskTop,
          isTablet,
          isMobile,
        })}
        onClick={onClickBack}
      ></div>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const visibleCSS = (transY: string) => {
  return keyframes`
    0% {
      opacity: 0; 
      transform:translateY(${transY});}
    100% {
      opacity : 100; 
      transform:translateY(0);}
  `;
};

const searchWrapCSS = css`
  position: relative;
`;

const searchBoxCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    position: absolute;
    z-index: 18;
    width: 100%;
    height: 200px;
    border-radius: 0 0 10px 10px;
    background-color: var(--back-color-2);
    animation: ${visibleCSS("-200px")} 0.3s;
  `;
};

const boxBackCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${isDeskTop && "height: calc(100vh - 70px);"}
    ${isTablet && "height: calc(100vh - 110.8px);"}
    ${isMobile && "height: calc(100vh - 115px);"}
    background-color: #17171b55;
  `;
};

export default SearchBox;
