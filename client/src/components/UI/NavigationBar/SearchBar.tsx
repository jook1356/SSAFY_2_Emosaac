/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, SetStateAction } from "react";
import { SearchBarDropDown } from "./SearchBarDropDown";
import { FiSearch } from "react-icons/fi";

interface Props {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export const SearchBar = (props: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCate, setSelectedCate] = useState("전체");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  function onChangeSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    const inputText = event.target.value;
    setSearchInput(inputText);
    console.log(inputText);
  }
  function onEnterKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (searchInput === "") {
        alert("검색어를 입력해주세요");
      } else {
        if (searchInput.slice(0, 1) === "#") {
          console.log(`tag 검색, ${selectedCate}`);
        } else {
          console.log(`제목 / 내용 검색 ${selectedCate}`);
        }
      }
    }
  }
  return (
    <div css={searchBarWrapCSS}>
      <div css={searchIconCSS}>
        <FiSearch />
      </div>
      <input
        type="text"
        placeholder="제목, 작가를 입력하세요."
        css={inputWrapCSS}
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyPress={onEnterKeyPress}
      />
      {props.isMobile ? null : (
        <>
          <div>in</div>
          <SearchBarDropDown
            selectedCate={selectedCate}
            setSelectedCate={setSelectedCate}
            isDropDownOpen={isDropDownOpen}
            setIsDropDownOpen={setIsDropDownOpen}
          />
        </>
      )}
    </div>
  );
};

const searchBarWrapCSS = css`
  display: grid;
  grid-template-columns: 20px 1fr 20px 100px;
  column-gap: 20px;
  height: 45px;
  background-color: var(--back-color-2);
  border-radius: 5px;
  font-weight: bold;
  & > input {
    color: var(--text-color);
  }
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
