/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useState, useRef, useEffect } from "react";
import Swipe from "react-easy-swipe";
import styles from "./SwipeableGallery.module.css";

const SwipeableGallery = ({ parentRef, content }: any) => {
  const movingDiv = useRef<HTMLInputElement>(null);
  const [positionx, setPositionx] = useState<number>(0);
  const [contentCount, setContentCount] = useState(1);
  const [endSwipe, setEndSwipe] = useState(false);
  const postData = content;

  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setWidth(() => parentRef.current.clientWidth);
    setHeight(() => parentRef.current.clientHeight);

    const resize = () => {
      setWidth(() => parentRef.current.clientWidth);
      setHeight(() => parentRef.current.clientHeight);
      if (movingDiv.current !== null && parentRef.current.clientWidth) {
        movingDiv.current.style.transitionDuration = "0s";
        movingDiv.current.style.transform = `translateX(${
          -parentRef.current.clientWidth * (contentCount - 1)
        }px)`;
      }
    };
    window.addEventListener(`resize`, resize);

    return () => {
      window.removeEventListener(`resize`, resize);
    };
  }, [contentCount]);

  const onSwipeMove = (position = { x: 0 }) => {
    setEndSwipe(false);
    if (postData.content.length === 1) {
      return;
    }

    if (
      (contentCount >= postData.content.length && positionx < 0) ||
      (contentCount === 1 && positionx > 0) ||
      (width !== null && Math.abs(positionx) > width)
    ) {
      return;
    }

    if (movingDiv.current !== null && width !== null && position.x !== null) {
      movingDiv.current.style.transitionDuration = "0s";
      movingDiv.current.style.transform = `translateX(${
        positionx + -width * (contentCount - 1)
      }px)`;
      const x = position.x;
      setPositionx(() => x);
    }
  };

  const onSwipeEnd = () => {
    if (movingDiv.current !== null && width !== null) {
      movingDiv.current.style.transitionDuration = "0.3s";

      if (positionx < -50 && contentCount < postData.content.length) {
        setContentCount((prev) => prev + 1);
        movingDiv.current.style.transform = `translateX(${
          -width * contentCount
        }px)`;
      }
      if (positionx > 50 && contentCount > -1) {
        setContentCount((prev) => prev - 1);
        movingDiv.current.style.transform = `translateX(${
          -width * (contentCount - 2)
        }px)`;
      }
      if (Math.abs(positionx) <= 50) {
        movingDiv.current.style.transform = `translateX(${
          -width * (contentCount - 1)
        }px)`;
      }
    }

    setPositionx(() => 0);
    setEndSwipe(true);
  };

  const onClickNextBtn = () => {
    if (
      movingDiv.current !== null &&
      width !== null &&
      contentCount < postData.content.length
    ) {
      movingDiv.current.style.transitionProperty = "transform";
      movingDiv.current.style.transitionDuration = "0.5s";
      setContentCount((prev) => prev + 1);
      movingDiv.current.style.transform = `translateX(${
        -width * contentCount
      }px)`;
    }
  };

  const onClickPrevBtn = () => {
    if (movingDiv.current !== null && width !== null && contentCount > 1) {
      movingDiv.current.style.transitionProperty = "transform";
      movingDiv.current.style.transitionDuration = "0.5s";
      setContentCount((prev) => prev - 1);
      movingDiv.current.style.transform = `translateX(${
        -width * (contentCount - 2)
      }px)`;
    }
  };

  return (
    <div css={outerWrapperCSS}>
      <div css={prevBtnCSS} onClick={onClickPrevBtn}>
        〈
      </div>
      <div css={nextBtnCSS} onClick={onClickNextBtn}>
        〉
      </div>
      <Swipe
        onSwipeStart={(event: any) => {
          event.stopPropagation();
        }}
        onSwipeEnd={onSwipeEnd}
        onSwipeMove={onSwipeMove}
      >
        <div className={styles.wrapper}>
          <div className={styles.moveable} ref={movingDiv}>
            {postData.content.map((el: any) => {
              return (
                <div className={styles.content} style={{ width: width + "px" }}>
                  {el}
                </div>
              ); //, height: height + 'px'
            })}
          </div>
        </div>
      </Swipe>

      {/* {positionx}
      {contentCount}
      {endSwipe.toString()} */}
    </div>
  );
};

export default SwipeableGallery;

const outerWrapperCSS = css`
  position: relative;
`;

const prevBtnCSS = css`
  z-index: 999;
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: white;
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;

const nextBtnCSS = css`
  z-index: 999;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: white;
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
