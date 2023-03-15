/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react"
import ReactDOM from 'react-dom'




interface BookCardModalProps {
    modalToggler: boolean;
    setModalToggler: Function;
    bookData: any;
    parentRef: React.ForwardedRef<HTMLDivElement>;
}

const BookCardModal = ({modalToggler, setModalToggler, bookData, parentRef}: BookCardModalProps) => {
    const wrapperRef = useRef<HTMLInputElement>(null);
    const [contentToggler, setContentToggler] = useState<boolean>(false)

    const modalLayout = {
        widthValue: 500,
        heightValue: 500,
    }

    useEffect(() => {
        if (modalToggler === true) {
            setTimeout(function() { 
                setContentToggler(() => true)
            }, 300);
        }
    }, [modalToggler])


    const modalHandler = () => {
        if (contentToggler === true) {
            setTimeout(function() { 
                setModalToggler(() => false)
            }, 300);
        } else {
            setModalToggler(() => false)
        }
        

        setContentToggler(() => false)
        
    }



    return (
        <div ref={wrapperRef} css={wrapperCSS({modalToggler: contentToggler, parentRef: parentRef, wrapperRef: wrapperRef, widthValue: modalLayout.widthValue, heightValue: modalLayout.heightValue})} onMouseLeave={modalHandler}>
            {bookData.title}
        </div>
    )
}

interface wrapperCSSProps {
    modalToggler: boolean;
    parentRef: any;
    wrapperRef: any;
    widthValue: number;
    heightValue: number;
}

const wrapperCSS = ({modalToggler, parentRef, wrapperRef, widthValue, heightValue}: wrapperCSSProps) => {
    const isLeftEdge = widthValue - parentRef?.current?.clientWidth >= parentRef?.current?.getBoundingClientRect().left
    const isRightEdge = parentRef?.current?.getBoundingClientRect().left + (widthValue / 2) >= document.body.offsetWidth
    const leftStandard = `left: ${modalToggler && isLeftEdge === false ? parentRef?.current?.getBoundingClientRect().left - (parentRef?.current?.clientWidth / 2) : parentRef?.current?.getBoundingClientRect().left}px;`
    const rightStandard = `right: ${document.body.offsetWidth - (parentRef?.current?.getBoundingClientRect().left + parentRef?.current?.clientWidth)}`
    return css`
        position: absolute;
        z-index: 9999;
        transition-property: width height ;
        transition-duration: 0.3s;
        
        top: ${modalToggler ? parentRef?.current?.getBoundingClientRect().top - ((heightValue - parentRef?.current?.clientHeight) / 2) : parentRef?.current?.getBoundingClientRect().top}px;
        width: ${modalToggler ? `${widthValue}px` : `${parentRef?.current?.clientWidth}px`};
        height: ${modalToggler ? `${heightValue}px` : `${parentRef?.current?.clientHeight}px`};
        opacity: ${modalToggler ? '255' : '0'};
        ${isRightEdge === true ? rightStandard : leftStandard};

        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    `
}



export default BookCardModal