import { useEventTotals } from "@/hooks";
import {
  Box,
  Flex,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { EventChart } from "./chart";
import { EventsTable } from "./events-table";
import { StatsCard } from "./stats"

export function Content() {
  const { eventTotals, error, isLoading } = useEventTotals();
  return (
    <Box maxW={800}>
      <Flex
        borderWidth={1}
        borderRadius={12}
        borderColor="gray"
        padding={5}
        m={5}
      >
        <StatsCard />
      </Flex>
      <Flex>
        <EventChart />
      </Flex>

      <Flex><EventsTable /></Flex>
    </Box>
  );
}


