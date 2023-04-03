import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartModal from "@/components/StartModal";
import theme from "@/utils/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AnimatePresence
          initial={true}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
          <StartModal />
        </AnimatePresence>
      </RecoilRoot>
    </ChakraProvider>
  );
}
