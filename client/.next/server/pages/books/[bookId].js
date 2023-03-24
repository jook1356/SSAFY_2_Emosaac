"use strict";
(() => {
var exports = {};
exports.id = 152;
exports.ids = [152];
exports.modules = {

/***/ 7546:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ getBookDetail)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// export async function getBookDetail(
//   bookId: number
// ): Promise<bookDataType | null> {
//   try {
//     const { data }: { data: bookDataResponse } = await defaultAxiosInstance.get(
//       `/books/${bookId}`
//     );
//     if (data.status === 200) {
//       return data.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//     throw error
//   }
// }

const getBookDetail = async (bookId)=>{
    return await (0,axios__WEBPACK_IMPORTED_MODULE_0__["default"])({
        method: "get",
        url: `${"http://j8d203.p.ssafy.io:8081/api"}/books/${bookId}`,
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc5MzU5MDQwLCJleHAiOjE2ODAyMjMwNDB9.5rJDelPFgBQRZclfOF5KE7teD-xIKTGyMkPEw7BQRJtETqM36wUqOaEnmNN12cIwz1drC9SOo03gLshlqGhuLw"
        }
    }).then((res)=>{
        return res.data.data;
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2043:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ deleteComment)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function deleteComment({ commentId  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance["delete"] */ .E["delete"](`/book/comments/${commentId}`);
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6252:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ getChildComments)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getChildComments({ parentId , criteria , offset , size  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .E.get(`/book/comments/child/${parentId}${criteria !== undefined ? `?criteria=${criteria}` : ""}${offset !== undefined ? `&offset=${offset}` : ""}${size !== undefined ? `&size=${size}` : ""}`);
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9613:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ getParentComments)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getParentComments({ bookId , criteria , offset , size  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .E.get(`/book/comments/parent/${bookId}${criteria !== undefined ? `?criteria=${criteria}` : ""}${offset !== undefined ? `&offset=${offset}` : ""}${size !== undefined ? `&size=${size}` : ""}`);
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 427:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": () => (/* binding */ postComment)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function postComment({ bookId , content , parentId  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.post */ .E.post(`/book/comments/${bookId}`, {
            content,
            parentId
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4565:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ putComment)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function putComment({ commentId , content  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.put */ .E.put(`/book/comments/${commentId}`, {
            content
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4636:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ putLikeComment)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function putLikeComment({ commentId  }) {
    try {
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.put */ .E.put(`/book/comments/like/${commentId}`);
        return data.data;
    } catch (error) {
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6490:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DetailCommentView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2571);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_DetailCommentView__WEBPACK_IMPORTED_MODULE_3__]);
_DetailCommentView__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 



const DetailComment = ({ bookId , modalHandler  })=>{
    const commentsWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: commentsWrapperRef,
        css: modalWrapperCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: modalHandler,
                children: "닫기"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DetailCommentView__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                bookId: bookId,
                parentId: null,
                position: 0,
                criteria: "date",
                commentsWrapperRef: commentsWrapperRef
            })
        ]
    });
};
const modalWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailComment);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9813:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_comment_postComment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(427);
/* harmony import */ var _api_comment_putComment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4565);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_comment_postComment__WEBPACK_IMPORTED_MODULE_2__, _api_comment_putComment__WEBPACK_IMPORTED_MODULE_3__]);
([_api_comment_postComment__WEBPACK_IMPORTED_MODULE_2__, _api_comment_putComment__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 




const DetailCommentInput = ({ action , bookId , parentId , defaultValue , commentId , refreshCommentsHandler  })=>{
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
    const commentHandler = ()=>{
        if (inputRef.current && inputRef.current.value.trim() !== "") {
            if (action === "post") {
                (0,_api_comment_postComment__WEBPACK_IMPORTED_MODULE_2__/* .postComment */ .w)({
                    bookId: bookId,
                    content: inputRef.current.value,
                    parentId: parentId
                }).then(()=>{
                    refreshCommentsHandler();
                    if (inputRef.current) {
                        inputRef.current.value = "";
                    }
                });
            } else if (action === "put" && commentId !== undefined) {
                (0,_api_comment_putComment__WEBPACK_IMPORTED_MODULE_3__/* .putComment */ ._)({
                    commentId: commentId,
                    content: inputRef.current.value
                }).then(()=>{
                    refreshCommentsHandler();
                    if (inputRef.current) {
                        inputRef.current.value = "";
                    }
                });
            }
        }
    };
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: inputWrapperCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                css: inputCSS,
                ref: inputRef,
                placeholder: `댓글을 입력해 주세요. ${parentId}`,
                defaultValue: defaultValue ? defaultValue : ``
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                onClick: commentHandler,
                css: confirmBtnCSS,
                children: "작성"
            })
        ]
    });
};
const inputCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 48px;
    border-radius: 10px 0px 0px 10px;
    border: none;
    padding: 16px;
    background-color: var(--back-color-2);
    &:focus {outline: none;};
