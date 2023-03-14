import { useMediaQuery } from "react-responsive";
import { useIsClient } from "@/components/Responsive/useIsClient";

export const isResponsive = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px) and (min-width:768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return isDesktop;
};
