/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
// import NavigationBar from "../UI/NavigationBar/NavigationBar";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  return (
    <div>
      
      {/* <NavigationBar /> */}
      {props.children}
    </div>
  );
};

export default Layout;
