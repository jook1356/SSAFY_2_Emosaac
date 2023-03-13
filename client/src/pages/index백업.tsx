/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { LightTheme, DarkTheme } from "@/styles/ThemeProvider";
import { atom, useAtom } from "jotai";
import mainStore, { darkMode } from "@/jotai/atom";

export default function Home() {
  
  const [isDarkTheme] = useAtom(darkMode);

  const click = () => {
    console.log(mainStore.get(darkMode));
  };
  const change = () => {
    mainStore.set(darkMode, !mainStore.get(darkMode));
    console.log("Changed!");
  };
  return (
    <div css={test(isDarkTheme)}>
      ABCDEFGHIJKLMNOP
      <button onClick={click}>show</button>
      <button onClick={change}>change</button>
    </div>
  );
}

const test = (props: any) => {
  return css`
    background-color: ${(props ? DarkTheme : LightTheme).PrimaryColor};
    width: 500px;
    height: 500px;
  `;
};
