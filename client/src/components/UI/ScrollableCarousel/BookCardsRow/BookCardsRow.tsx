/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import BookCard from "../../BookCard/BookCard";




interface Props {
    identifier: string;
    wrapperRef: any;
    curPage: number;
    maxPage: number;
    API: Function;
}



const BookCardsRow = ({identifier, wrapperRef, curPage, maxPage, API}: Props) => {
    const dummyCard = useRef<HTMLInputElement>(null)
    const [quantityPerPage, setQuantityPerPage] = useState<number>(0)
    const [bookListData, setBookListData] = useState<object[]>([])
    const [loadingTags, setLoadingTags] = useState<string[]>([])
    type BookListResult = string | object
    const [bookListResult, setBookListResult] = useState<BookListResult[]>([])

    const cardLayout = {
        widthValue: 150,
        widthUnit: 'px',
        heightValue: 220,
        heightUnit: 'px',
        minWidthValue: 150,
        minWidthUnit: 'px',
        minHeightValue: 100,
        minHeightUnit: 'px',
        marginValue: 10,
        marginUnit: 'px',
        
    }

    const setLoadingHandler = (quantity: number) => {
        setLoadingTags(() => Array(quantity).fill('LOADING'))
    }
    

    useEffect(() => {
        if (dummyCard.current !== null) {
            const calc = Math.ceil(wrapperRef.current.clientWidth / dummyCard.current.clientWidth) - 1
            setQuantityPerPage(() => calc)
            setLoadingHandler(calc)
            setBookListResult(() => [...bookListData, ...loadingTags])
        }
    }, [wrapperRef?.current?.clientWidth, dummyCard])



    useEffect(() => {
        API(0, quantityPerPage)
        .then((res:object[]) => {
            setBookListData(() => res)
            setBookListResult(() => [...res, ...loadingTags])
        })
    }, [quantityPerPage !== 0 && loadingTags.length !== 0])

    

    useEffect(() => {
        if (maxPage - curPage <= 2) {
            API(bookListData.length, bookListData.length + quantityPerPage)
            .then((res:object[]) => {
                setBookListData(() => [...bookListData, ...res])
                setBookListResult(() => [...bookListData, ...res, ...loadingTags])
            })
        }
    }, [curPage, maxPage])

    const bookCards = bookListResult.map((el, idx) => {
        return (
            <div css={cardWrapperCSS({margin: `${cardLayout.marginValue}${cardLayout.marginUnit}`})}>
                <BookCard key={`${identifier}-${idx}`} bookData={el} showPlatform={true} width={`${cardLayout.widthValue}${cardLayout.widthUnit}`} height={`${cardLayout.heightValue}${cardLayout.heightUnit}`} minWidth={`${cardLayout.minWidthValue}${cardLayout.minWidthUnit}`} minHeight={`${cardLayout.minHeightValue}${cardLayout.minHeightUnit}`}/>
            </div>
        )
    })

    const initLoading = loadingTags.map((el, idx) => {
        return (
            <div css={cardWrapperCSS({margin: `${cardLayout.marginValue}${cardLayout.marginUnit}`})}>
                <BookCard key={`${identifier}-${idx}`} bookData={el} showPlatform={true} width={`${cardLayout.widthValue}${cardLayout.widthUnit}`} height={`${cardLayout.heightValue}${cardLayout.heightUnit}`} minWidth={`${cardLayout.minWidthValue}${cardLayout.minWidthUnit}`} minHeight={`${cardLayout.minHeightValue}${cardLayout.minHeightUnit}`}/>
            </div>
        )
    })

    return (
        <div css={rowWrapperCSS}>
            <div ref={dummyCard} css={dummyCardCSS({width: `${cardLayout.widthValue}${cardLayout.widthUnit}`, height: `${cardLayout.heightValue}${cardLayout.heightUnit}`, minWidth: `${cardLayout.minWidthValue}${cardLayout.minWidthUnit}`, minHeight: `${cardLayout.minHeightValue}${cardLayout.minHeightUnit}`, padding: `${cardLayout.marginValue}${cardLayout.marginUnit}`}) }>
                {/* {quantityPerPage},
                {wrapperRef.current && wrapperRef.current.clientWidth} */}
            </div>
            {bookListResult.length === 0 ? initLoading : bookCards}

            
        </div>
    )
}


const rowWrapperCSS = css`
    display: flex;
`

interface cardWrapperCSSProps {
    margin: string;
}

const cardWrapperCSS = ({margin}: cardWrapperCSSProps) => {
    return css`
        margin-left: ${margin};
        margin-right: ${margin};
    `
}

interface dummyCardCSSProps {
    width: string;
    height: string;
    minWidth: string;
    minHeight: string;
    padding: string
}

const dummyCardCSS = ({width, height, minWidth, minHeight, padding}: dummyCardCSSProps) => {
    return css`
        width: ${width};
        height: ${height};
        min-width: ${minWidth};
        min-width: ${minHeight};
        position: absolute;
        pointer-events: none;
        padding-left: ${padding};
        padding-right: ${padding};
    `
}


export default BookCardsRow