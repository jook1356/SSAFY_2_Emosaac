/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { throttle } from "lodash"

import Test from "./Test";
import BookCard from "../BookCard/BookCard";



const ScrollableCarousel = ({API}: any) => {
    const wrapperRef = useRef<HTMLInputElement>(null)
    const cardsRef = useRef<any>([])
    const [bookListData, setBookListData] = useState<object[]>([])

    const cardLayout = {
        width: '150px',
        height: '300px',
        minWidth: '150px',
        minHeight: '300px',
        padding: '10px',
    }



    const nextBtnClickHandler = () => {
        if (wrapperRef.current !== null) {
            const page = Math.ceil((wrapperRef.current.scrollLeft) / (wrapperRef.current.clientWidth - 10)) + 1
            const quantityPerPage = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth) - 1
            const idx = cardsRef.current.length > page * quantityPerPage ? page * quantityPerPage : cardsRef.current.length - 1
            console.log(page, quantityPerPage)
            console.log(cardsRef)
            wrapperRef.current.scrollTo({ left: cardsRef.current[idx].offsetLeft, top: 0, behavior: "smooth" });
            fetchMoreData()
        }  
    }

    const prevBtnClickHandler = () => {
        if (wrapperRef.current !== null) {
            const page = Math.ceil((wrapperRef.current.scrollLeft) / (wrapperRef.current.clientWidth - 10)) - 1
            const quantityPerPage = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth) - 1
            console.log(page, quantityPerPage)
            console.log(cardsRef)
            wrapperRef.current.scrollTo({ left: cardsRef.current[page * quantityPerPage].offsetLeft, top: 0, behavior: "smooth" });
        }  
    }


    const fetchMoreData = () => {
        if (wrapperRef.current !== null && wrapperRef.current.scrollWidth - wrapperRef.current.scrollLeft - 100 < wrapperRef.current.clientWidth) {
            API(bookListData.length, bookListData.length + 8)
            .then((res: object[]) => {
                setBookListData((prev) => [...prev, ...res])
            })
        }
    }

    const onScrollHandler = useMemo(() => 
        throttle(() => {
            fetchMoreData()
        }, 300),
    [bookListData, setBookListData]);

    useEffect(() => {
        fetchMoreData()
    }, [])



    const renderCards = bookListData.map((el, idx) => {
        return (
            <div ref={(el) => (cardsRef.current[idx] = el)} css={cardWrapperCSS({padding: cardLayout.padding})}>
                <BookCard bookData={el} showPlatform={true} {...cardLayout}/>
            </div>
        )
    })


    return (
        <div css={carouselWrapper}>
            <div css={prevBtn} onClick={prevBtnClickHandler}>〈</div>
            <div css={nextBtn} onClick={nextBtnClickHandler}>〉</div>
            <div ref={wrapperRef} css={carousel} onWheel={onScrollHandler} onTouchMove={onScrollHandler}>
                {renderCards}
            </div>

        </div>
    )
}

export default ScrollableCarousel


const cardWrapperCSS = ({padding}:{padding: string}) => {
    return css`
        padding-left: ${padding};
        padding-right: ${padding};
    `
}

const carouselWrapper = css`
    width: 100%;
    position: relative;
`

const carousel = css`
    display: flex;
    width: 100%;
    padding-left: 48px;
    box-sizing: border-box;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }

`

const prevBtn = css`
    z-index: 10;
    position: absolute;
    left: 0;
    height: 100%;
    display:flex;
    align-items: center;
    font-size: 48px;
    font-weight: 700;
    color: white;
    padding-left:8px;
    padding-right:8px;
    background: linear-gradient( to right, rgba(0,0,0,0.3), rgba(0,0,0,0));
    transition-property: background font-size;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
        background: linear-gradient( to right, rgba(0,0,0,0.4), rgba(0,0,0,0));
        font-size: 54px;
    }

    @media (max-width: 480px) {
        display: none;
    }
`

const nextBtn = css`
    z-index: 10;
    position: absolute;
    right: 0;
    height: 100%;
    display:flex;
    align-items: center;
    font-size: 48px;
    font-weight: 700;
    color: white;
    padding-left:8px;
    padding-right:8px;
    background: linear-gradient( to left, rgba(0,0,0,0.3), rgba(0,0,0,0));
    transition-property: background font-size;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
        background: linear-gradient( to left, rgba(0,0,0,0.4), rgba(0,0,0,0));
        font-size: 54px;
    }

    @media (max-width: 480px) {
        display: none;
    }
`

