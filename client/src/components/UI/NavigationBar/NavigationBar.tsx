/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import emosaac_logo from "@/assets/emosaac_logo.svg";
import emosaac_logo_mobile from "@/assets/emosaac_logo_mobile.png";
// import { ReactComponent as Logo } from "@/assets/emosaac_logo.svg";
import { SearchBar } from "./SearchBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { BasicButton } from "./BasicButton";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useMediaQuery } from "react-responsive";
import { BsPersonFill } from "react-icons/bs";

export const NavigationBar = () => {
  // DeskTop Nav content의 최소 너비
  const darkMode = localStorage.getItem("data-theme");
  const isNavLimit = !useMediaQuery({
    query: "(min-width: 1185px) or (max-width: 1023px)",
  });
  const isClient = useIsClient();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkMode = localStorage.getItem("data-theme");
    if (darkMode === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);
  useEffect(() => {
    console.log(
      `isDeskTop:${isDeskTop}, isTablet:${isTablet}, isMobile:${isMobile}`
    );
  }, [isDeskTop, isTablet, isMobile]);
  return (
    <nav css={navAllCSS}>
      <div css={navBackCSS}>
        <div
          css={navWrapCSS({
            isClient,
            isNavLimit,
            isDeskTop,
            isTablet,
            isMobile,
          })}
        >
          <h1 css={logoWrapCSS}>
            {isMobile && <Image alt="logo" src={emosaac_logo_mobile} />}
            {!isMobile && <Image alt="logo" src={emosaac_logo} />}
          </h1>
          {isDeskTop && (
            <div css={menuWrapCSS(isDeskTop, isTablet)}>
              <a href="#">웹툰</a>
              <a href="#">웹소설</a>
              <a href="#">EMOPICK</a>
            </div>
          )}
          {!isMobile && (
            <>
              <SearchBar
                isDeskTop={isDeskTop}
                isTablet={isTablet}
                isMobile={isMobile}
              />
            </>
          )}
          <DarkModeToggle
            isDeskTop={isDeskTop}
            isTablet={isTablet}
            isMobile={isMobile}
          />
          {isDeskTop ? (
            <BasicButton />
          ) : isTablet ? (
            <BsPersonFill
              size={24}
              css={css`
                color: var(--text-color);
              `}
            />
          ) : null}
        </div>
      </div>
      {!isDeskTop && (
        <div css={menuWrapCSS(isDeskTop, isTablet)}>
          <a href="#">홈</a>
          <a href="#">웹툰</a>
          <a href="#">웹소설</a>
          <a href="#">EMOPICK</a>
        </div>
      )}
    </nav>
  );
};
interface IsResponsive {
  isClient: boolean;
  isNavLimit: boolean;
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const navAllCSS = css`
  border-bottom: 1px solid var(--border-color-2);
`;

const navBackCSS = css`
  background-color: var(--back-color);
  /* box-shadow: var(--shadow-color); */
`;

const navWrapCSS = ({
  isClient,
  isNavLimit,
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) => {
  return css`
    position: relative;
    z-index: 10;
    display: none;
    ${isClient && "display : grid;"}
    ${isClient && "grid-template-columns: "}
    ${isDeskTop
      ? "130px 180px 1fr 60px 80px;"
      : isTablet
      ? "130px 1fr 60px 56px;"
      : isMobile
      ? "40px 60px;"
      : "none;"}
      ${isClient && "column-gap: 24px;"}
    margin: ${isDeskTop
      ? isNavLimit
        ? "0 auto"
        : "0 105px"
      : isTablet
      ? "0 50px"
      : "0 20px"};
    /* height: ${isDeskTop ? "70px" : "60px"}; */
    height: 70px;
    width: ${isDeskTop ? (isNavLimit ? "914px" : "auto") : "auto"};
    color: var(--text-color);
    & > * {
      margin: auto 0;
    }
  `;
};

const logoWrapCSS = css`
  display: flex;
  align-items: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    fill: red !important;
    & g {
      fill: red !important;
    }
  }
`;

const menuWrapCSS = (isDeskTop: boolean, isTablet: boolean) => {
  return css`
    display: flex;
    font-size: 14px;
    font-weight: bold;
    padding: ${isDeskTop ? "0" : isTablet ? "0 50px" : "0 20px"};
    justify-content: ${isDeskTop ? "space-between" : "flex-start"};
    ${isDeskTop ? null : "background-color: var(--back-color);"}
    & > a {
      line-height: ${isDeskTop ? "50px" : "40px"};
      ${isDeskTop ? null : "padding: 0 10px;"}
    }
  `;
};
