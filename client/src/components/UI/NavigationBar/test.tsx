/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

export const hi = () => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return <></>;
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
