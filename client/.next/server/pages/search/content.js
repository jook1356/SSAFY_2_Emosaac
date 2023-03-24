"use strict";
(() => {
var exports = {};
exports.id = 902;
exports.ids = [902];
exports.modules = {

/***/ 3337:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _api_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5977);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4932);
/* harmony import */ var _components_UI_BookCard_BookCardSearch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7501);
/* harmony import */ var _components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1017);
/* harmony import */ var _components_search_batchim__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1004);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_search__WEBPACK_IMPORTED_MODULE_4__]);
_api_search__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 








const content = ({ type , content , data  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__/* .useIsResponsive */ .j)();
    const [typeList, setTypeList] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([
        false,
        false,
        false
    ]);
    const josa = (0,_components_search_batchim__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(content);
    function onClickType(type) {
        switch(type){
            case "total":
                setTypeList([
                    true,
                    false,
                    false
                ]);
                break;
            case "webtoon":
                setTypeList([
                    false,
                    true,
                    false
                ]);
                break;
            default:
                setTypeList([
                    false,
                    false,
                    true
                ]);
        }
        router.push({
            pathname: `/search/content`,
            query: {
                type: type,
                query: content
            }
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        switch(type){
            case "total":
                setTypeList([
                    true,
                    false,
                    false
                ]);
                break;
            case "webtoon":
                setTypeList([
                    false,
                    true,
                    false
                ]);
                break;
            default:
                setTypeList([
                    false,
                    false,
                    true
                ]);
        }
    }, []);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                css: [
                    innerPaddingCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    }),
                    headline2CSS
                ],
                children: "검색 결과"
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: [
                    innerPaddingCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    }),
                    searchResCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    })
                ],
                children: [
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: searchContentCSS,
                        children: [
                            '"',
                            content,
                            '"',
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                css: josaCSS,
                                children: [
                                    josa,
                                    " 포함된 컨텐츠"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: toggleWrapCSS,
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                text: "전체",
                                isClicked: typeList[0],
                                onClick: ()=>onClickType("total")
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                text: "웹툰",
                                isClicked: typeList[1],
                                onClick: ()=>onClickType("webtoon")
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                text: "웹소설",
                                isClicked: typeList[2],
                                onClick: ()=>onClickType("novel")
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: innerCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: booksWrapCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    }),
                    children: data.map((book)=>/*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_BookCard_BookCardSearch__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            bookData: book,
                            showPlatform: false,
                            width: "100%",
                            height: "100%"
                        }, book.bookId))
                })
            })
        ]
    });
};
const headline2CSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  padding-top: 40px;
  font-weight: bold;
`;
const innerCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "margin: 20px 105px"}
    ${isTablet && "margin: 20px 50px"}
    ${isMobile && "margin: 20px 20px"}
  `;
};
const innerPaddingCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "padding: 20px 105px"}
    ${isTablet && "padding: 20px 50px"}
    ${isMobile && "padding: 20px 20px"}
  `;
};
const searchResCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${!isMobile && "display: flex; justify-content: space-between; align-items: center;"}
    ${isMobile && "display: block;"}
    font-size: 34px;
    background-color: var(--back-color-2);
    padding-top: 20px;
    padding-bottom: 20px;
  `;
};
const searchContentCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  height: 70px;
  display: flex;
  align-items: center;
`;
const josaCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 20px;
`;
const toggleWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  & > button {
    margin-left: 8px;
  }
`;
const booksWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    padding-top: 20px;
    display: grid;
    ${isMobile && "grid-template-columns: repeat(3, 1fr);"}
    ${!isMobile && "grid-template-columns: repeat(5, 1fr);"}
    column-gap: 20px;
    row-gap: 30px;
  `;
};
const getServerSideProps = async (context)=>{
    const type = context.query.type;
    const content = context.query.query;
    const [prevId, prevScore, size] = [
        20493,
        10,
        14
    ];
    if (typeof type == "string" && typeof content == "string") {
        const data = await (0,_api_search__WEBPACK_IMPORTED_MODULE_4__/* .getListByContent */ .R)(type, content, prevId, prevScore, size).then((res)=>{
            return res;
        });
        return await {
            props: {
                type,
                content,
                data
            }
        };
    } else {
        return {
            props: {}
        };
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (content);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2805:
/***/ ((module) => {

module.exports = require("@emotion/react");

/***/ }),

/***/ 5193:
/***/ ((module) => {

module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 567:
/***/ ((module) => {

module.exports = require("react-icons/bs");

/***/ }),

/***/ 6666:
/***/ ((module) => {

module.exports = require("react-responsive");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [932,394,17,701], () => (__webpack_exec__(3337)));
module.exports = __webpack_exports__;

})();