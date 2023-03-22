/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { NavigationBar } from "../UI/NavigationBar/NavigationBar";
import { useIsResponsive } from "../Responsive/useIsResponsive";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return (
    <div css={backCSS(isMobile)}>
      <NavigationBar />
      {props.children}
    </div>
  );
};

const backCSS = (isMobile: boolean) => {
  return css`
    background-color: var(--back-color);
    color: var(--text-color);
    ${isMobile && "padding-top: 60px;"}
    ${!isMobile && "padding-top: 70px;"}
  `;
};

export default Layout;
