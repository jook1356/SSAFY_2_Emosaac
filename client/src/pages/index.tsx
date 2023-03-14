/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";



import {useState} from "react"
import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";
import { recvBooks } from "../api/DummyData";

export default function Home() {



  return (
    <div>
      <div css={temp} />
      <ScrollableCarousel API={recvBooks} identifier={'test1'}/>
      {/* <div css={temp1} /> */}

    </div>
  );
}

const temp = css`
  width: 50vw;
  height: 200px;
`

const temp1 = css`
  width: 50vw;
  height: 100vh;
`

