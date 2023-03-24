"use strict";
exports.id = 701;
exports.ids = [701];
exports.modules = {

/***/ 5977:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ getListByContent),
/* harmony export */   "n": () => (/* binding */ getListByTagName)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getListByContent(type, content, prevId, prevScore, size) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .E.get(`/search/title/${type}/${content}?prevId=${prevId}&prevScore=${prevScore}&size=${size}`);
        if (data.status === 200) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
async function getListByTagName(type, tagName, prevId, prevScore, size) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .E.get(`/search/tag/${type}/${tagName}?prevId=${prevId}&prevScore=${prevScore}&size=${size}`);
        if (data.status === 200) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ BookCardSearch)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-icons/bs"
var bs_ = __webpack_require__(567);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/components/bookCardModal/BookCardModalSearch.tsx
/** @jsxImportSource @emotion/react */ 




const BookCardModal = ({ modalToggler , isMouseOn , setModalToggler , bookData , parentRef , imgHeight , imgMinHeight  })=>{
    const wrapperRef = (0,external_react_.useRef)(null);
    const [contentToggler, setContentToggler] = (0,external_react_.useState)(false);
    const [isOpened, setisOpened] = (0,external_react_.useState)(false);
    const [isClosing, setIsClosing] = (0,external_react_.useState)(false);
    const router = (0,router_.useRouter)();
    const modalLayout = {
        widthValue: 450,
        heightValue: 500
    };
    (0,external_react_.useEffect)(()=>{
        if (isMouseOn === true && modalToggler === true) {
            setContentToggler(()=>true);
            setisOpened(()=>true);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        window.addEventListener("wheel", onWheelHandler);
        return ()=>{
            window.removeEventListener("wheel", onWheelHandler);
        };
    }, []);
    const modalHandler = ()=>{
        if (isMouseOn === true && contentToggler === true) {
            setTimeout(function() {
                if (wrapperRef.current !== null) {
                    wrapperRef.current.style.opacity = "0";
                }
            }, 100);
            setTimeout(function() {
                setModalToggler(()=>false);
            }, 500);
        } else {
            setModalToggler(()=>false);
        }
        setContentToggler(()=>false);
        setIsClosing(()=>true);
    };
    const onWheelHandler = ()=>{
        if (wrapperRef.current !== null) {
            wrapperRef.current.style.width = parentRef.current.clientWidth + "px";
            wrapperRef.current.style.height = parentRef.current.clientHeight + "px";
            wrapperRef.current.style.left = parentRef.current.getBoundingClientRect().left + "px";
            setTimeout(function() {
                if (wrapperRef.current !== null) {
                    wrapperRef.current.style.top = parentRef.current.getBoundingClientRect().top + "px";
                    wrapperRef.current.style.opacity = "0";
                }
            }, 200);
        }
    };
    const onClickNavigateHandler = ()=>{
        router.push(`/books/${bookData.bookId}`);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        onMouseLeave: modalHandler,
        // onWheelCapture={onWheelHandler}
        ref: wrapperRef,
        css: wrapperCSS({
            modalToggler: contentToggler,
            parentRef: parentRef,
            wrapperRef: wrapperRef,
            widthValue: modalLayout.widthValue,
            heightValue: modalLayout.heightValue
        }),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            css: innerWrapperCSS({
                modalToggler: modalToggler,
                contentToggler: contentToggler,
                isOpened: isOpened
            }),
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: backgroundCSS({
                        imgUrl: bookData.thumbnail
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: imageWrapperCSS,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: bookData && bookData.thumbnail,
                        alt: bookData && bookData.title,
                        css: imageCSS({
                            modalToggler: contentToggler,
                            isClosing: isClosing,
                            imgHeight: imgHeight,
                            imgMinHeight: imgMinHeight
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: spaceDivCSS
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    css: contentDivCSS,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    css: titleCSS,
                                    children: bookData.title
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    css: dateCSS,
                                    children: bookData.regist
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            css: react_.css`
              display: flex;
              justify-content: space-between;
            `,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
                                /*#__PURE__*/ jsx_runtime_.jsx(bs_.BsFillArrowUpCircleFill, {
                                    css: icons,
                                    onClick: onClickNavigateHandler
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
const wrapperCSS = ({ modalToggler , parentRef , wrapperRef , widthValue , heightValue  })=>{
    const isLeftEdge = (widthValue - parentRef?.current?.clientWidth) / 2 >= parentRef?.current?.getBoundingClientRect().left;
    const isRightEdge = parentRef?.current?.getBoundingClientRect().left + (widthValue - (widthValue - parentRef?.current?.clientWidth) / 2) >= document.body.offsetWidth;
    const leftStandard = `left: ${modalToggler && isLeftEdge === true ? "42" : parentRef?.current?.getBoundingClientRect().left - (widthValue - parentRef?.current?.clientWidth) / 2}px;`; // parentRef?.current?.getBoundingClientRect().left
    const rightStandard = `left: ${modalToggler && isRightEdge === true ? document.body.offsetWidth - widthValue - 42 : parentRef?.current?.getBoundingClientRect().left}px`;
    const activated = isRightEdge === true ? rightStandard : leftStandard;
    return react_.css`
    position: absolute;
    z-index: 999999;
    transition-property: width height;
    will-change: width height left top opacity transform;
    transition-duration: 0.3s;
    /* transition-timing-function: ease-in; */
    overflow: hidden;

    top: ${modalToggler ? parentRef?.current?.getBoundingClientRect().top - (heightValue - parentRef?.current?.clientHeight) / 2 : parentRef?.current?.getBoundingClientRect().top}px;
    width: ${modalToggler ? `${widthValue}px` : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler ? `${heightValue}px` : `${parentRef?.current?.clientHeight}px`};
    ${modalToggler ? activated : `left: ${parentRef?.current?.getBoundingClientRect().left}px`};
    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */
    background-color: ${modalToggler ? react_.css`var(--back-color-2)` : `rgba(0,0,0,0)`};
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  `;
};
const innerWrapperCSS = ({ modalToggler , contentToggler , isOpened  })=>{
    return react_.css`
    opacity: ${contentToggler ? "255" : isOpened ? "255" : "0"};
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
};
const backgroundCSS = ({ imgUrl  })=>{
    return react_.css`
    width: 110%;
    position: absolute;
    left: -5%;
    top: -5%;
    height: 350px;
    background: no-repeat url("${imgUrl}") 0 / cover;
    filter: blur(10px);
    -webkit-filter: blur(10px);
    pointer-events: none;
    display: flex;
    justify-content: center;
  `;
};
const imageWrapperCSS = react_.css`
  width: 100%;
  height: 350px;
  position: absolute;
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0), var(--back-color-2));
  pointer-events: none;
`;
const imageCSS = ({ modalToggler , isClosing , imgHeight , imgMinHeight  })=>{
    return react_.css`
    will-change: width height transform;
    transition-property: width height opacity transform;
    transition-duration: 0.3s;
    ${modalToggler ? `transform: scale(1.0)` : isClosing ? `transform: scale(1.0)` : `transform: scale(1.1)`};
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${modalToggler ? "350px" : imgHeight};
    min-height: ${imgMinHeight};
  `;
};
const spaceDivCSS = react_.css`
  width: 100%;
  height: 350px;
`;
const contentDivCSS = react_.css`
  flex: 1 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const titleCSS = react_.css`
  font-size: 20px;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const dateCSS = react_.css`
  font-size: 13px;
  margin-top: 8px;
  color: var(--text-color-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const icons = react_.css`
  /* background-color: white; */
  color: var(--text-color-4);
  width: 52px;
  height: 52px;
`;
/* harmony default export */ const BookCardModalSearch = (BookCardModal);

// EXTERNAL MODULE: ./src/components/function/Portal.tsx
var Portal = __webpack_require__(363);
;// CONCATENATED MODULE: ./src/components/UI/BookCard/BookCardSearch.tsx
/** @jsxImportSource @emotion/react */ 




const BookCard = ({ bookData , showPlatform , width , height , minWidth , minHeight  })=>{
    const [user, setUser] = (0,external_react_.useState)(null);
    // let user: any = null;
    (0,external_react_.useEffect)(()=>{
        setUser(()=>navigator.userAgent);
    }, []);
    const isMobile = ()=>{
        let is_mobile = false;
        if (user !== undefined && user.length > 0 && user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 || user.indexOf("iPad") > -1 || user.indexOf("iPod") > -1) {
            is_mobile = true;
        }
        return is_mobile;
    };
    const wrapperRef = (0,external_react_.useRef)(null);
    const [modalToggler, setModalToggler] = (0,external_react_.useState)(false);
    const [isMouseOn, setIsMouseOn] = (0,external_react_.useState)(false);
    const platformBar = /*#__PURE__*/ jsx_runtime_.jsx("div", {
        css: platformBarCSS
    });
    const showModal = ()=>{
        setTimeout(function() {
            setModalToggler(()=>true);
        }, 500);
        setIsMouseOn(()=>true);
    };
    const hideModal = ()=>{
        setIsMouseOn(()=>false);
        setTimeout(function() {
            setModalToggler(()=>false);
        }, 500);
    };
    const instantlyRedirect = ()=>{
        if (user !== null && isMobile() === true) {
        // 모바일에서 Detail 페이지로 바로 이동
        }
    };
    const modal = /*#__PURE__*/ jsx_runtime_.jsx(Portal/* default */.Z, {
        selector: ".overlay-root",
        children: /*#__PURE__*/ jsx_runtime_.jsx(BookCardModalSearch, {
            modalToggler: modalToggler,
            isMouseOn: isMouseOn,
            setModalToggler: setModalToggler,
            bookData: bookData,
            parentRef: wrapperRef,
            imgHeight: height,
            imgMinHeight: minHeight
        })
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "bookcard-outer-wrapper",
        css: cardOuterWrapper({
            width,
            height,
            minWidth,
            minHeight
        }),
        ref: wrapperRef,
        onClick: instantlyRedirect,
        onMouseOver: (event)=>{
            event.stopPropagation();
            showModal();
        },
        onMouseLeave: hideModal,
        children: [
            user !== null && isMobile() === false && modalToggler && modal,
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "bookcard-inner-wrapper",
                css: cardInnerWrapperCSS({
                    width,
                    height,
                    minWidth,
                    minHeight
                }),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        css: skeletonLoadingTagCSS({
                            state: bookData !== "LOADING" ? true : false
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        className: "img",
                        src: bookData && bookData.thumbnail,
                        alt: bookData && bookData.title,
                        css: BookCardSearch_imageCSS
                    }),
                    showPlatform && bookData !== "LOADING" && platformBar
                ]
            })
        ]
    });
};
const cardOuterWrapper = ({ width , height , minWidth , minHeight  })=>{
    return react_.css`
    cursor: pointer;
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    overflow: hidden;
    border-radius: 10px;
  `;
};
const cardInnerWrapperCSS = ({ width , height , minWidth , minHeight  })=>{
    return react_.css`
    position: relative;
    /* width: ${width !== undefined ? width : "auto"}; */
    width: 100%;
    /* height: ${height !== undefined ? height : "100%"}; */
    height: 100%;
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
};
const platformBarCSS = react_.css`
  width: 100%;
  height: 3vw;
  min-height: 36px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  pointer-events: none;
`;
const BookCardSearch_imageCSS = react_.css`
  /* width: auto;
  height: 100%; */
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
  }
`;
const skeletonLoadingTagCSS = ({ state  })=>{
    return react_.css`
    position: absolute;
    width: 100%;
    height: 100%;
    transition-property: opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: rgb(200, 200, 200);
    position: absolute;
    opacity: ${state ? "0" : "255"};
    pointer-events: none;
  `;
};
/* harmony default export */ const BookCardSearch = (BookCard);


/***/ }),

/***/ 363:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);

const Portal = ({ children , selector  })=>{
    const element =  false && 0;
    return element && children ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_0___default().createPortal(children, element) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Portal);


/***/ }),

/***/ 1004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function batchim(name) {
    //name의 마지막 음절의 유니코드(UTF-16)
    const charCode = name.charCodeAt(name.length - 1);
    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
    const consonantCode = (charCode - 44032) % 28;
    if (consonantCode === 0) {
        //0이면 받침 없음 -> 가
        return "가";
    }
    //1이상이면 받침 있음 -> 이
    return "이";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (batchim);


/***/ })

};
;