`;
const confirmBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    background-color: var(--back-color-2);
    width: 96px;
    height: 48px;
    display: flex;
    border-radius: 0px 10px 10px 0px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition-property: background-color;
    transition-duration: 0.3s;

    &:hover {
        background-color: var(--back-color-3);
    }
`;
const inputWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailCommentInput);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2571:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_comment_getParentComments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9613);
/* harmony import */ var _api_comment_getChildComments__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6252);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DetailCommentInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9813);
/* harmony import */ var _DetailCommentViewElement__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3861);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_comment_getParentComments__WEBPACK_IMPORTED_MODULE_3__, _api_comment_getChildComments__WEBPACK_IMPORTED_MODULE_4__, _DetailCommentInput__WEBPACK_IMPORTED_MODULE_6__, _DetailCommentViewElement__WEBPACK_IMPORTED_MODULE_7__]);
([_api_comment_getParentComments__WEBPACK_IMPORTED_MODULE_3__, _api_comment_getChildComments__WEBPACK_IMPORTED_MODULE_4__, _DetailCommentInput__WEBPACK_IMPORTED_MODULE_6__, _DetailCommentViewElement__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 







var Position;
(function(Position) {
    Position[Position["PARENTS"] = 0] = "PARENTS";
    Position[Position["CHILDREN"] = 1] = "CHILDREN";
})(Position || (Position = {}));
const DetailCommentView = ({ bookId , parentId , position , criteria , commentsWrapperRef  })=>{
    const [comments, setComments] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [offset, setOffset] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(2);
    const [getComments, setGetComments] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        refreshCommentsHandler();
    }, []);
    const refreshCommentsHandler = ()=>{
        if (position === 0) {
            (0,_api_comment_getParentComments__WEBPACK_IMPORTED_MODULE_3__/* .getParentComments */ .a)({
                bookId,
                criteria
            }).then((res)=>{
                if (res !== null) {
                    setComments(()=>res);
                    setOffset(()=>2);
                }
            });
        } else if (position === 1 && parentId !== null) {
            (0,_api_comment_getChildComments__WEBPACK_IMPORTED_MODULE_4__/* .getChildComments */ .y)({
                parentId,
                criteria: "date"
            }).then((res)=>{
                if (res !== null) {
                    setComments(()=>res);
                    setOffset(()=>2);
                }
            });
        }
    };
    const getCommentsHandler = ()=>{
        if (position === 0) {
            (0,_api_comment_getParentComments__WEBPACK_IMPORTED_MODULE_3__/* .getParentComments */ .a)({
                bookId,
                criteria,
                offset
            }).then((res)=>{
                if (res !== null) {
                    setComments((prev)=>[
                            ...prev,
                            ...res
                        ]);
                    setOffset((prev)=>prev + 1);
                }
            });
        } else if (position === 1 && parentId !== null) {
            (0,_api_comment_getChildComments__WEBPACK_IMPORTED_MODULE_4__/* .getChildComments */ .y)({
                parentId,
                criteria: "date",
                offset
            }).then((res)=>{
                if (res !== null) {
                    setComments((prev)=>[
                            ...prev,
                            ...res
                        ]);
                    setOffset((prev)=>prev + 1);
                }
            });
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (getComments === true) {
            getCommentsHandler();
            setGetComments(()=>false);
        }
    }, [
        getComments,
        comments
    ]);
    const setGetCommentsHandler = ()=>{
        setGetComments(()=>true);
    };
    const onWheelGetParentCommentsHandler = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_5__.throttle)((event)=>{
            if (position === 0 && event.deltaY > 0) {
                if (commentsWrapperRef?.current && (commentsWrapperRef.current.scrollHeight - 10 < commentsWrapperRef.current.clientHeight || commentsWrapperRef.current.scrollTop > commentsWrapperRef.current.scrollHeight - commentsWrapperRef.current.clientHeight - 100)) {
                    setGetCommentsHandler();
                }
            }
        }, 300), [
        comments
    ]);
    const onClickGetChildCommentsHandler = ()=>{
        setGetCommentsHandler();
    };
    const commentsRender = comments.map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DetailCommentViewElement__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                bookId: bookId,
                comment: el,
                parentId: el.commentId,
                refreshCommentsHandler: refreshCommentsHandler
            })
        });
    });
    const showMoreChildComments = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        onClick: onClickGetChildCommentsHandler,
        css: childCommentsShowMoreCSS,
        children: "답글 더보기 ∨"
    });
    const inputRender = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DetailCommentInput__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        action: "post",
        bookId: bookId,
        parentId: parentId,
        refreshCommentsHandler: refreshCommentsHandler
    });
    const noCommentsRender = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: noCommentsWrapperCSS,
        children: "댓글을 작성해 주세요!"
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: commentsWrapperRef,
        onWheel: onWheelGetParentCommentsHandler,
        children: [
            position === 0 && inputRender,
            comments.length !== 0 ? commentsRender : noCommentsRender,
            position === 1 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: childCommentsInputWrapperCSS,
                children: inputRender
            }),
            position === 1 && comments.length !== 0 && showMoreChildComments
        ]
    });
};
const childCommentsShowMoreCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: var(--text-color-4);
    cursor: pointer;
    user-select: none;

