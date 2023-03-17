/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

interface RowTitleProps {
    beforeLabel?: string;
    highlightedLabel?: string;
    afterLabel?: string;
    noLine?: true;
    marginBottom?: string;
}

const RowTitle = ({beforeLabel, highlightedLabel, afterLabel, noLine, marginBottom}: RowTitleProps) => {

    return (
        <div css={rowTitleWrapperCSS({marginBottom})}>
            {noLine !== true && <div css={lineCSS} />}
            <div css={labelWrapperCSS}>
                <span css={normalLabelCSS}>{beforeLabel}</span>
                <span css={highlightedLabelCSS}>{highlightedLabel}</span>
                <span css={normalLabelCSS}>{afterLabel}</span>
            </div>
            
        </div>
    )
}

interface rowTitleWrapperCSSProps {
    marginBottom: string | undefined;
}

const rowTitleWrapperCSS = ({marginBottom}: rowTitleWrapperCSSProps) => {

    return css`
        width: 100%;
        height: 36px;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: ${marginBottom !== undefined ? marginBottom : `24px`};
    `
}


const lineCSS = css`
    width: 100%;
    height: 1px;
    background-color: var(--border-color-2);
`

const labelWrapperCSS = css`
    position: absolute;
    background-color: var(--back-color);
    padding: 24px;
    left: 1%;
`

const normalLabelCSS = css`
    font-size: 28px;
    color: var(--text-color);
`

const highlightedLabelCSS = css`
    font-size: 36px;
    color: #FF6565;
`


export default RowTitle