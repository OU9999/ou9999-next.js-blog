import {
  Box,
  Center,
  Spinner,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

export default function Loading() {
  const [mobileView] = useMediaQuery("(max-width: 768px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  const bgColor = useColorModeValue("black", "white");
  const color = useColorModeValue("white", "black");
  return (
    <>
      <Center w="100vw" h="100vh" zIndex={"popover"} position={"fixed"}>
        {mobileView ? (
          <Center
            pos={"absolute"}
            top={10}
            right={10}
            bgColor={bgColor}
            padding={3}
            rounded={10}
          >
            <Spinner top={10} right={10} size={"md"} color={color} />
          </Center>
        ) : (
          <Center
            pos={"absolute"}
            bottom={10}
            right={10}
            bgColor={bgColor}
            padding={3}
            rounded={10}
          >
            <Spinner top={10} right={10} size={"md"} color={color} />
          </Center>
        )}
      </Center>
    </>
  );
}
