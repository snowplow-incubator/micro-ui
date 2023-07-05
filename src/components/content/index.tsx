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

export function Content() {
  const { eventTotals, error, isLoading } = useEventTotals();
  return (
    <Box maxW={1000}>
      <Flex
        borderWidth={1}
        borderRadius={12}
        borderColor="gray"
        padding={5}
        m={5}
      >
        <StatGroup>
          <TotalEventsStat />
          <GoodEventsStat />
          <BadEventsStat />
        </StatGroup>
      </Flex>
      <Flex>
        <EventChart />
      </Flex>

      <Flex>{/* <EventsTable /> */}</Flex>
    </Box>
  );
}

export function GoodEventsStat() {
  const { eventTotals } = useEventTotals();

  return (
    <Stat>
      <StatLabel>Good Events ✅</StatLabel>
      <StatNumber>{eventTotals?.good}</StatNumber>
      <StatHelpText>Number of Good Events recorded</StatHelpText>
    </Stat>
  );
}

export function BadEventsStat() {
  const { eventTotals } = useEventTotals();

  return (
    <Stat>
      <StatLabel>Bad Events 🔴</StatLabel>
      <StatNumber>{eventTotals?.bad}</StatNumber>
      <StatHelpText>Number of Bad Events recorded</StatHelpText>
    </Stat>
  );
}

export function TotalEventsStat() {
  const { eventTotals } = useEventTotals();

  return (
    <Stat>
      <StatLabel>Total Events ⭐</StatLabel>
      <StatNumber>{eventTotals?.total}</StatNumber>
      <StatHelpText>Total Events recorded</StatHelpText>
    </Stat>
  );
}
