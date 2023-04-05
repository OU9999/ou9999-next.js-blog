import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <>
      <Center w="100vw" h="100vh" zIndex={"popover"} position={"fixed"}>
        <Spinner
          size={"xl"}
          color="white"
          pos={"absolute"}
          bottom={10}
          right={10}
        />
      </Center>
    </>
  );
}
