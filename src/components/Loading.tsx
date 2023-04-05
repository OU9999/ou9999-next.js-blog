import { Center, Spinner, useMediaQuery } from "@chakra-ui/react";

export default function Loading() {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return (
    <>
      <Center w="100vw" h="100vh" zIndex={"popover"} position={"fixed"}>
        {mobileView ? (
          <Spinner
            size={"xl"}
            color="white"
            pos={"absolute"}
            top={10}
            right={10}
          />
        ) : (
          <Spinner
            size={"xl"}
            color="white"
            pos={"absolute"}
            bottom={10}
            right={10}
          />
        )}
      </Center>
    </>
  );
}