`;
const childCommentsInputWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    margin-top: 16px;
    margin-bottom: 16px;
`;
const noCommentsWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailCommentView);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3861:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DetailCommentInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9813);
/* harmony import */ var _api_comment_deleteComment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2043);
/* harmony import */ var _api_comment_putLikeComment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4636);
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(178);
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_icons_fc__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6290);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _DetailCommentView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2571);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_DetailCommentInput__WEBPACK_IMPORTED_MODULE_3__, _api_comment_deleteComment__WEBPACK_IMPORTED_MODULE_4__, _api_comment_putLikeComment__WEBPACK_IMPORTED_MODULE_5__, _DetailCommentView__WEBPACK_IMPORTED_MODULE_8__]);
([_DetailCommentInput__WEBPACK_IMPORTED_MODULE_3__, _api_comment_deleteComment__WEBPACK_IMPORTED_MODULE_4__, _api_comment_putLikeComment__WEBPACK_IMPORTED_MODULE_5__, _DetailCommentView__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 








// export type CommentType = {
//     "commentId": number;
//     "content": string;
//     "writerInfo": {
//         "userId": string;
//         "nickname": string;
//         "profileImg": string;
//     },
//     "parentWriterNickName": string | null;
//     "depth": number;
//     "createdDate": string;
//     "modifiedDate": string;
//     "isDelete": boolean;
//     "isChild": boolean;
//     }
const DetailCommentViewElement = ({ bookId , comment , parentId , refreshCommentsHandler  })=>{
    const [likeState, setLikeState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [likeStatusSize, setLikeStatusSize] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [toggleEditComment, setToggleEditComment] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [toggleChildComments, setToggleChildComments] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const refreshCommentsReHandler = ()=>{
        refreshCommentsHandler();
        setToggleEditComment(()=>false);
    };
    const toggleEditCommentHandler = ()=>{
        setToggleEditComment((prev)=>!prev);
    };
    const toggleChildCommentsHandler = ()=>{
        setToggleChildComments((prev)=>!prev);
    };
    const deleteCommentHandler = ()=>{
        (0,_api_comment_deleteComment__WEBPACK_IMPORTED_MODULE_4__/* .deleteComment */ .Y)({
            commentId: comment.commentId
        }).then(()=>{
            refreshCommentsReHandler();
        });
    };
    const likeCommentHandler = ()=>{
        (0,_api_comment_putLikeComment__WEBPACK_IMPORTED_MODULE_5__/* .putLikeComment */ .J)({
            commentId: comment.commentId
        }).then((res)=>{
            if (res?.likeCount !== undefined) {
                setLikeStatusSize(()=>res?.likeCount);
                setLikeState(()=>res?.likeState);
            }
        });
    };
    const commentHeader = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: commentInfoWrapperCSS,
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: writerInfoWrapperCSS,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: profileImgWrapperCSS,
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: comment.writerInfo.profileImg
                        })
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: comment.writerInfo.nickname
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                css: dateStringCSS,
                children: comment.createdDate
            })
        ]
    });
    const commentFooter = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: commentFooterCSS,
        children: [
            comment.isDelete === false && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: footerElementCSS,
                onClick: likeCommentHandler,
                children: [
                    likeState ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fc__WEBPACK_IMPORTED_MODULE_6__.FcLike, {
                        css: footerIconCSS
                    }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fc__WEBPACK_IMPORTED_MODULE_6__.FcLikePlaceholder, {
                        css: footerIconCSS
                    }),
                    " ",
                    likeStatusSize ? likeStatusSize : "좋아요"
                ]
            }),
            comment.depth === 0 && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: footerElementCSS,
                onClick: toggleChildCommentsHandler,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_7__.FaRegComment, {
                        css: footerIconCSS
                    }),
                    "답글 보기"
                ]
            }),
            comment.writerInfo.userId !== "=== example" && comment.isDelete === false && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: footerElementCSS,
                onClick: deleteCommentHandler,
                children: "삭제"
            }),
            comment.writerInfo.userId !== "=== example" && comment.isDelete === false && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: footerElementCSS,
                onClick: toggleEditCommentHandler,
                children: toggleEditComment ? "취소" : "수정"
            })
        ]
    });
    const editInput = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DetailCommentInput__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        action: "put",
        defaultValue: comment.content,
        bookId: bookId,
        commentId: comment.commentId,
        parentId: parentId,
        refreshCommentsHandler: refreshCommentsReHandler
    });
    const commentContent = toggleEditComment ? editInput : comment.isDelete ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: deletedStringCSS,
        children: "삭제된 댓글입니다."
    }) : `${comment.content}`;
    const childCommentsRender = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: childCommentsWrapperCSS({
            depth: comment.depth
        }),
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DetailCommentView__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
            bookId: bookId,
            position: 1,
            parentId: comment.commentId,
            criteria: "date"
        })
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: commentWrapperCSS,
        children: [
            comment.isDelete === false && commentHeader,
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: commentContentWrapperCSS,
                children: commentContent
            }),
            commentFooter,
            toggleChildComments && childCommentsRender
        ]
    });
};
const commentWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  border-bottom: 1px solid var(--back-color-op);
`;
const commentInfoWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
`;
const writerInfoWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
`;
const profileImgWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 36px;
  height: 36px;
  border-radius: 100px;
  background-color: var(--back-color-op);
  overflow: hidden;
`;
const commentContentWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-bottom: 16px;
`;
const commentFooterCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
const footerElementCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-right: 12px;
  font-size: 12px;
  color: var(--text-color-4);
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;
const childCommentsWrapperCSS = ({ depth  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    margin-left: ${depth === 0 ? "48px" : "0px"};
  `;
};
const footerIconCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;
const dateStringCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 12px;
  color: var(--text-color-4);
`;
const childCommentInputWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-bottom: 16px;
`;
const deletedStringCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-top: 16px;
  color: var(--text-color-4);
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailCommentViewElement);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6826:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/** @jsxImportSource @emotion/react */ 



