/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useMediaQuery } from "react-responsive";

const NavigationBar = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px) and (min-width:768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div>
      {isDesktop && "데스크탑"}
      {isTablet && "태블릿"}
      {isMobile && "모바일"}
    </div>
  );
};

const dddd = css`
  color: var(--main-color);
`;
export default NavigationBar;
