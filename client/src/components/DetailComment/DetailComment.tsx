/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { postComment } from "@/api/comment/postComment";
import { useRef, useEffect, useState } from "react";
import DetailCommentInput from "./DetailCommentInput";
import { returnCommentArrayType } from "@/types/comments";
import { getParentComments } from "@/api/comment/getParentComments";
import DetailCommentView from "./DetailCommentView";

interface DetailCommentProps {
  bookId: number;
  modalHandler?: any;
}

const DetailComment = ({ bookId, modalHandler }: DetailCommentProps) => {
  const commentsWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={commentsWrapperRef} css={modalWrapperCSS}>
      <button onClick={modalHandler}>닫기</button>
      <DetailCommentView
        bookId={bookId}
        parentId={null}
        position={0}
        criteria={"date"}
        commentsWrapperRef={commentsWrapperRef}
      />
    </div>
  );
};

const modalWrapperCSS = css`
  width: 60vw;
  height: 90vh;
  background-color: var(--back-color);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  /* border-radius: 20px; */
  padding: 36px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
`;

export default DetailComment;
