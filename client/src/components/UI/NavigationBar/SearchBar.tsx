/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { SearchBarDropDown } from "./SearchBarDropDown";
import { FiSearch } from "react-icons/fi";

export const SearchBar = () => {
  return (
    <div css={searchBarWrapCSS}>
      <div css={searchIconCSS}>
        <FiSearch />
      </div>
      <input
        type="text"
        placeholder="제목, 작가를 입력하세요."
        css={inputWrapCSS}
      />
      <div>in</div>
      <SearchBarDropDown />
    </div>
  );
};

const searchBarWrapCSS = css`
  display: grid;
  grid-template-columns: 20px 1fr 20px 100px;
  column-gap: 20px;
  height: 48px;
  background-color: var(--back-color-2);
  border-radius: 5px;
  font-weight: bold;
  & > * {
    margin: auto 0;
  }
`;

const searchIconCSS = css`
  & > * {
    margin-left: 14px;
  }
`;

const inputWrapCSS = css`
  border: none;
  outline: none;
  background-color: var(--back-color-2);
  ::placeholder {
    font-weight: bold;
  }
`;
