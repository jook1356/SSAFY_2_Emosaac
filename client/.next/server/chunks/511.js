"use strict";
exports.id = 511;
exports.ids = [511,394];
exports.modules = {

/***/ 5394:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ defaultAxiosInstance)
/* harmony export */ });
/* unused harmony export defaultAxiosFormDataInstance */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function getToken() {
    if (false) {}
    return "";
}
function defaultInstace() {
    const token = getToken();
    const instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
        baseURL: "http://j8d203.p.ssafy.io:8081/api",
        headers: {
            "Content-Type": "application/JSON;charset=utf-8",
            Authorization: token
        }
    });
    return instance;
}
function defaultFormDataInstance() {
    const token = getToken();
    const instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
        baseURL: "http://j8d203.p.ssafy.io:8081/api",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
        }
    });
    return instance;
}
const defaultAxiosInstance = defaultInstace();
const defaultAxiosFormDataInstance = defaultFormDataInstance();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6511:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getMyInfo() {
    try {
        const { data , status  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .E.get(`/users/me`);
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        throw error;
    }
    return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getMyInfo);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;