// 모달창 자체
const ModalOverlay = (props)=>{
    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setShowModal(()=>true);
    }, []);
    const modalHandler = ()=>{
        setShowModal(()=>false);
        setTimeout(()=>{
            props.stateHandler(()=>false);
        }, 300);
    };
    const content = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(props.content, {
        ...props,
        modalHandler: modalHandler
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: backdrop({
            showModal: showModal
        }),
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: modalCSS({
                width: props.width,
                height: props.height,
                overflow: props.overflow,
                showModal: showModal
            }),
            children: content
        })
    });
};
const FixedModal = (props)=>{
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setModal(()=>/*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_3___default().createPortal(/*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ModalOverlay, {
                ...props
            }), document.getElementById("overlay-root")));
    }, []);
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), {
        children: props.modalState && modal
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FixedModal);
const backdrop = ({ showModal  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${showModal ? 255 : 0};
    transition-property: opacity;
    transition-duration: 0.3s;
  `;
};
const modalCSS = ({ width , height , overflow , showModal  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: transform;
    transition-duration: 0.3s;
    width: ${width};
    height: ${height};
    overflow: ${overflow};
    transform: ${showModal ? "rotateX(0deg)" : "rotateX(90deg)"};
  `;
};


/***/ }),

/***/ 5988:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/** @jsxImportSource @emotion/react */ 


const RedirButton = ({ width , height , platform , href  })=>{
    const [hrefArr, setHrefArr] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(href.split(" "));
    const platformBase = [
        "https://comic.naver.com/",
        "https://series.naver.com/",
        "https://page.kakao.com/",
        "https://ridibooks.com/"
    ];
    const btnRender = hrefArr.map((el, idx)=>{
        const findPlatform = (element)=>{
            if (el.includes(element)) {
                return true;
            }
        };
        const result = platformBase.findIndex(findPlatform);
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            href: el,
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: result === 0 && "/assets/platform_naver_webtoon.webp" || result === 1 && "/assets/platform_naver_series.webp" || result === 2 && "/assets/platform_kakao_page.png" || result === 3 && "/assets/platform_ridi.png" || "",
                css: platformBtnCSS
            })
        });
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: buttonCSS({
            width,
            height
        }),
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "unhovered",
                css: unhoveredCSS,
                children: "보러가기"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "hovered",
                css: hoveredCSS,
                children: btnRender
            })
        ]
    });
};
const buttonCSS = ({ width , height  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: background-color;
    transition-duration: 0.3s;
    /* cursor: pointer; */
    width: ${width};
    height: ${height};
    border: none;
    border-radius: 5px;
    font-size: 18px;
    padding: 0 20px;
    background-color: var(--main-color);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover .unhovered {
        opacity: 0;
    }
    &:hover .hovered {
        opacity: 255;
    }
    &:hover {
        background-color: var(--main-color-2);
    }
  `;
};
const hoveredCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: opacity;
    transition-duration: 0.3s;
    position: absolute;
    opacity: 0;
`;
const unhoveredCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: opacity;
    transition-duration: 0.3s;
    position: absolute;
    opacity: 255;
`;
const platformBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 48px;
    height: auto;
    margin: 10px;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RedirButton);


/***/ }),

/***/ 6167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/** @jsxImportSource @emotion/react */ 

const TagList = ({ tag  })=>{
    const renderTags = tag.split(" ").slice(0, 3).map((el, idx)=>{
        if (el.trim() !== "") {
            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: tagWrapperCSS,
                children: el
            });
        }
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: outerWrapperCSS,
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: tagListWrapperCSS,
            children: renderTags
        })
    });
};
const outerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: relative;
    height: 72px;
`;
const tagListWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
position: absolute;
  margin-top: 12px;
    width: 100%;
    overflow: scroll;
    padding-left: 50px;
    /* padding-right: -20px; */
    margin-left: -50px;
    -webkit-mask-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        var(--back-color) 5%,
        var(--back-color) 90%,
        rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 0%,
        var(--back-color) 5%,
        var(--back-color) 90%,
        rgba(0, 0, 0, 0) 100%
    );

    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const tagWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  border-radius: 20px;
  background-color: var(--main-color);
  padding: 14px;
  margin-right: 14px;
  margin-bottom: 14px;
  color: black;
  white-space:pre;;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TagList);


/***/ }),

/***/ 9502:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VQ": () => (/* binding */ HasBeenReadToggle),
/* harmony export */   "dU": () => (/* binding */ CommentBtn),
/* harmony export */   "o9": () => (/* binding */ BookmarkToggle)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4932);
/** @jsxImportSource @emotion/react */ 


