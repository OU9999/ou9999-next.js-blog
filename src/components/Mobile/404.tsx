import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Mobile404() {
  return (
    <>
      <Center w="100vw" h={"100vh"}>
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
