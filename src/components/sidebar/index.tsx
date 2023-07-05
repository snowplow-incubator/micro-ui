import { Flex, Heading, VStack, useTheme } from "@chakra-ui/react";

export function Sidebar() {
  const theme = useTheme();
  return (
    <Flex w="15%" flexDir="column" alignItems="center" backgroundColor={"pink"}>
      <VStack spacing={4}>
        <Heading as="h3" color="white">
          Micro UI
        </Heading>
      </VStack>
    </Flex>
  );
}
