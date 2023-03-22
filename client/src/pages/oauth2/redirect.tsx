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
    console.log(props.token);
    const token = getUrlParameter("token", window.location.search);
    const error = getUrlParameter("error", window.location.search);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      router.push({
        pathname: "/",
        query: { from: router.asPath },
      });
    } else {
      router.push({
        pathname: "/login",
        query: {
          from: router.asPath,
          error: error,
        },
      });
    }
  }, [router]);

  return null;
};

export const getServerSideProps = async (context: any) => {
  const token = await context.query.token;

  return await {
    props: {
      token,
    },
  };
};

export default OAuth2RedirectHandler;
