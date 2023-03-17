import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import mainStore from "@/jotai/atom";
import Layout from "@/components/layout/Layout";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
// import { useMediaQuery } from "react-responsive";

export default function App({ Component, pageProps }: AppProps) {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const isClient = useIsClient();
  return (
    <Provider store={mainStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
