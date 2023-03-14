/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Global } from "@/styles/ThemeProvider";
// import NavigationBar from "../UI/NavigationBar/NavigationBar";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  return (
    <div css={Global}>
      {/* <NavigationBar /> */}
      {props.children}
    </div>
  );
};

export default Layout;