const BookmarkToggle = ({ isClicked , bookId  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    const bookmarkNotClicked = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: isMobile ? "32" : "42",
        height: isMobile ? "32" : "42",
        viewBox: "0 0 42 42",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M27.3 40.5H14.7C9.59794 40.5 6.41672 39.4704 4.47316 37.5268C2.5296 35.5833 1.5 32.4021 1.5 27.3V14.7C1.5 9.59794 2.5296 6.41672 4.47316 4.47316C6.41672 2.5296 9.59794 1.5 14.7 1.5H27.3C32.4021 1.5 35.5833 2.5296 37.5268 4.47316C39.4704 6.41672 40.5 9.59794 40.5 14.7V27.3C40.5 32.4021 39.4704 35.5833 37.5268 37.5268C35.5833 39.4704 32.4021 40.5 27.3 40.5Z",
                stroke: "var(--text-color)",
                "stroke-width": "3",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("mask", {
                id: "path-2-inside-1_90_309",
                fill: "white",
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M31.5 0.923885V21.8818C31.5 26.0188 28.539 27.6358 24.906 25.4518L22.134 23.7928C21.504 23.4148 20.496 23.4148 19.866 23.7928L17.094 25.4518C13.461 27.6148 10.5 26.0188 10.5 21.8818V0.923885"
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M34.5 0.923885C34.5 -0.732969 33.1569 -2.07611 31.5 -2.07611C29.8431 -2.07611 28.5 -0.732969 28.5 0.923885H34.5ZM24.906 25.4518L26.4517 22.8806L26.4466 22.8776L24.906 25.4518ZM22.134 23.7928L20.5905 26.3653L20.5934 26.367L22.134 23.7928ZM19.866 23.7928L21.4066 26.367L21.4095 26.3653L19.866 23.7928ZM17.094 25.4518L18.6287 28.0295L18.6346 28.026L17.094 25.4518ZM13.5 0.923885C13.5 -0.732969 12.1569 -2.07611 10.5 -2.07611C8.84315 -2.07611 7.5 -0.732969 7.5 0.923885H13.5ZM28.5 0.923885V21.8818H34.5V0.923885H28.5ZM28.5 21.8818C28.5 22.5703 28.3755 22.9857 28.2741 23.1978C28.2249 23.3007 28.1827 23.3534 28.1623 23.3756C28.1432 23.3964 28.1342 23.4005 28.1341 23.4006C28.1337 23.4008 28.1187 23.4096 28.0765 23.4169C28.0324 23.4245 27.9471 23.4324 27.8125 23.4169C27.5361 23.385 27.076 23.256 26.4517 22.8806L23.3603 28.023C25.6919 29.4246 28.5236 30.0162 30.9967 28.6737C33.5 27.3148 34.5 24.5966 34.5 21.8818H28.5ZM26.4466 22.8776L23.6746 21.2186L20.5934 26.367L23.3654 28.026L26.4466 22.8776ZM23.6775 21.2203C22.7951 20.6909 21.8218 20.5093 21 20.5093C20.1782 20.5093 19.2049 20.6909 18.3225 21.2203L21.4095 26.3653C21.27 26.4489 21.1627 26.4815 21.1112 26.4941C21.0569 26.5074 21.0212 26.5093 21 26.5093C20.9788 26.5093 20.9431 26.5074 20.8888 26.4941C20.8373 26.4815 20.73 26.4489 20.5905 26.3653L23.6775 21.2203ZM18.3254 21.2186L15.5534 22.8776L18.6346 28.026L21.4066 26.367L18.3254 21.2186ZM15.5593 22.8741C14.9339 23.2464 14.4714 23.3756 14.1911 23.4076C14.0546 23.4231 13.9675 23.4153 13.9218 23.4074C13.878 23.3998 13.8621 23.3907 13.8614 23.3903C13.8611 23.3901 13.8526 23.3863 13.8343 23.3664C13.8147 23.3452 13.7733 23.2938 13.7247 23.1924C13.6245 22.9833 13.5 22.5704 13.5 21.8818H7.5C7.5 24.5986 8.50171 27.3133 11.0078 28.6683C13.4758 30.0026 16.3011 29.4153 18.6287 28.0295L15.5593 22.8741ZM13.5 21.8818V0.923885H7.5V21.8818H13.5Z",
                fill: "var(--text-color)",
                mask: "url(#path-2-inside-1_90_309)"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M27.3 40.5H14.7C9.59794 40.5 6.41672 39.4704 4.47316 37.5268C2.5296 35.5833 1.5 32.4021 1.5 27.3V14.7C1.5 9.59794 2.5296 6.41672 4.47316 4.47316C6.41672 2.5296 9.59794 1.5 14.7 1.5H27.3C32.4021 1.5 35.5833 2.5296 37.5268 4.47316C39.4704 6.41672 40.5 9.59794 40.5 14.7V27.3C40.5 32.4021 39.4704 35.5833 37.5268 37.5268C35.5833 39.4704 32.4021 40.5 27.3 40.5Z",
                stroke: "var(--text-color)",
                "stroke-width": "3",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("mask", {
                id: "path-5-inside-2_90_309",
                fill: "white",
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                    d: "M31.5 0.923885V21.8818C31.5 26.0188 28.539 27.6358 24.906 25.4518L22.134 23.7928C21.504 23.4148 20.496 23.4148 19.866 23.7928L17.094 25.4518C13.461 27.6148 10.5 26.0188 10.5 21.8818V0.923885"
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M34.5 0.923885C34.5 -0.732969 33.1569 -2.07611 31.5 -2.07611C29.8431 -2.07611 28.5 -0.732969 28.5 0.923885H34.5ZM24.906 25.4518L26.4517 22.8806L26.4466 22.8776L24.906 25.4518ZM22.134 23.7928L20.5905 26.3653L20.5934 26.367L22.134 23.7928ZM19.866 23.7928L21.4066 26.367L21.4095 26.3653L19.866 23.7928ZM17.094 25.4518L18.6287 28.0295L18.6346 28.026L17.094 25.4518ZM13.5 0.923885C13.5 -0.732969 12.1569 -2.07611 10.5 -2.07611C8.84315 -2.07611 7.5 -0.732969 7.5 0.923885H13.5ZM28.5 0.923885V21.8818H34.5V0.923885H28.5ZM28.5 21.8818C28.5 22.5703 28.3755 22.9857 28.2741 23.1978C28.2249 23.3007 28.1827 23.3534 28.1623 23.3756C28.1432 23.3964 28.1342 23.4005 28.1341 23.4006C28.1337 23.4008 28.1187 23.4096 28.0765 23.4169C28.0324 23.4245 27.9471 23.4324 27.8125 23.4169C27.5361 23.385 27.076 23.256 26.4517 22.8806L23.3603 28.023C25.6919 29.4246 28.5236 30.0162 30.9967 28.6737C33.5 27.3148 34.5 24.5966 34.5 21.8818H28.5ZM26.4466 22.8776L23.6746 21.2186L20.5934 26.367L23.3654 28.026L26.4466 22.8776ZM23.6775 21.2203C22.7951 20.6909 21.8218 20.5093 21 20.5093C20.1782 20.5093 19.2049 20.6909 18.3225 21.2203L21.4095 26.3653C21.27 26.4489 21.1627 26.4815 21.1112 26.4941C21.0569 26.5074 21.0212 26.5093 21 26.5093C20.9788 26.5093 20.9431 26.5074 20.8888 26.4941C20.8373 26.4815 20.73 26.4489 20.5905 26.3653L23.6775 21.2203ZM18.3254 21.2186L15.5534 22.8776L18.6346 28.026L21.4066 26.367L18.3254 21.2186ZM15.5593 22.8741C14.9339 23.2464 14.4714 23.3756 14.1911 23.4076C14.0546 23.4231 13.9675 23.4153 13.9218 23.4074C13.878 23.3998 13.8621 23.3907 13.8614 23.3903C13.8611 23.3901 13.8526 23.3863 13.8343 23.3664C13.8147 23.3452 13.7733 23.2938 13.7247 23.1924C13.6245 22.9833 13.5 22.5704 13.5 21.8818H7.5C7.5 24.5986 8.50171 27.3133 11.0078 28.6683C13.4758 30.0026 16.3011 29.4153 18.6287 28.0295L15.5593 22.8741ZM13.5 21.8818V0.923885H7.5V21.8818H13.5Z",
                fill: "var(--text-color)",
                mask: "url(#path-5-inside-2_90_309)"
            })
        ]
    });
    const bookmarkClicked = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: isMobile ? "32" : "42",
        height: isMobile ? "32" : "42",
        viewBox: "0 0 42 42",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M42.0004 12.2008V29.7989C42.0004 36.54 36.5404 42 29.7993 42H12.2011C5.46005 42 0 36.54 0 29.7989V12.2008C0 6.97172 2.14202 3.17068 5.94306 1.32266C7.32907 0.650654 8.92509 1.70066 8.92509 3.23368V21.8818C8.92509 24.3808 9.8911 26.3758 11.6341 27.3839C13.3981 28.3709 15.6242 28.1609 17.8922 26.7959L20.6222 25.1578C20.7902 25.0738 21.2102 25.0738 21.3362 25.1368L24.1082 26.7959C25.6203 27.6989 26.9223 27.9929 27.9723 27.9929C29.0643 27.9929 29.9043 27.6569 30.4083 27.3629C32.1093 26.3759 33.0753 24.3808 33.0753 21.8818V3.23368C33.0753 1.70066 34.6923 0.650654 36.0574 1.32266C39.8584 3.17068 42.0004 6.97172 42.0004 12.2008Z",
                fill: "var(--text-color)"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M27.8244 0C28.9794 0 29.9244 0.94501 29.9244 2.10002V21.8822C29.9244 23.2262 29.5254 24.2342 28.8324 24.6332C28.1184 25.0533 26.9844 24.8433 25.7244 24.0872L22.9523 22.4282C21.8813 21.7772 20.1173 21.7772 19.0463 22.4282L16.2743 24.0872C15.0142 24.8433 13.8802 25.0323 13.1662 24.6332C12.4732 24.2342 12.0742 23.2262 12.0742 21.8822V2.10002C12.0742 0.94501 13.0192 0 14.1742 0H27.8244Z",
                fill: "var(--text-color)"
            })
        ]
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: btnWrapperCSS({
            isMobile
        }),
        children: isClicked ? bookmarkClicked : bookmarkNotClicked
    });
};
const HasBeenReadToggle = ({ isClicked , bookId  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    const checkboxNotClicked = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: isMobile ? "32" : "42",
        height: isMobile ? "32" : "42",
        viewBox: "0 0 43 42",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M21.0215 42C9.4373 42 0.0214844 32.5842 0.0214844 21C0.0214844 9.41581 9.4373 0 21.0215 0C32.6057 0 42.0215 9.41581 42.0215 21C42.0215 32.5842 32.6057 42 21.0215 42ZM21.0215 2.93023C11.0587 2.93023 2.95172 11.0372 2.95172 21C2.95172 30.9628 11.0587 39.0698 21.0215 39.0698C30.9843 39.0698 39.0913 30.9628 39.0913 21C39.0913 11.0372 30.9843 2.93023 21.0215 2.93023Z",
                fill: "var(--text-color)"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                d: "M18.2465 27.9937C17.8558 27.9937 17.4847 27.8374 17.2112 27.5639L11.6827 22.0355C11.1162 21.469 11.1162 20.5314 11.6827 19.9648C12.2492 19.3983 13.1869 19.3983 13.7534 19.9648L18.2465 24.4579L28.2874 14.4169C28.854 13.8504 29.7916 13.8504 30.3581 14.4169C30.9247 14.9834 30.9247 15.9211 30.3581 16.4876L19.2819 27.5639C19.0084 27.8374 18.6372 27.9937 18.2465 27.9937Z",
                fill: "var(--text-color)"
            })
        ]
    });
    const checkboxClicked = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
        width: isMobile ? "32" : "42",
        height: isMobile ? "32" : "42",
        viewBox: "0 0 42 42",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
            d: "M21 0C9.429 0 0 9.429 0 21C0 32.571 9.429 42 21 42C32.571 42 42 32.571 42 21C42 9.429 32.571 0 21 0ZM31.038 16.17L19.131 28.077C18.837 28.371 18.438 28.539 18.018 28.539C17.598 28.539 17.199 28.371 16.905 28.077L10.962 22.134C10.353 21.525 10.353 20.517 10.962 19.908C11.571 19.299 12.579 19.299 13.188 19.908L18.018 24.738L28.812 13.944C29.421 13.335 30.429 13.335 31.038 13.944C31.647 14.553 31.647 15.54 31.038 16.17Z",
            fill: "var(--text-color)"
        })
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: btnWrapperCSS({
            isMobile
        }),
        children: [
            isClicked ? checkboxClicked : checkboxNotClicked,
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`margin-left: 14px;`,
                children: isClicked ? "읽음" : "읽지 않음"
            })
        ]
    });
};
const CommentBtn = ({ bookId , stateHandler  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    const comment = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
        width: isMobile ? "32" : "42",
        height: isMobile ? "32" : "42",
        viewBox: "0 0 43 42",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
            d: "M31.5158 0H10.5053C4.70635 0 0 4.68534 0 10.4632V23.0275V25.1286C0 30.9065 4.70635 35.5918 10.5053 35.5918H13.6568C14.2241 35.5918 14.9805 35.97 15.3377 36.4322L18.4892 40.6133C19.8759 42.4622 22.1451 42.4622 23.5318 40.6133L26.6833 36.4322C27.0825 35.907 27.7129 35.5918 28.3642 35.5918H31.5158C37.3147 35.5918 42.021 30.9065 42.021 25.1286V10.4632C42.021 4.68534 37.3147 0 31.5158 0ZM12.6063 21.0105C11.4297 21.0105 10.5053 20.065 10.5053 18.9095C10.5053 17.7539 11.4507 16.8084 12.6063 16.8084C13.7619 16.8084 14.7074 17.7539 14.7074 18.9095C14.7074 20.065 13.7829 21.0105 12.6063 21.0105ZM21.0105 21.0105C19.8339 21.0105 18.9095 20.065 18.9095 18.9095C18.9095 17.7539 19.8549 16.8084 21.0105 16.8084C22.1661 16.8084 23.1116 17.7539 23.1116 18.9095C23.1116 20.065 22.1871 21.0105 21.0105 21.0105ZM29.4147 21.0105C28.2381 21.0105 27.3137 20.065 27.3137 18.9095C27.3137 17.7539 28.2591 16.8084 29.4147 16.8084C30.5703 16.8084 31.5158 17.7539 31.5158 18.9095C31.5158 20.065 30.5913 21.0105 29.4147 21.0105Z",
            fill: "var(--text-color)"
        })
    });
    const onClickStateHandler = ()=>{
        stateHandler(()=>true);
    };
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: btnWrapperCSS({
            isMobile
        }),
        onClick: onClickStateHandler,
        children: comment
    });
};
const btnWrapperCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
        margin-right: ${isMobile ? "12px" : "24px"};
        margin-bottom: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;
};
const iconColor = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    color: var(--text-color);
`;


/***/ }),

/***/ 7900:
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
/* harmony import */ var _api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7546);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6652);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_bi__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_bookDetail_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9502);
/* harmony import */ var _components_bookDetail_TagList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6167);
/* harmony import */ var _components_bookDetail_RedirButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5988);
/* harmony import */ var _components_UI_FixedModal_FixedModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6826);
/* harmony import */ var _components_DetailComment_DetailComment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6490);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4932);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_2__, _components_DetailComment_DetailComment__WEBPACK_IMPORTED_MODULE_9__]);
([_api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_2__, _components_DetailComment_DetailComment__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 










const BookDetail = ({ bookData  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_10__/* .useIsResponsive */ .j)();
    const [commentModalState, setCommentModalState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        console.log(bookData);
    }, []);
    const desktopDecoration = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: backgroundWrapperCSS,
        className: "third-level-el-background",
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: blurredImgCSS({
                    thumbnail: bookData.thumbnail,
                    isDeskTop: isDeskTop
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: verticalGradientCSS({
                    isDeskTop
                }),
                className: "vertical-gradient"
            }),
            isDeskTop && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: horizontalGradientCSS
            })
        ]
    });
    const iconBtn = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: iconFunctionCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_icons__WEBPACK_IMPORTED_MODULE_5__/* .CommentBtn */ .dU, {
                bookId: bookData.bookId,
                stateHandler: setCommentModalState
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_icons__WEBPACK_IMPORTED_MODULE_5__/* .BookmarkToggle */ .o9, {
                bookId: bookData.bookId,
                isClicked: bookData.bookmark
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_icons__WEBPACK_IMPORTED_MODULE_5__/* .HasBeenReadToggle */ .VQ, {
                bookId: bookData.bookId,
                isClicked: bookData.read
            })
        ]
    });
    const content = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "content",
        css: contentCSS({
            isDeskTop
        }),
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "rowGrid",
            css: rowGridCSS({
                isDeskTop
            }),
            children: [
                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        isDeskTop === false && iconBtn,
                        isDeskTop === true && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_TagList__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            tag: bookData.tag
                        }),
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: titleCSS({
                                isDeskTop
                            }),
                            children: bookData.title
                        }),
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: scoreDivCSS,
                            children: [
                                "평균 평점 : ",
                                bookData.avgScore,
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_4__.BiChevronRightCircle, {
                                    css: scoreBtnCSS
                                })
                            ]
                        }),
                        isDeskTop === false && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: lineCSS
                        })
                    ]
                }),
                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    css: bottomContentCSS,
                    children: [
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                isDeskTop && iconBtn,
                                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    css: bookInfoWrapperCSS({
                                        isDeskTop
                                    }),
                                    children: [
                                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            css: boldTextCSS,
                                            children: [
                                                bookData.genre,
                                                " \xb7",
                                                " ",
                                                new Date(bookData.regist).getFullYear(),
                                                " \xa0 \xa0"
                                            ]
                                        }),
                                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: bookData.author
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    css: storyWrapperCSS,
                                    children: bookData.story
                                })
                            ]
                        }),
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: buttonWrapperCSS({
                                isDeskTop
                            }),
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_RedirButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                width: isMobile ? "100%" : "50%",
                                height: "64px",
                                platform: bookData.platform,
                                href: bookData.href
                            })
                        })
                    ]
                })
            ]
        })
    });
    const thumbnail = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: thumbnailGridCSS,
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            css: thumbnailCSS({
                isDeskTop
            }),
            src: bookData.thumbnail
        })
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: mainContentCSS,
        className: "top-level-el",
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_FixedModal_FixedModal__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                modalState: commentModalState,
                stateHandler: setCommentModalState,
                content: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_DetailComment_DetailComment__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    bookId: bookData.bookId
                })
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: mainContentInnerWrapperCSS,
                className: "second-level-el",
                children: [
                    desktopDecoration,
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: contentOuterWrapperCSS({
                            isDeskTop
                        }),
                        className: "third-level-el",
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: columnGridCSS({
                                isDeskTop
                            }),
                            className: "column-grid",
                            children: isDeskTop ? /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    content,
                                    thumbnail
                                ]
                            }) : /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    thumbnail,
                                    content
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
};
// getServerSideProps는 async/await를 사용하여 API를 모두 받아올 때까지 대기하였다가 컴포넌트로 props를 넘겨주고, 이후 컴포넌트는 사전 생성 됩니다.
const getServerSideProps = async (context)=>{
    const params = await context.params;
    const data = await (0,_api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_2__/* .getBookDetail */ .G)(params.bookId).then((res)=>{
        return res;
    }).catch((err)=>{
        console.log("pages/books/[bookId].tsx => ", err);
    });
    return await {
        props: {
            bookData: data
        }
    };
};
const mainContentCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  /* height: 100vh; */
  
  /* overflow-x: hidden; */
`;
const backgroundWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
    height: 100%;

  
  position: absolute;
