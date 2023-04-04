import Mobile404 from "@/components/Mobile/404";
import {
  Button,
  Center,
  Heading,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Custom404() {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return (
    <>
      {mobileView ? <Mobile404 /> : null}
      <Center w="100vw" h="100vh">
        <VStack>
          <Heading>404!</Heading>
          <Link href={"/"}>
            <Button>Go Home</Button>
          </Link>
        </VStack>
      </Center>
    </>
  );
}
