/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
// import emosaac_logo from "@/assets/emosaac_logo.png";
// import emosaac_logo_white from "@/assets/emosaac_logo_white.png";
// import emosaac_logo_mobile from "@/assets/emosaac_logo_mobile.png";
// import { ReactComponent as Logo } from "@/assets/emosaac_logo.svg";
import { SearchBar } from "./SearchBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { BasicButton } from "./BasicButton";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useMediaQuery } from "react-responsive";
import { BsPersonFill, BsPerson } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdCookie, MdOutlineCookie } from "react-icons/md";
import {
  RiBookReadFill,
  RiBookReadLine,
  RiPlayCircleFill,
  RiPlayCircleLine,
} from "react-icons/ri";
import Link from "next/link";

export const NavigationBar = () => {
  // DeskTop Nav content의 최소 너비
  const isNavLimit = !useMediaQuery({
    query: "(min-width: 1185px) or (max-width: 1023px)",
  });
  const isClient = useIsClient();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  useEffect(() => {
    console.log(
      `isDeskTop:${isDeskTop}, isTablet:${isTablet}, isMobile:${isMobile}`
    );
  }, [isDeskTop, isTablet, isMobile]);
  return (
    <nav>
      <div css={navTopCSS}>
        <div css={navBackCSS(isTablet)}>
          <div
            css={navWrapCSS({
              isClient,
              isNavLimit,
              isDeskTop,
              isTablet,
              isMobile,
            })}
          >
            <Link href={"/"}>
              <h1 css={logoWrapCSS}>
                {isMobile && (
                  <img alt="logo" src={"/assets/emosaac_logo_mobile.png"} />
                )}
                {!isMobile && isDarkMode && (
                  <img alt="logo" src={"/assets/emosaac_logo_white.png"} />
                )}
                {!isMobile && !isDarkMode && (
                  <img alt="logo" src={"/assets/emosaac_logo.png"} />
                )}
              </h1>
            </Link>
            {isDeskTop && (
              <div css={menuWrapCSS(isDeskTop, isTablet)}>
                <Link href={"/books"}>웹툰</Link>
                <Link href={"/books"}>웹소설</Link>
                <Link href={"/emopick"}>EMOPICK</Link>
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
            {isMobile && <div></div>}
            <DarkModeToggle
              isDeskTop={isDeskTop}
              isTablet={isTablet}
              isMobile={isMobile}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
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
            {isMobile && (
              <FiSearch
                size={24}
                css={css`
                  cursor: pointer;
                `}
              />
            )}
          </div>
        </div>
        {isTablet && (
          <div css={menuWrapCSS(isDeskTop, isTablet)}>
            <Link href={"/"}>홈</Link>
            <Link href={"/books"}>웹툰</Link>
            <Link href={"/books"}>웹소설</Link>
            <Link href={"/emopick"}>EMOPICK</Link>
          </div>
        )}
      </div>
      {isMobile && (
        <ul css={dockBarCSS}>
          <li>
            <Link href="/">
              <AiFillHome size={24} />
              <div>홈</div>
            </Link>
          </li>
          <li>
            <Link href="books">
              <MdOutlineCookie size={24} />
              <div>웹툰</div>
            </Link>
          </li>
          <li>
            <Link href="books">
              <RiBookReadLine size={24} />
              <div>웹소설</div>
            </Link>
          </li>
          <li>
            <Link href="emopick">
              <RiPlayCircleLine size={24} />
              <div>이모픽</div>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <BsPerson size={24} />
              <div>MY</div>
            </Link>
          </li>
        </ul>
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
const navTopCSS = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
`;

const navBackCSS = (isTablet: boolean) => {
  return css`
    ${!isTablet && "border-bottom: 1px solid var(--border-color-2);"}
    background-color: var(--back-color);
    /* box-shadow: var(--shadow-color); */
  `;
};

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
    grid-template-columns: none;
    ${isClient && (isDeskTop || isTablet || isMobile) && "display : grid;"}
    ${isClient && "grid-template-columns: "}
    ${isDeskTop
      ? "130px 180px 1fr 60px 80px;"
      : isTablet
      ? "130px 1fr 60px 24px;"
      : isMobile
      ? "40px 1fr 60px 20px;"
      : "none;"}
      ${isClient && "column-gap: 24px;"}
      ${isMobile && "column-gap: 20px;"}
    margin: ${isDeskTop
      ? isNavLimit
        ? "0 auto"
        : "0 105px"
      : isTablet
      ? "0 50px"
      : "0 20px"};
    /* height: ${isDeskTop ? "70px" : "60px"}; */
    height: 70px;
    ${isMobile && "height: 60px;"}
    width: ${isDeskTop ? (isNavLimit ? "914px" : "auto") : "auto"};
    color: var(--text-color);
    & > * {
      margin: auto 0;
    }
  `;
};

const logoWrapCSS = css`
  cursor: pointer;
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
    ${isTablet && "border-bottom: 1px solid var(--border-color-2);"}
    & > a {
      line-height: ${isDeskTop ? "50px" : "40px"};
      ${isDeskTop ? null : "padding: 0 10px;"}
    }
  `;
};

const dockBarCSS = css`
  z-index: 10;
  display: grid;
  background-color: var(--back-color-op);
  box-shadow: var(--shadow-color);
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55px;
  & > li {
    height: 100%;
    & > a {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > div {
        padding-top: 6px;
        font-size: 12px;
      }
    }
  }
`;
