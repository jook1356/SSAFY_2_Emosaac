/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
// import emosaac_logo from "@/assets/emosaac_logo.png";
// import emosaac_logo_white from "@/assets/emosaac_logo_white.png";
// import emosaac_logo_mobile from "@/assets/emosaac_logo_mobile.png";
// import { ReactComponent as Logo } from "@/assets/emosaac_logo.svg";
import { SearchBar } from "./SearchBar";
import { SearchBarMobile } from "./SearchBarMobile";
import SearchBox from "./SearchBox";
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
  RiArrowLeftSLine,
} from "react-icons/ri";
import Link from "next/link";

export const NavigationBar = () => {
  // DeskTop Nav content의 최소 너비
  const isNavLimit = !useMediaQuery({
    query: "(min-width: 1185px) or (max-width: 1023px)",
  });
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  function onClickSearchBar() {
    if (!isMobile) {
      setIsSearchBoxOpen(!isSearchBoxOpen);
    }
  }
  function onClickSearchIcon() {
    setIsSearchBoxOpen(!isSearchBoxOpen);
    console.log("여는 버튼인디요");
  }
  function onClickSearchMobile() {
    setIsSearchClicked(!isSearchClicked);
    setIsSearchBoxOpen(!isSearchBoxOpen);
    console.log("이게 외 되냐고욘");
  }
  useEffect(() => {
    console.log(
      `isDeskTop:${isDeskTop}, isTablet:${isTablet}, isMobile:${isMobile}`
    );
  }, [isDeskTop, isTablet, isMobile]);
  return (
    <nav>
      <div css={navTopCSS}>
        {isSearchBoxOpen && isMobile && (
          <div css={searchBarMobileCSS}>
            <RiArrowLeftSLine size={30} onClick={onClickSearchIcon} />
            <SearchBarMobile
              isSearchClicked={isSearchClicked}
              setIsSearchBoxOpen={setIsSearchBoxOpen}
            />
            <FiSearch size={24} onClick={onClickSearchMobile} />
          </div>
        )}
        <div css={navBackCSS(isTablet)}>
          <div
            css={navWrapCSS({
              isSearchBoxOpen,
              isNavLimit,
              isDeskTop,
              isTablet,
              isMobile,
            })}
          >
            <Link href={{ pathname: "/" }}>
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
            <div onClick={onClickSearchBar}>
              {!isMobile && (
                <SearchBar setIsSearchBoxOpen={setIsSearchBoxOpen} />
              )}
            </div>

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
                onClick={onClickSearchIcon}
              />
            )}
          </div>
        </div>
        {isTablet && (
          <div css={menuWrapCSS(isDeskTop, isTablet)}>
            <Link href={{ pathname: "/" }}>홈</Link>
            <Link href={{ pathname: "/books" }}>웹툰</Link>
            <Link href={{ pathname: "/books" }}>웹소설</Link>
            <Link href={{ pathname: "/emopick" }}>EMOPICK</Link>
          </div>
        )}
        {isSearchBoxOpen && (
          <SearchBox setIsSearchBoxOpen={setIsSearchBoxOpen} />
        )}
      </div>
      {isMobile && (
        <ul css={dockBarCSS}>
          <li>
            <Link href={{ pathname: "/" }}>
              <AiFillHome size={24} />
              <div>홈</div>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "books" }}>
              <MdOutlineCookie size={24} />
              <div>웹툰</div>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "books" }}>
              <RiBookReadLine size={24} />
              <div>웹소설</div>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "emopick" }}>
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
  isSearchBoxOpen: boolean;
  isNavLimit: boolean;
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

const navTopCSS = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
`;

const searchBarMobileCSS = css`
  position: absolute;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 30px 1fr 20px;
  column-gap: 20px;
  width: 100%;
  height: 60px;
  padding-right: 20px;
  background-color: var(--back-color);
  animation: ${visibleCSS("0")} 0.3s;
  & > * {
    margin: auto 0;
  }
  & > svg:first-of-type {
    transform: translateX(8px);
  }
`;

const navBackCSS = (isTablet: boolean) => {
  return css`
    position: relative;
    z-index: 19;
    ${!isTablet && "border-bottom: 1px solid var(--border-color-2);"}
    background-color: var(--back-color);
    /* box-shadow: var(--shadow-color); */
  `;
};

const navWrapCSS = ({
  isSearchBoxOpen,
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
    ${(isDeskTop || isTablet || isMobile) && "display : grid;"}
    ${isDeskTop
      ? "grid-template-columns: 130px 180px 1fr 60px 80px;"
      : isTablet
      ? "grid-template-columns: 130px 1fr 60px 24px;"
      : isMobile
      ? "grid-template-columns: 40px 1fr 60px 20px;"
      : "grid-template-columns: none;"}
    ${!isMobile && "column-gap: 24px;"}
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
    z-index: 20;
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