`;
const blurredImgCSS = ({ thumbnail , isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    background: no-repeat url("${thumbnail}") 0 / cover;
    filter: blur(10px);
    -webkit-filter: blur(20px);
    pointer-events: none;
    position: absolute;
    ${isDeskTop && "right: 0"};

    ${isDeskTop ? "width: 70vw" : "width: 100vw"};
    ${isDeskTop ? "height: 120vh" : "height: calc(90% - 72px)"};
    ${isDeskTop ? "opacity: 100%;" : "opacity: 50%;"};
    

    
  `;
};
const verticalGradientCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100vw;
    height: ${isDeskTop ? "125vh" : "calc(100% - 72px)"};
    background: linear-gradient(rgba(0, 0, 0, 0) 0%, var(--back-color) 90%);
    position: absolute;
  `;
};
const horizontalGradientCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100vw;
  height: 125vh;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0) 0%,
    var(--back-color) 60%
  );
  position: absolute;
`;
const contentOuterWrapperCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100vw;
    height: ${isDeskTop ? "calc(100vh - 72px)" : "100%"};
    /* height: calc(100vh - 72px); */
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding */
  `;
};
const columnGridCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: relative;
    display: grid;
    ${isDeskTop ? "grid-template-columns: 50% 50%" : "grid-template-rows: 100vw auto"};
    
    /* background-color: red; */
    height: ${isDeskTop ? "80vh" : "auto"};
    width: 100vw;


  `;
};
const thumbnailGridCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  /* height: calc(100vh - 72px); */
  display: flex;
  justify-content: center;

  align-items: center;
