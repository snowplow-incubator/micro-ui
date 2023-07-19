import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEventTotals } from "@/hooks";
import { SvgIcon } from "@mui/material";
import SumIcon from "./sum.svg";
import CheckIcon from "./check.svg";
import WarnIcon from "./warn.svg";

export function StatsCards() {
  const { eventTotals } = useEventTotals();
  return (
    <Box display="flex">
      <StatsCardBase
        title={"Total Events Sent"}
        statsCount={eventTotals?.total}
        boxColor="#98A2B3"
        circleColor="#667085"
        IconComponent={SumIcon}
      />
      <StatsCardBase
        title={"Good Events Sent"}
        statsCount={eventTotals?.good}
        boxColor="#39ADB4"
        circleColor="#0B7F86"
        IconComponent={CheckIcon}
      />
      <StatsCardBase
        title={"Bad Events Sent"}
        statsCount={eventTotals?.bad}
        boxColor="#E3584E"
        circleColor="#B52A20"
        IconComponent={WarnIcon}
      />
    </Box>
  );
}

function StatsCardBase({
  boxColor,
  circleColor,
  IconComponent,
  title,
  statsCount,
}) {
  return (
    <Box
      sx={{ width: 284 }}
      borderRadius={2}
      padding="16px 18px"
      display="flex"
      bgcolor={boxColor}
      mr={2}
    >
      <Box
        width="52px"
        height="52px"
        bgcolor={circleColor}
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SvgIcon
          component={IconComponent}
          viewBox="0 0 34 34"
          sx={{ width: 34, height: 34 }}
        />
      </Box>
      <Box ml={2}>
        <Typography variant="body2" color="#FBFBFB">
          {title}
        </Typography>
        <Typography variant="h1" component="span" color="#FBFBFB">
          {statsCount}
        </Typography>
      </Box>
    </Box>
  );
}
