import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderMobile from "@/components/Mobile/HeaderMobile";
import theme from "@/utils/theme";
import { ChakraProvider, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "@fontsource/noto-sans-kr";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import Loading from "@/components/Loading";
import MainImgMobile from "@/components/Mobile/MainImgMobile";

export default function App({ Component, pageProps }: AppProps) {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const showRoute = [
      "/",
      "/notes/:category",
      "/entry/:titleUrl/:id",
      "/guestbook",
    ];
    const start = (url: any) => {
      if (showRoute.find((route) => String(url).includes(route))) {
        setLoading(true);
      }
    };
    const end = (url: any) => {
      if (showRoute.find((route) => String(url).includes(route))) {
        setLoading(false);
      }
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        {loading && <Loading />}
        <AnimatePresence
          initial={true}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          {mobileView ? <HeaderMobile /> : <Header />}
          {mobileView ? <MainImgMobile /> : null}
          <Component {...pageProps} />
          <Footer />
        </AnimatePresence>
      </RecoilRoot>
    </ChakraProvider>
  );
}
