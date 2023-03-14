import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import mainStore from "@/jotai/atom";
import Layout from "@/components/layout/Layout";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useMediaQuery } from "react-responsive";

export default function App({ Component, pageProps }: AppProps) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px) and (min-width:768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isClient = useIsClient();
  return (
    <Provider store={mainStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
