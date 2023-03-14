// import { useMediaQuery } from "react-responsive";
// import { useIsClient } from "@/components/Responsive/useIsClient";
import { isResponsive } from "@/components/Responsive/isResponsive";

const NavigationBar = () => {
  // const isDesktop = useMediaQuery({
  //   query: "(min-width: 1024px)",
  // });
  // const isTablet = useMediaQuery({
  //   query: "(max-width: 1023px) and (min-width:768px)",
  // });
  // const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  // const isClient = useIsClient();
  console.log(isResponsive);
  return (
    <div>
      {/* {responsive.isDesktop && <div>데스크탑</div>}
      {responsive.isDesktop && <div>태블릿</div>}
      {responsive.isDesktop && <div>모바일</div>} */}
    </div>
  );
};

export default NavigationBar;
