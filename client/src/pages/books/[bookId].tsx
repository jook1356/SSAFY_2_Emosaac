/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBookData } from "@/api/book";
import { useEffect } from 'react'
import { resolve } from "node:path/win32";
import { BiChevronRightCircle } from "react-icons/bi";
import Button from "@/components/UI/Button/Button";
import { BookmarkToggle, HasBeenReadToggle, CommentBtn } from "../../components/bookDetail/icons";
import TagList from "@/components/bookDetail/TagList";


type bookDataType = {
    "bookId": number,
    "platform": number,
    "thumbnail": string,
    "title": string,
    "author": string,
    "href": string,
    "story": string,
    "tag": string,
    "genre": string,
    "regist": string,
    "grade": string,
    "avgScore": number,
    "hit": number,
    "day": string,
    "bookmark": boolean,
    "read": boolean,
    "myScore": number
}

interface BookDetailProps {
    bookData: any;
}

const BookDetail = ({bookData}: BookDetailProps) => {

    useEffect(() => {
        console.log(bookData)
    }, [])

    return (
        <div>
            <div css={mainContentCSS}>

                
                <div css={backgroundWrapperCSS}>
                    <div css={blurredImgCSS({thumbnail: bookData.thumbnail})} />
                    <div css={verticalGradientCSS} />
                    <div css={horizontalGradientCSS} />
                    {/* <div css={blockCSS} /> */}
                </div>

                <div css={contentOuterWrapperCSS}>
                    <div css={contentInnerWrapperCSS}>
                        <div css={contentCSS}>

                            <div css={rowGridCSS}>
                                <div>
                                    <TagList tag={bookData.tag} />
                                    <div css={titleCSS}>
                                        {bookData.title}
                                    </div>
                                    <div css={scoreDivCSS}>
                                        평균 평점 : {bookData.avgScore}
                                        <BiChevronRightCircle css={scoreBtnCSS} />
                                    </div>
                                </div>
                                
                                <div css={bottomContentCSS}>
                                    <div css={iconFunctionCSS}>
                                        <CommentBtn bookId={bookData.bookId} />
                                        <BookmarkToggle bookId={bookData.bookId} isClicked={bookData.bookmark} />
                                        <HasBeenReadToggle bookId={bookData.bookId} isClicked={bookData.read} />
                                        
                                    </div>
                                    <div css={bookInfoWrapperCSS}>
                                        <div css={boldTextCSS}>
                                            {bookData.genre} · {new Date(bookData.regist).getFullYear()} &nbsp; &nbsp;
                                        </div>
                                        <div>{bookData.author}</div>
                                    </div>

                                    <div css={storyWrapperCSS}>
                                        {bookData.story}
                                    </div>
                                    
                                    <Button width={"50%"} height={"64px"}>보러가기</Button>
                                </div>
                                
                            </div>
                            
                            
                        </div>
                        <div css={thumbnailGridCSS}>
                            <img css={thumbnailCSS} src={bookData.thumbnail} />
                        </div>
                    </div>
                    
                    
                </div>
                </div>
        </div>
    )
}



// getServerSideProps는 async/await를 사용하여 API를 모두 받아올 때까지 대기하였다가 컴포넌트로 props를 넘겨주고, 이후 컴포넌트는 사전 생성 됩니다.
export const getServerSideProps = async (context: any) => {
    const params = await context.params
    const data = await getBookData(params.bookId)
    .then((res) => {
        return res
    })
    .catch((err) => {
        console.log('pages/books/[bookId].tsx => ', err)
    })

    return await {
        props: {
            bookData: data
        },
    }
}


const mainContentCSS = css`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`

const backgroundWrapperCSS = css`
    /* width: 100%;
    height: 100%; */

    position: relative;
`

interface blurredImgProps {
    thumbnail: string
}
const blurredImgCSS = ({thumbnail}: blurredImgProps) => {
    return css`
        background: no-repeat url("${thumbnail}") 0 / cover;
        filter: blur(10px);
        -webkit-filter: blur(20px);
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 3vh;
        width: 70vw;
        height: 120vh;
    `
}

const verticalGradientCSS = css`
    width: 100vw;
    height: 125vh;
    background: linear-gradient(rgba(0, 0, 0, 0) 0%, var(--back-color) 90%);
    position: absolute;
`

const horizontalGradientCSS = css`
    width: 100vw;
    height: 125vh;
    background: linear-gradient(to left, rgba(0, 0, 0, 0) 0%, var(--back-color) 60%);
    position: absolute;
`


const contentOuterWrapperCSS = css`
    width: 100vw;
    height: calc(100vh - 72px);
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding */

`

const contentInnerWrapperCSS = css`
    position: relative;
    display: grid;
	grid-template-columns: 50% 50%;
    /* background-color: red; */
    height: 80vh;
    width: 100vw;

`

const thumbnailGridCSS = css`
    width: 100%;
    /* height: calc(100vh - 72px); */
    display: flex;
    justify-content: center;
    
    align-items: center;
`

const thumbnailCSS = css`
    height: 80vh;
    width: auto;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
`

const contentCSS = css`
    width: 100%;
    height: 100%;
    padding-left: 10vw;
    
`

const rowGridCSS = css`
    display: grid;
	grid-template-rows: 50% 50%;
    height: 100%;
    /* background-color: red; */
`

const titleCSS = css`
    font-size: 72px;
    font-weight: 700;
    margin-bottom: 24px;
`

const scoreDivCSS = css`
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
`

const scoreBtnCSS = css`
    margin-left: 12px;
    width: 24px;
    height: 24px;
`

const bottomContentCSS = css`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
`

const iconFunctionCSS = css`
    display: flex;
`

const bookInfoWrapperCSS = css`
    display: flex;
    margin-bottom: 24px;
`

const boldTextCSS = css`
    font-weight: 700;
`

const storyWrapperCSS = css`
    /* width: 70%; */
    height: 50%;
`
export default BookDetail
