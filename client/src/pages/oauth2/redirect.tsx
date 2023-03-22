import { useRouter } from "next/router";
import { useEffect } from "react";

const ACCESS_TOKEN = "your_access_token_key";

function getUrlParameter(name: string, search: string): string {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

  const results = regex.exec(search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const OAuth2RedirectHandler = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    console.log(props);
    // console.log(props.token);
    const token = getUrlParameter("token", window.location.search);
    const error = getUrlParameter("error", window.location.search);
    const code = getUrlParameter("code", window.location.search);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      if (code === "200") {
        router
          .push({
            pathname: "/",
            query: { from: router.asPath },
          })
          .then(() => {
            window.history.replaceState({}, document.title, "/login");
          });
      } else if (code === "201") {
        router
          .push({
            pathname: "/survey",
            query: {
              from: router.asPath,
              error: error,
            },
          })
          .then(() => {
            window.history.replaceState({}, document.title, "/survey");
          });
      } else {
        router
          .push({
            pathname: "/error",
            query: { from: router.asPath },
          })
          .then(() => {
            window.history.replaceState({}, document.title, "/error");
          });
      }
    } else {
      router
        .push({
          pathname: "/login",
          query: {
            from: router.asPath,
            error: error,
          },
        })
        .then(() => {
          window.history.replaceState({}, document.title, "/login");
        });
    }
  }, [router]);

  return null;
};

export const getServerSideProps = async (context: any) => {
  const token = await context.query.token;
  console.log(context.query);
  return await {
    props: {
      token,
    },
  };
};

export default OAuth2RedirectHandler;
