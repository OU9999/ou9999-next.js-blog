import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function MarkdownLoadingView() {
  return (
    <>
      <Box padding="6" boxShadow="lg">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={10} spacing="4" skeletonHeight="2" />
      </Box>
    </>
  );
}
