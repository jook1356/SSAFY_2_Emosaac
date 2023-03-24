(() => {
var exports = {};
exports.id = 672;
exports.ids = [672];
exports.modules = {

/***/ 5578:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "SwipeableGallery_wrapper__6sK2n",
	"moveable": "SwipeableGallery_moveable__T49jy",
	"content": "SwipeableGallery_content__TGBBn"
};


/***/ }),

/***/ 4105:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ getBooksByGenre)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getBooksByGenre({ genreCode , typeCode , prevId , prevScore , size  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .E.get(`/books/genre/${genreCode}?typeCode=${typeCode}${prevId !== undefined ? `&prevId=${prevId}` : ""}${prevScore !== undefined ? `&prevScore=${prevScore}` : ""}${size !== undefined ? `&size=${size}` : ""}`);
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ BookCard_BookCard)
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
;// CONCATENATED MODULE: ./src/components/bookCardModal/BookCardModal.tsx
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
                            css: react_.css`display:flex; justify-content:space-between;`,
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
/* harmony default export */ const bookCardModal_BookCardModal = (BookCardModal);

// EXTERNAL MODULE: ./src/components/function/Portal.tsx
var Portal = __webpack_require__(363);
;// CONCATENATED MODULE: ./src/components/UI/BookCard/BookCard.tsx
/** @jsxImportSource @emotion/react */ 





const BookCard = ({ bookData , showPlatform , width , height , minWidth , minHeight  })=>{
    const [user, setUser] = (0,external_react_.useState)(null);
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
    const router = (0,router_.useRouter)();
    const wrapperRef = (0,external_react_.useRef)(null);
    const [modalToggler, setModalToggler] = (0,external_react_.useState)(false);
    const [isMouseOn, setIsMouseOn] = (0,external_react_.useState)(false);
    const platformBar = /*#__PURE__*/ jsx_runtime_.jsx("div", {
        css: platformBarCSS
    });
    const showModal = ()=>{
        setTimeout(function() {
            setModalToggler(()=>true);
        }, 400);
        setIsMouseOn(()=>true);
    };
    const hideModal = ()=>{
        setIsMouseOn(()=>false);
        setTimeout(function() {
            setModalToggler(()=>false);
        }, 500);
    };
    const instantlyRedirect = ()=>{
        if (isMobile() === true) {
            // 모바일에서 Detail 페이지로 바로 이동
            router.push(`/books/${bookData.bookId}`);
        }
    };
    const modal = /*#__PURE__*/ jsx_runtime_.jsx(Portal/* default */.Z, {
        selector: ".overlay-root",
        children: /*#__PURE__*/ jsx_runtime_.jsx(bookCardModal_BookCardModal, {
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
                        css: BookCard_imageCSS
                    }),
                    showPlatform && bookData !== "LOADING" && platformBar
                ]
            })
        ]
    });
};
const cardOuterWrapper = ({ width , height , minWidth , minHeight  })=>{
    return react_.css`
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
  `;
};
const cardInnerWrapperCSS = ({ width , height , minWidth , minHeight  })=>{
    return react_.css`
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
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
const BookCard_imageCSS = react_.css`
  width: auto;
  height: 100%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;
const skeletonLoadingTagCSS = ({ state  })=>{
    return react_.css`
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
/* harmony default export */ const BookCard_BookCard = (BookCard);


/***/ }),

/***/ 2131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4932);
/* harmony import */ var _BookCard_BookCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6878);
/** @jsxImportSource @emotion/react */ 




// import Test from "./Test";

const ScrollableCarousel = ({ API , identifier  })=>{
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const cardsRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)([]);
    const [bookListData, setBookListData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [bookListResult, setBookListResult] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [wrapperWidth, setWrapperWidth] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [standard, setStandard] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [quantityPerPage, setQuantityPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(10);
    const [loadingTag, setLoadingTag] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(Array(9).fill("LOADING"));
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_4__/* .useIsResponsive */ .j)();
    const cardLayout = {
        width: "10vw",
        height: "15vw",
        minWidth: "150px",
        minHeight: "225px",
        padding: "0.5vw"
    };
    const generatePage = (value)=>{
        if (wrapperRef.current !== null && wrapperRef.current.clientWidth !== wrapperWidth) {
            const width = wrapperRef.current.clientWidth;
            const quantity = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth);
            const newPage = Math.ceil(standard / quantity);
            setPage(()=>newPage);
            setWrapperWidth(()=>width);
            setQuantityPerPage(()=>quantity);
            return newPage + value;
        } else {
            return page + value;
        }
    };
    const nextBtnClickHandler = ()=>{
        if (wrapperRef.current !== null) {
            const quantity = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth);
            const nextStandard = generatePage(1) * quantity;
            const idx = nextStandard < cardsRef.current.length ? nextStandard : cardsRef.current.length - 1;
            if (nextStandard < cardsRef.current.length) {
                setPage((prev)=>prev + 1);
            }
            setStandard(()=>idx);
            wrapperRef.current.scrollTo({
                left: cardsRef.current[idx].offsetLeft,
                top: 0,
                behavior: "smooth"
            });
            fetchMoreData();
        }
    };
    const prevBtnClickHandler = ()=>{
        if (wrapperRef.current !== null) {
            const quantity = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth);
            const prevStandard = generatePage(-1) * quantity;
            const idx = prevStandard >= 0 ? prevStandard : 0;
            if (prevStandard >= 0) {
                setPage((prev)=>prev - 1);
            }
            setStandard(()=>idx);
            wrapperRef.current.scrollTo({
                left: cardsRef.current[idx].offsetLeft,
                top: 0,
                behavior: "smooth"
            });
        }
    };
    const fetchMoreData = ()=>{
        let standard = 0;
        if (wrapperRef.current !== null && cardsRef.current[0] !== null) {
            standard = Math.ceil(wrapperRef.current.scrollLeft / cardsRef.current[0]?.clientWidth);
        }
        if (wrapperRef.current !== null && wrapperRef.current.scrollWidth - wrapperRef.current.scrollLeft - 200 < wrapperRef.current.clientWidth || bookListData.length - loadingTag.length - standard <= loadingTag.length) {
            API({
                bookList: bookListData,
                size: bookListData.length + quantityPerPage + 1
            }).then((res)=>{
                console.log(res);
                setBookListData((prev)=>[
                        ...prev,
                        ...res.content
                    ]);
            });
        }
    };
    const onScrollHandler = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_3__.throttle)(()=>{
            if (wrapperRef.current !== null) {
                fetchMoreData();
                const standard = Math.ceil(wrapperRef.current.scrollLeft / cardsRef.current[0].clientWidth);
                setStandard(()=>standard);
            }
        }, 300), [
        bookListData,
        setBookListData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        fetchMoreData();
    }, []);
    const generateLoadingData = ()=>{
        setBookListResult(()=>[
                ...bookListData,
                ...loadingTag
            ]);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        generateLoadingData();
    }, [
        bookListData
    ]);
    const renderCards = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>bookListResult.map((el, idx)=>{
            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                ref: (el)=>cardsRef.current[idx] = el,
                css: cardWrapperCSS({
                    padding: cardLayout.padding
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    bookData: el,
                    showPlatform: true,
                    width: cardLayout.width,
                    height: cardLayout.height,
                    minWidth: cardLayout.minWidth,
                    minHeight: cardLayout.minHeight
                })
            }, `${identifier}-${idx}`);
        }), [
        bookListResult
    ]);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: carouselWrapper,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: [
                    indicatorBtn,
                    prevBtn({
                        isDeskTop,
                        isTablet,
                        isMobile
                    })
                ],
                onClick: prevBtnClickHandler,
                onMouseEnter: (event)=>{
                    event.stopPropagation();
                },
                children: "〈"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: [
                    indicatorBtn,
                    nextBtn({
                        isDeskTop,
                        isTablet,
                        isMobile
                    })
                ],
                onClick: nextBtnClickHandler,
                onMouseEnter: (event)=>{
                    event.stopPropagation();
                },
                children: "〉"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                ref: wrapperRef,
                css: carousel,
                onWheel: onScrollHandler,
                onTouchMove: onScrollHandler,
                children: renderCards
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollableCarousel);
const cardWrapperCSS = ({ padding  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    padding-left: ${padding};
    padding-right: ${padding};
  `;
};
const carouselWrapper = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  position: relative;
`;
const carousel = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  width: 100%;
  /* padding-left: 48px; */
  box-sizing: border-box;
  overflow-x: scroll;
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const indicatorBtn = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;

  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  color: var(--text-color);
  padding-left: 8px;
  padding-right: 8px;

  transition-property: background font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  @media (max-width: 480px) {
    display: none;
  }
`;
const prevBtn = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    left: 0;
    /* background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    transform: ${isDeskTop === true && `translate(-105px, 0px)` || isTablet === true && `translate(-50px, 0px)`};
    &:hover {
      /* background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};
const nextBtn = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    right: 0;
    /* background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    transform: ${isDeskTop === true && `translate(105px, 0px)` || isTablet === true && `translate(50px, 0px)`};
    &:hover {
      /* background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};


/***/ }),

