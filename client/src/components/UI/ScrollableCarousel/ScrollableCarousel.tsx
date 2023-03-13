/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

import { useRef, useState, useEffect } from "react";

import Test from "./Test";

const ScrollableCarousel = () => {
    const wrapperRef = useRef<HTMLInputElement>(null)

    const nextBtnClickHandler = () => {
        if (wrapperRef.current !== null) {
            const page = Math.floor((wrapperRef.current.scrollLeft + 1) / wrapperRef.current.clientWidth)
            wrapperRef.current.scrollTo({ left: wrapperRef.current.clientWidth * (page + 1) + 1, top: 0, behavior: "smooth" });
        }  
    }

    const prevBtnClickHandler = () => {
        if (wrapperRef.current !== null) {
            const page = Math.ceil((wrapperRef.current.scrollLeft - 1) / wrapperRef.current.clientWidth)
            wrapperRef.current.scrollTo({ left: wrapperRef.current.clientWidth * (page - 1) + 1, top: 0, behavior: "smooth" });
        }  
    }

    return (
        <div css={carouselWrapper}>
            <div css={prevBtn} onClick={prevBtnClickHandler}>〈</div>
            <div css={nextBtn} onClick={nextBtnClickHandler}>〉</div>
            <div ref={wrapperRef} css={carousel}>
                <Test/>
            </div>
        </div>
    )
}

export default ScrollableCarousel

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

