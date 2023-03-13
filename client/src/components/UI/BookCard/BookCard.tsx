/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";


interface BookData {
    title: string;
    img: string;
    platform: string
}

interface Props {
    bookData?: any;
    showPlatform: boolean;
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
}

const BookCard = ({bookData, showPlatform, width, height, minWidth, minHeight}: Props) => {

    const platformBar = (
        <div css={platformBarCSS}>

        </div>
    )



    return (
        <div>
            <div css={cardWrapperCSS({width, height, minWidth, minHeight})}>
                <div css={skeletonLoadingTagCSS({state: (bookData !== 'LOADING' ? true : false)})}/>
                <img src={bookData && bookData.img} alt={bookData && bookData.title} />
                {showPlatform && platformBar}
            </div>
        </div>
    )
}





interface CardWrapperProps {
    width: string | undefined;
    height: string | undefined;
    minWidth: string | undefined;
    minHeight: string | undefined;
}

const cardWrapperCSS = ({width, height, minWidth, minHeight}: CardWrapperProps) => {
    return css`
        width: ${width !== null ? width : '100px'};
        height: ${height !== null ? height : '200px'};
        ${minWidth && `min-width: ${minWidth}`};
        ${minHeight && `min-width: ${minHeight}`};
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        position: relative;
    `
}



const platformBarCSS = css`
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;
`

interface skeletonLoadingTagCSSProps {
    state: boolean
}

const skeletonLoadingTagCSS = ({state}: skeletonLoadingTagCSSProps) => {
    return css`
        width: 100%;
        height: 100%;
        transition-property: opacity;
        transition-duration: 0.3s;
        border-radius: 10px;
        background-color: rgb(200, 200, 200);
        position: absolute;
        opacity: ${state ? '0' : '255'};
    `
}





export default BookCard