/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { NavigationBar } from "../UI/NavigationBar/NavigationBar";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  return (
    <div css={backCSS}>
      <NavigationBar />
      {props.children}
    </div>
  );
};

const backCSS = css`
  background-color: var(--back-color);
  color: var(--text-color);
`;

export default Layout;
