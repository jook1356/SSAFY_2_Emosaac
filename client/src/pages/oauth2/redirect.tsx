import React, { useEffect } from "react";
import { useRouter } from "next/router";

type RedirectPageProps = {};

const RedirectPage = (props: RedirectPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const ACCESS_TOKEN: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
    console.log(token);
    // TODO: API와 연동하여 access token을 받아옴
    if (token !== null) {
      console.log(token);
      localStorage.setItem(ACCESS_TOKEN, token);
      console.log("돼요?");
    }

    router.push("/");
  }, [router]);

  return <div>인증 코드 받아오는 중...</div>;
};

export default RedirectPage;

// import React, { useEffect } from "react";
// import { ACCESS_TOKEN } from "../../../constants";
// import { Navigate, useLocation, useSearchParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { userAuthSliceActions } from "../../../redux/userAuthSlice";

// const OAuthRedirectHandler = (props) => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const token = searchParams.get("token");
//   const error = searchParams.get("error");
//   const code = searchParams.get("code");

//   if (token) {
//     // 성공
//     localStorage.setItem(ACCESS_TOKEN, token);
//     dispatch(userAuthSliceActions.changeToken(token));

//     if (code === "201") {
//       // 회원가입 시
//       return (
//         <Navigate
//           to={{
//             pathname: "/profile",
//             state: { from: location },
//           }}
//         />
//       );
//     } else if (code === "200") {
//       // 기존 유저 로그인 시
//       return (
//         <Navigate
//           to={{
//             pathname: "/index",
//             state: { from: location },
//           }}
//         />
//       );
//     }
//   } else {
//     // 실패
//     return (
//       <Navigate
//         to={{
//           pathname: "/login",
//           state: {
//             from: location,
//             error: error,
//           },
//         }}
//       />
//     );
//   }
// };

// export default OAuthRedirectHandler;
