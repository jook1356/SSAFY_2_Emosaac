/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";



import {useState} from "react"
import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";
import { recvBooks } from "../api/DummyData";
import BookCardsRow from "@/components/UI/ScrollableCarousel/BookCardsRow/BookCardsRow";

export default function Home() {



  return (
    <div>
      <ScrollableCarousel content={<BookCardsRow identifier={'test1'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test2'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test3'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test4'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test5'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test6'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test7'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test8'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test9'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test10'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test11'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />
      <ScrollableCarousel content={<BookCardsRow identifier={'test12'} wrapperRef={0} curPage={0} maxPage={0} API={recvBooks}/>} />

    </div>
  );
}