`;
const thumbnailCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  ${isDeskTop ? "height: 80vh; width: auto;" : "height: auto; width: 70vw;"}
    
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  `;
};
const contentCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    ${isDeskTop ? "padding-left: 10vw" : "padding: 24px;"};
  `;
};
const rowGridCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: grid;
    grid-template-rows: ${isDeskTop ? "50%" : "auto"} 50%;
    ${isDeskTop && "height: 100%"};
    /* background-color: red; */
  `;
};
const titleCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    font-size: 6vw;
    font-weight: 700;
    margin-bottom: ${isDeskTop ? "24px" : "12px"};
  `;
};
const scoreDivCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
const scoreBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-left: 12px;
  width: 24px;
  height: 24px;
`;
const bottomContentCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  flex-direction: column;
  justify-content: end;
  
  /* justify-content: space-between; */
`;
const iconFunctionCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
`;
const bookInfoWrapperCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
    margin-bottom: ${isDeskTop ? "24px" : "12px"};
    margin-top: 12px;
  `;
};
const boldTextCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-weight: 700;
`;
const storyWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  /* width: 70%; */
  /* height: 70px; */

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  margin-bottom: 24px;
`;
const buttonWrapperCSS = ({ isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  ${isDeskTop === false && "display: flex; justify-content: center;"}
 `;
};
const lineCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  border-bottom: 1px var(--text-color-4) solid;
`;
const mainContentInnerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  height: 100%;
  width: 100%;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookDetail);

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

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 6652:
/***/ ((module) => {

module.exports = require("react-icons/bi");

/***/ }),

/***/ 6290:
/***/ ((module) => {

module.exports = require("react-icons/fa");

/***/ }),

/***/ 178:
/***/ ((module) => {

module.exports = require("react-icons/fc");

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
var __webpack_exports__ = __webpack_require__.X(0, [932,394], () => (__webpack_exec__(7900)));
module.exports = __webpack_exports__;

})();