/***/ 3169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8252);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_easy_swipe__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5578);
/* harmony import */ var _SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4932);
/** @jsxImportSource @emotion/react */ 





const SwipeableGallery = ({ parentRef , content  })=>{
    const movingDiv = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [positionx, setPositionx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [contentCount, setContentCount] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const [endSwipe, setEndSwipe] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const postData = content;
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_4__/* .useIsResponsive */ .j)();
    const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [height, setHeight] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setWidth(()=>parentRef.current.clientWidth);
        setHeight(()=>parentRef.current.clientHeight);
        const resize = ()=>{
            setWidth(()=>parentRef.current.clientWidth);
            setHeight(()=>parentRef.current.clientHeight);
            if (movingDiv.current !== null && parentRef.current.clientWidth) {
                movingDiv.current.style.transitionDuration = "0s";
                movingDiv.current.style.transform = `translateX(${-parentRef.current.clientWidth * (contentCount - 1)}px)`;
            }
        };
        window.addEventListener(`resize`, resize);
        return ()=>{
            window.removeEventListener(`resize`, resize);
        };
    }, [
        contentCount
    ]);
    const onSwipeMove = (position = {
        x: 0
    })=>{
        setEndSwipe(false);
        if (postData.content.length === 1) {
            return;
        }
        if (contentCount >= postData.content.length && positionx < 0 || contentCount === 1 && positionx > 0 || width !== null && Math.abs(positionx) > width) {
            return;
        }
        if (movingDiv.current !== null && width !== null && position.x !== null) {
            movingDiv.current.style.transitionDuration = "0s";
            movingDiv.current.style.transform = `translateX(${positionx + -width * (contentCount - 1)}px)`;
            const x = position.x;
            setPositionx(()=>x);
        }
    };
    const onSwipeEnd = ()=>{
        if (movingDiv.current !== null && width !== null) {
            movingDiv.current.style.transitionDuration = "0.3s";
            if (positionx < -50 && contentCount < postData.content.length) {
                setContentCount((prev)=>prev + 1);
                movingDiv.current.style.transform = `translateX(${-width * contentCount}px)`;
            }
            if (positionx > 50 && contentCount > -1) {
                setContentCount((prev)=>prev - 1);
                movingDiv.current.style.transform = `translateX(${-width * (contentCount - 2)}px)`;
            }
            if (Math.abs(positionx) <= 50) {
                movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`;
            }
        }
        setPositionx(()=>0);
        setEndSwipe(true);
    };
    const onClickNextBtn = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (movingDiv.current !== null && width !== null) {
            if (contentCount < postData.content.length) {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount((prev)=>prev + 1);
                movingDiv.current.style.transform = `translateX(${-width * contentCount}px)`;
            } else {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount(()=>1);
                movingDiv.current.style.transform = `translateX(0px)`;
            }
        }
    }, [
        contentCount,
        width
    ]);
    const onClickPrevBtn = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (movingDiv.current !== null && width !== null) {
            if (contentCount > 1) {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount((prev)=>prev - 1);
                movingDiv.current.style.transform = `translateX(${-width * (contentCount - 2)}px)`;
            } else {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount(()=>postData.content.length);
                movingDiv.current.style.transform = `translateX(${-width * (postData.content.length - 1)}px)`;
            }
        }
    }, [
        contentCount,
        width
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const autoSlide = setInterval(function() {
            onClickNextBtn();
        }, 10000);
        return ()=>{
            clearInterval(autoSlide);
        };
    }, [
        width,
        contentCount
    ]);
    //
    const indicator = postData.content.map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: indicatorCSS({
                idx,
                contentCount
            })
        });
    });
    const indicatorBtn = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: prevBtnCSS,
                onClick: onClickPrevBtn,
                children: "〈"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: nextBtnCSS,
                onClick: onClickNextBtn,
                children: "〉"
            })
        ]
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: outerWrapperCSS,
        children: [
            isMobile === false && indicatorBtn,
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: indicatorWrapperCSS,
                children: indicator
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_easy_swipe__WEBPACK_IMPORTED_MODULE_3___default()), {
                onSwipeStart: (event)=>{
                    event.stopPropagation();
                },
                onSwipeEnd: onSwipeEnd,
                onSwipeMove: onSwipeMove,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default().wrapper),
                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default().moveable),
                        ref: movingDiv,
                        children: postData.content.map((el)=>{
                            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default().content),
                                style: {
                                    width: width + "px"
                                },
                                children: el
                            }); //, height: height + 'px'
                        })
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwipeableGallery);
const outerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
`;
const prevBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
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
const nextBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
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
const indicatorWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  pointer-events: none;
  padding-bottom: 16px;
`;
const indicatorCSS = ({ idx , contentCount  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 30px;
    height: 2px;
    background-color: ${contentCount - 1 === idx ? "white" : "gray"};
    margin: 2px;
  `;
};


/***/ }),

