import { Flex } from "@chakra-ui/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW={2000}>
      {children}
    </Flex>
  );
}
