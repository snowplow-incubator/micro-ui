import Box from "@mui/material/Box";
import { EventChart } from "./chart";
import { EventsTable } from "./events_table";
import { StatsCard } from "./stats";
import Grid from "@mui/material/Grid";

export function Content() {
  return (
    <Box sx={{ width: "100%" }} p={2}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <StatsCard />
        </Grid>
        <Grid item xs={12}>
          <EventChart />
        </Grid>
        <Grid item xs={12}>
          <EventsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
