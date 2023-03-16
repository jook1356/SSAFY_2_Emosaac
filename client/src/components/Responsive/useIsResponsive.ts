import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useIsClient } from "@/components/Responsive/useIsClient";

export const useIsResponsive = (): boolean[] => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023.999999px) and (min-width:768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {}, []);
  return [isDesktop, isTablet, isMobile];
};
