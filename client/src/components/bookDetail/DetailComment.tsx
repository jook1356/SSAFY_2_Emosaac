/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

const DetailComment = (props: any) => {

    return (
        <div css={modalWrapperCSS}>
            frefgsegegfsd
            <button onClick={props.modalHandler}>닫기</button>
        </div>
    )
}

const modalWrapperCSS = css`
    width: 60vw;
    height: 90vh;
    background-color: var(--back-color);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 36px;
`

export default DetailComment