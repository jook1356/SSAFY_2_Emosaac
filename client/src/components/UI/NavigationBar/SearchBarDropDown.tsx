/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

interface Props {
  isDeskTop: boolean;
}

export const SearchBarDropDown = (props: Props) => {
  const [selectArr, setSelectArr] = useState(["전체", "웹툰", "웹소설"]);
  function onClickDropDown() {}
  return (
    <div css={dropDownWrapCSS} onClick={onClickDropDown}>
      {"웹툰"}
      <HiOutlineChevronDown />
      <div css={dropDownBoxCSS}>
        <div css={selectedCSS}>
          <div>{"전체"}</div>
          <HiOutlineChevronDown />
        </div>
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
  display: none;
  /* position: absolute; */
  top: 0;
  left: -14px;
  width: 120px;
  height: 138px;
  padding: 0 10px 20px;
  background-color: var(--back-color-3);
  color: var(--text-color);
  font-size: 14px;
  border-radius: 5px;
  font-weight: normal;
  & > div:nth-child(n + 2) {
    height: 30px;
    & :hover {
      filter: var(--hover-color);
    }
  }
`;

const selectedCSS = css`
  height: 48px;
  line-height: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
