import Box from "@mui/material/Box";
import { EventChart } from "./chart";
import { EventsTable } from "./events_table";
import { StatsCards } from "./stats";
import Grid from "@mui/material/Grid";
import { ResetButton } from "./common";

export function Content() {
  return (
    <Box sx={{ width: "100%" }} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <StatsCards />
        </Grid>
        <Grid item xs={2}>
          <ResetButton />
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
