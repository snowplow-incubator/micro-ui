import { EventChart } from "./chart";
import { EventsTable } from "./events_table";
import { StatsCards } from "./stats";
import Grid from "@mui/material/Grid";
import { Display, ResetButton } from "./common";

export function Dashboard() {
  return (
    <Grid container spacing={2} rowGap={2}>
      <Grid container item xs={12} alignItems="center">
        <Grid item xs={10}>
          <StatsCards />
        </Grid>
        <Grid item xs={2}>
          <ResetButton />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Display title="Micro Event Stream" subtitle="(Last 15 Minutes)">
          <EventChart />
        </Display>
      </Grid>
      <Grid item xs={12}>
        <Display title="Events Table">
          <EventsTable />
        </Display>
      </Grid>
    </Grid>
  );
}
