/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import Image from "next/image";
import emosaac_logo from "@/assets/emosaac_logo.svg";
import emosaac_logo_mobile from "@/assets/emosaac_logo_mobile.png";
// import { ReactComponent as Logo } from "@/assets/emosaac_logo.svg";
import { SearchBar } from "./SearchBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { BasicButton } from "./BasicButton";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import { BsPersonFill } from "react-icons/bs";

export const NavigationBar = () => {
  const isClient = useIsClient();

  // DeskTop Nav content의 최소 너비
  const isNavLimit = !useMediaQuery({
    query: "(min-width: 1124px) or (max-width: 1023px)",
  });
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return (
    <nav>
      <div css={navBackCSS}>
        <div css={navWrapCSS({ isNavLimit, isDeskTop, isTablet, isMobile })}>
          <h1 css={logoWrapCSS}>
            <Image
              alt="logo"
              src={isMobile ? emosaac_logo_mobile : emosaac_logo}
            />
          </h1>
          {isClient && isDeskTop && (
            <div css={menuWrapCSS(isDeskTop)}>
              <a href="#">웹툰</a>
              <a href="#">웹소설</a>
            </div>
          )}
          {isClient && !isMobile && (
            <SearchBar
              isDeskTop={isDeskTop}
              isTablet={isTablet}
              isMobile={isMobile}
            />
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
      {isClient && !isDeskTop && (
        <div css={menuWrapCSS(isDeskTop)}>
          <a href="#">웹툰</a>
          <a href="#">웹소설</a>
        </div>
      )}
    </nav>
  );
};
interface IsResponsive {
  isNavLimit: boolean;
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const navBackCSS = css`
  background-color: var(--back-color);
  border-bottom: 1px solid var(--border-color);
`;

const navWrapCSS = ({
  isNavLimit,
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) => {
  return css`
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: ${isDeskTop
      ? "154px 110px 1fr 80px 80px"
      : isTablet
      ? "154px 1fr 80px 56px"
      : isMobile
      ? "40px 80px"
      : "none"};
    column-gap: 24px;
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

const menuWrapCSS = (isDeskTop: boolean) => {
  return css`
    display: flex;

    justify-content: space-between;
    & > a {
      line-height: 70px;
    }
  `;
};
