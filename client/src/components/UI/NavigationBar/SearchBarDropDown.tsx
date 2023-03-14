/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
export const SearchBarDropDown = () => {
  return (
    <div css={dropDownWrapCSS}>
      {"웹툰"}
      <HiOutlineChevronDown />
      <div css={dropDownBoxCSS}>
        <div>전체</div>
        <div>웹툰</div>
        <div>웹소설</div>
      </div>
    </div>
  );
};

const dropDownWrapCSS = css`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  height: 100%;
`;
const dropDownBoxCSS = css`
  /* display: none; */
  position: absolute;
  top: 0;
  left: -14px;
  width: 120px;
  height: 140px;
  padding: 10px 0;
  background-color: var(--back-color-3);
  color: var(--text-color);
  font-size: 14px;
  border-radius: 5px;
  & > div {
    height: 40px;
    line-height: 40px;
    text-align: center;
    /* border: 1px solid #fff; */
  }
`;
