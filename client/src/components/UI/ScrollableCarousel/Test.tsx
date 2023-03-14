/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";

const Test = () => {
  const add = () => {
    setArray((prev) => [...prev, 0]);
  };

  const box = (
    <div css={boxStyle}>
      <button onClick={add}>추가!</button>
    </div>
  );
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const boxTags = array.map(() => {
    return box;
  });

  return <>{boxTags}</>;
};

const boxStyle = css`
  min-width: 100%;
  height: 128px;
  background-color: var(--main-color);
  border: 2px solid black;
  box-sizing: border-box;
`;

export default Test;
