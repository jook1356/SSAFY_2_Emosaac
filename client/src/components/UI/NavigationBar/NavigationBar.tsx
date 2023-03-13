/** @jsxImportSource @emotion/react */
import { useMediaQuery } from "react-responsive";
import { useIsClient } from "@/components/Responsive/useIsClient";

const NavigationBar = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px) and (min-width:768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isClient = useIsClient();
  return (
    <div>
      {isClient && isDesktop && <div>데스크탑</div>}
      {isClient && isTablet && <div>태블릿</div>}
      {isClient && isMobile && <div>모바일</div>}
    </div>
  );
};

export default NavigationBar;