/***/ 7364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6878);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8252);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_easy_swipe__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4932);
/** @jsxImportSource @emotion/react */ 





const HighlightedCarousel = ({ bookData , windowWrapperRef  })=>{
    const [bookDataList, setBookDataList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([
        ...bookData
    ]);
    const [currentIdx, setCurrentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const dummyNormalRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    // const wrapperRef = useRef<any>([]);
    const carouselWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const dummyHighlightedRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__/* .useIsResponsive */ .j)();
    const cardLayout = {
        widthValue: 13,
        heightValue: 19,
        highlightedWidthValue: 17,
        highlightedHeightValue: 25,
        spaceValue: 5,
        unit: "vw",
        // min 관련 값들의 단위는 px
        minWidthValue: 150,
        minHeightValue: 225,
        minHighlightedWidthValue: 210,
        minHighlightedHeightValue: 280,
        minSpaceValue: 24
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (bookDataList[0].title !== bookDataList[bookDataList.length - 5].title) {
            const temp = bookDataList.concat(bookDataList.slice(0, 5));
            setBookDataList(()=>temp);
        }
    // console.log(bookDataList);
    // console.log(temp);
    }, []);
    const prevBtnHandler = ()=>{
        if (currentIdx > 0) {
            setCurrentIdx((prev)=>prev - 1);
        } else {
            setCurrentIdx(()=>bookDataList.length - 6);
        }
    };
    const nextBtnHandler = ()=>{
        if (currentIdx < bookDataList.length - 6) {
            setCurrentIdx((prev)=>prev + 1);
        } else {
            setCurrentIdx(()=>0);
        }
    };
    const renderBooks = bookDataList.slice(currentIdx, currentIdx + 5).map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: imgWrapperCSS({
                idx,
                widthValue: cardLayout.widthValue,
                heightValue: cardLayout.heightValue,
                unit: cardLayout.unit,
                highlightedWidthValue: cardLayout.highlightedWidthValue,
                highlightedHeightValue: cardLayout.highlightedHeightValue,
                spaceValue: cardLayout.spaceValue,
                normalRef: dummyNormalRef,
                minWidthValue: cardLayout.minWidthValue,
                minHeightValue: cardLayout.minHeightValue,
                minHighlightedWidthValue: cardLayout.minHighlightedWidthValue,
                minHighlightedHeightValue: cardLayout.minHighlightedHeightValue,
                minSpaceValue: cardLayout.minSpaceValue
            }),
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                bookData: el,
                showPlatform: true
            })
        }, el.title);
    });
    const [positionx, setPositionx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const onSwipeMove = (position = {
        x: 0
    })=>{
        setPositionx(()=>position.x);
    };
    const onSwipeEnd = ()=>{
        console.log(positionx);
        if (positionx > 40) {
            prevBtnHandler();
        }
        if (positionx < -40) {
            nextBtnHandler();
        }
        setPositionx(()=>0);
    };
    const indicatorBtn = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: prevBtnCSS,
                onClick: prevBtnHandler,
                children: "〈"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: nextBtnCSS,
                onClick: nextBtnHandler,
                children: "〉"
            })
        ]
    });
    return(// <div css={carouselOuterWrapperCSS({highlightedHeightValue: cardLayout.highlightedHeightValue, unit: cardLayout.unit, minHighlightedHeightValue: cardLayout.minHighlightedHeightValue, highlightedRef: dummyHighlightedRef})}></div>
    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "carousel-outer-wrapper",
        css: carouselOuterWrapperCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: highlightedDecoratorCSS({
                    highlightedHeightValue: cardLayout.highlightedHeightValue,
                    minHighlightedHeightValue: cardLayout.minHighlightedHeightValue,
                    unit: cardLayout.unit,
                    highlightedRef: dummyHighlightedRef,
                    carouselWrapperRef: carouselWrapperRef
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_easy_swipe__WEBPACK_IMPORTED_MODULE_4___default()), {
                onSwipeStart: (event)=>{
                    event.stopPropagation();
                },
                // onSwipeEnd={onSwipeEnd}
                onSwipeMove: onSwipeMove,
                onSwipeEnd: onSwipeEnd,
                children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        isMobile === false && indicatorBtn,
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            ref: carouselWrapperRef,
                            className: "carousel-inner-wrapper",
                            css: carouselInnerWrapperCSS({
                                widthValue: cardLayout.widthValue,
                                unit: cardLayout.unit,
                                highlightedWidthValue: cardLayout.highlightedWidthValue,
                                minWidthValue: cardLayout.minWidthValue,
                                minHighlightedWidthValue: cardLayout.minHighlightedWidthValue,
                                spaceValue: cardLayout.spaceValue,
                                minSpaceValue: cardLayout.minSpaceValue,
                                normalRef: dummyNormalRef,
                                carouselWrapperRef: carouselWrapperRef,
                                windowWrapperRef: windowWrapperRef
                            }),
                            children: renderBooks
                        }),
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: dummyWrapper,
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "dummy-normal",
                                    ref: dummyNormalRef,
                                    css: dummyNormalCSS({
                                        widthValue: cardLayout.widthValue,
                                        heightValue: cardLayout.heightValue,
                                        unit: cardLayout.unit
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "dummy-highlighted",
                                    ref: dummyHighlightedRef,
                                    css: dummyHighlightedCSS({
                                        highlightedWidthValue: cardLayout.highlightedWidthValue,
                                        highlightedHeightValue: cardLayout.highlightedHeightValue,
                                        unit: cardLayout.unit
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "dummy-min-highlighted",
                                    css: dummyMinHighlightedCSS({
                                        minHighlightedHeightValue: cardLayout.minHighlightedHeightValue
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HighlightedCarousel);
// interface carouselOuterWrapperCSSProps {
//     highlightedHeightValue: number;
//     unit: string;
//     minHighlightedHeightValue: number;
//     highlightedRef: any;
// }
// const carouselOuterWrapperCSS = ({highlightedHeightValue, unit, minHighlightedHeightValue, highlightedRef}: carouselOuterWrapperCSSProps) => {
//     const calcHeight = highlightedRef?.current?.clientHeight < minHighlightedHeightValue ? minHighlightedHeightValue + 'px' : highlightedHeightValue + unit
//     return css`
//         width: 100%;
//         height: ${calcHeight};
//         margin: 0 auto;
//         display:flex;
//         justify-content: center;
//     `
// }
const carouselOuterWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  margin: 0 auto;
  /* display:flex;
        justify-content: center; */
  display: grid;
  place-items: center;
  position: relative;
`;
const imgWrapperCSS = ({ idx , widthValue , heightValue , unit , highlightedWidthValue , highlightedHeightValue , spaceValue , normalRef , minWidthValue , minHeightValue , minHighlightedWidthValue , minHighlightedHeightValue , minSpaceValue  })=>{
    const calcWidth = normalRef?.current?.clientWidth < minWidthValue ? (idx === 2 ? minHighlightedWidthValue : minWidthValue) + "px" : (idx === 2 ? highlightedWidthValue : widthValue) + unit;
    const calcHeight = normalRef?.current?.clientHeight < minHeightValue ? (idx === 2 ? minHighlightedHeightValue : minHeightValue) + "px" : (idx === 2 ? highlightedHeightValue : heightValue) + unit;
    const calcLeft = normalRef?.current?.clientWidth < minWidthValue ? (idx > 2 ? idx * (minWidthValue + minSpaceValue) + (minHighlightedWidthValue - minWidthValue) : idx * (minWidthValue + minSpaceValue)) + "px" : (idx > 2 ? idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue) : idx * (widthValue + spaceValue)) + unit;
    const calcTop = normalRef?.current?.clientWidth < minWidthValue ? (idx !== 2 ? (minHighlightedHeightValue - minHeightValue) / 2 : 0) + "px" : (idx !== 2 ? (highlightedHeightValue - heightValue) / 2 : 0) + unit;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: left top width height;
    transition-duration: 0.3s;
    position: absolute;
    left: ${calcLeft};
    top: ${calcTop};
    /* left: ${(idx > 2 ? idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue) : idx * (widthValue + spaceValue)) + unit}; */
    /* top: ${(idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) + unit}; */
    width: ${calcWidth};
    height: ${calcHeight};
    visibility: ${idx < 5 ? "visible" : "hidden"};
    overflow: hidden;
  `;
};
// const imgWrapperCSS = ({idx, widthValue, heightValue, unit, highlightedWidthValue, highlightedHeightValue, spaceValue}: imgCSSProps) => {
//     return css`
//         transition-property: left top width height;
//         transition-duration: 0.3s;
//         position: absolute;
//         left: ${(idx > 2 ? (idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue)) : idx * (widthValue + spaceValue)) + unit};
//         top: ${(idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) + unit};
//         width: ${(idx === 2 ? highlightedWidthValue : widthValue) + unit};
//         height: ${(idx === 2 ? highlightedHeightValue : heightValue) + unit};
//         visibility: ${idx < 5 ? 'visible' : 'hidden'};
//         overflow: hidden;
//     `
// }
// interface imgCSSProps {
//     idx: number;
//     widthValue: number;
//     heightValue: number;
//     unit: string;
//     highlightedWidthValue: number;
//     highlightedHeightValue: number;
//     spaceValue: number;
//     normalRef: any;
//     highlightedRef: any;
//     minWidthValue: number;
//     minHeightValue: number;
//     minHighlightedWidthValue: number;
//     minHighlightedHeightValue: number;
//     minSpaceValue: number;
// }
// const imgCSS = ({idx, widthValue, unit, highlightedWidthValue, spaceValue}: imgCSSProps) => {
//     return css`
//         /* width: ${(idx === 2 ? highlightedWidthValue : widthValue) + unit};
//         height: auto; */
//         width: 100%;
//         height: auto;
//     `
// }
const imgCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: auto;
`;
const carouselInnerWrapperCSS = ({ widthValue , unit , highlightedWidthValue , spaceValue , minSpaceValue , minWidthValue , minHighlightedWidthValue , normalRef , carouselWrapperRef , windowWrapperRef  })=>{
    const calcWidth = normalRef?.current?.clientWidth < minWidthValue ? (minWidthValue + minSpaceValue) * 4 + minHighlightedWidthValue + "px" : (widthValue + spaceValue) * 4 + highlightedWidthValue + unit;
    const calcLeft = carouselWrapperRef?.current?.clientWidth > windowWrapperRef?.current?.offsetWidth ? -(carouselWrapperRef?.current?.clientWidth - windowWrapperRef?.current?.offsetWidth) / 2 + "px" : "0px";
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${calcWidth};
    left: ${calcLeft};
    position: relative;
    display: flex;
  `;
};
const dummyNormalCSS = ({ widthValue , heightValue , unit  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${widthValue + unit};
    height: ${heightValue + unit};
    pointer-events: none;
    /* display: none; */
  `;
};
const dummyHighlightedCSS = ({ highlightedWidthValue , highlightedHeightValue , unit  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${highlightedWidthValue + unit};
    height: ${highlightedHeightValue + unit};
    pointer-events: none;
    /* display: none; */
  `;
};
const prevBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--text-color);
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
const nextBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--text-color);
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
const highlightedDecoratorCSS = ({ highlightedHeightValue , minHighlightedHeightValue , unit , highlightedRef  })=>{
    const calcHeight = highlightedRef?.current?.clientHeight < minHighlightedHeightValue ? minHighlightedHeightValue + 48 + "px" : highlightedHeightValue + 5 + unit;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${calcHeight};
    height: ${calcHeight};
    background-color: var(--border-color-2);
    border-radius: 10000px;
    position: absolute;
  `;
};
const dummyMinHighlightedCSS = ({ minHighlightedHeightValue  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 1px;
    height: ${minHighlightedHeightValue}px;
    pointer-events: none;
  `;
};
const dummyWrapper = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  justify-content: center;
`;


/***/ }),

/***/ 8932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/** @jsxImportSource @emotion/react */ 

const RowTitle = ({ beforeLabel , highlightedLabel , afterLabel , noLine , marginBottom  })=>{
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: rowTitleWrapperCSS({
            marginBottom
        }),
        children: [
            noLine !== true && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: lineCSS
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: labelWrapperCSS,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        css: normalLabelCSS,
                        children: beforeLabel
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        css: highlightedLabelCSS,
                        children: highlightedLabel
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        css: normalLabelCSS,
                        children: afterLabel
                    })
                ]
            })
        ]
    });
};
const rowTitleWrapperCSS = ({ marginBottom  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
        width: 100%;
        height: 36px;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: ${marginBottom !== undefined ? marginBottom : `24px`};
    `;
};
const lineCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 1px;
    background-color: var(--border-color-2);
`;
const labelWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: absolute;
    background-color: var(--back-color);
    padding: 24px;
    left: 1%;
`;
const normalLabelCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    font-size: 28px;
    color: var(--text-color);
`;
const highlightedLabelCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    font-size: 36px;
    color: #FF6565;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RowTitle);


/***/ }),

/***/ 363:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 7790:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UI_ScrollableCarousel_ScrollableCarousel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2131);
/* harmony import */ var _components_UI_SwipeableCarousel_SwipeableGallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3169);
/* harmony import */ var _components_bookTab_HighlightedCarousel_HighlightedCarousel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7364);
/* harmony import */ var _components_bookTab_RowTitle_RowTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8932);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4932);
/* harmony import */ var _api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4105);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_8__]);
_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 







// import contentBannerDesktop from "/assets/content_banner_desktop_tablet.png"
// import contentBannerMobile from "/assets/content_banner_mobile.png"

function Home({ highlightedBookData  }) {
    const parentRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const indexWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_7__/* .useIsResponsive */ .j)();
    // ________________________________________________________________________________________________
    // 임시 데이터
    const postData = {
        content: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: "/assets/temp_banner_1.png",
                alt: "",
                css: bannerImage
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: "/assets/temp_banner_2.png",
                alt: "",
                css: bannerImage
            })
        ]
    };
    // const getBookData = recvBooks(0, 20).then((res: any) =>
    //   setBookData(() => res)
    // );
    const [bookData, setBookData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    // ________________________________________________________________________________________________
    const getBooksByGenreAPI = ({ bookList , size  })=>{
        const prevId = bookList.length ? bookList[bookList.length - 1].bookId : 0;
        const prevScore = bookList.length ? bookList[bookList.length - 1].score : 10;
        return (0,_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_8__/* .getBooksByGenre */ .f)({
            genreCode: 10,
            typeCode: 0,
            prevId: prevId,
            prevScore: prevScore,
            size: size
        });
    };
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: indexWrapperRef,
        css: indexWrapperCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: bannerWrapperCSS,
                ref: parentRef,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_SwipeableCarousel_SwipeableGallery__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    parentRef: parentRef,
                    content: postData
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: whiteSpace1CSS
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: innerLayoutWrapperCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_RowTitle_RowTitle__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    beforeLabel: "희MD",
                    highlightedLabel: " EMOSAAC!",
                    noLine: true,
                    marginBottom: "45px"
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: highlightedCarouselWrapper,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_HighlightedCarousel_HighlightedCarousel__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    bookData: highlightedBookData,
                    windowWrapperRef: indexWrapperRef
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: whiteSpace2CSS
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: innerLayoutWrapperCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_RowTitle_RowTitle__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        beforeLabel: "너만의",
                        highlightedLabel: " EMOSAAC!"
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: bookCarouselWrapperCSS,
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_ScrollableCarousel_ScrollableCarousel__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            API: getBooksByGenreAPI,
                            identifier: "test1"
                        })
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: whiteSpace1CSS
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: isMobile === true ? "/assets/content_banner_mobile.png" : "/assets/content_banner_desktop_tablet.png",
                alt: "",
                css: bannerImage
            })
        ]
    });
}
const getServerSideProps = async (context)=>{
    // 임시 API
    const data = await (0,_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_8__/* .getBooksByGenre */ .f)({
        genreCode: 11,
        typeCode: 0,
        prevId: 0,
        prevScore: 10,
        size: 20
    }).then((res)=>{
        if (res !== null) {
            return res.content;
        }
    }).catch((err)=>{
        console.log("pages/books/index.tsx => getBooksByGenre", err);
    });
    return await {
        props: {
            highlightedBookData: data
        }
    };
};
const indexWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const bannerImage = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: auto;
`;
const whiteSpace1CSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 5vw;
  min-height: 48px;
`;
const whiteSpace2CSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;
const bannerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  overflow: hidden;
`;
const highlightedCarouselWrapper = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const bookCarouselWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;
const innerLayoutWrapperCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    const whiteSpace = isDeskTop && 210 || isTablet && 100 || isMobile && 0;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2805:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react");

/***/ }),

/***/ 5193:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 6517:
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 8252:
/***/ ((module) => {

"use strict";
module.exports = require("react-easy-swipe");

/***/ }),

/***/ 567:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/bs");

/***/ }),

/***/ 6666:
/***/ ((module) => {

"use strict";
module.exports = require("react-responsive");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,394], () => (__webpack_exec__(7790)));
module.exports = __webpack_exports__;

})();