/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";
import { recvBooks } from "../api/DummyData";

export default function Home() {
  return (
    <div>
      <ScrollableCarousel API={recvBooks} />
    </div>
  );
}
