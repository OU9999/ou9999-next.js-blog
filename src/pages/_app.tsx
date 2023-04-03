import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderMobile from "@/components/Mobile/HeaderMobile";
import StartModal from "@/components/StartModal";
import theme from "@/utils/theme";
import { ChakraProvider, useMediaQuery } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AnimatePresence
          initial={true}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          {mobileView ? <HeaderMobile /> : <Header />}
          <Component {...pageProps} />
          <Footer />
          {mobileView ? null : <StartModal />}
        </AnimatePresence>
      </RecoilRoot>
    </ChakraProvider>
  );
}
