"use strict";
(() => {
var exports = {};
exports.id = 360;
exports.ids = [360];
exports.modules = {

/***/ 8778:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6511);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__]);
_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const ACCESS_TOKEN = "access_token";
function getUrlParameter(name, search) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
const OAuth2RedirectHandler = (props)=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // console.log(props);
        // console.log(props.token);
        const token = getUrlParameter("token", window.location.search);
        const error = getUrlParameter("error", window.location.search);
        const code = getUrlParameter("code", window.location.search);
        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            (0,_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)().then((userInfo)=>{
                if (userInfo) {
                    localStorage.setItem("userId", JSON.stringify(userInfo.userId));
                    localStorage.setItem("nickname", JSON.stringify(userInfo.nickname));
                    localStorage.setItem("imageUrl", JSON.stringify(userInfo.imageUrl));
                    localStorage.setItem("gender", JSON.stringify(userInfo.gender));
                    localStorage.setItem("age", JSON.stringify(userInfo.age));
                }
            }).catch((error)=>{
                console.error("Error fetching user info:", error);
            });
            if (code === "200") {
                router.push({
                    pathname: "/",
                    query: {
                        from: router.asPath
                    }
                }).then(()=>{
                    window.history.replaceState({}, document.title, "/login");
                });
            } else if (code === "201") {
                router.push({
                    pathname: "/survey",
                    query: {
                        from: router.asPath,
                        error: error
                    }
                }).then(()=>{
                    window.history.replaceState({}, document.title, "/survey");
                });
            } else {
                router.push({
                    pathname: "/error",
                    query: {
                        from: router.asPath
                    }
                }).then(()=>{
                    window.history.replaceState({}, document.title, "/error");
                });
            }
        } else {
            router.push({
                pathname: "/login",
                query: {
                    from: router.asPath,
                    error: error
                }
            }).then(()=>{
                window.history.replaceState({}, document.title, "/login");
            });
        }
    }, [
        router
    ]);
    return null;
};
const getServerSideProps = async (context)=>{
    const token = await context.query.token;
    console.log(context.query);
    return await {
        props: {
            token
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OAuth2RedirectHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

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
var __webpack_exports__ = __webpack_require__.X(0, [511], () => (__webpack_exec__(8778)));
module.exports = __webpack_exports__;

})();