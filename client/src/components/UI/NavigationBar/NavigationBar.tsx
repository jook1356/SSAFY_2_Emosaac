/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import Image from "next/image";
import emosaac_logo from "@/assets/emosaac_logo.png";
import { SearchBar } from "./SearchBar";
import { DarkModeToggle } from "./DarkModeToggle";
import { BasicButton } from "./BasicButton";

const NavigationBar = () => {
  return (
    <nav css={navWrapCSS}>
      <h1 css={logoWrapCSS}>
        <Image alt="logo" src={emosaac_logo} />
      </h1>
      <div css={menuWrapCSS}>
        <a href="#">웹툰</a>
        <a href="#">웹소설</a>
      </div>
      <SearchBar />
      <DarkModeToggle />
      <BasicButton />
    </nav>
  );
};

const navWrapCSS = css`
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 154px 110px 1fr 80px 100px;
  column-gap: 30px;
  padding: 0 105px;
  height: 70px;
  background-color: var(--back-color);
  color: var(--text-color);
  & > * {
    margin: auto 0;
  }
`;

const logoWrapCSS = css`
  & > img {
    width: 100%;
    object-fit: contain;
    /* filter: contrast(200%); */
  }
`;

const menuWrapCSS = css`
  display: flex;
  justify-content: space-between;
  & > a {
    /* margin: 0 4px; */
    line-height: 70px;
  }
`;
export default NavigationBar;
