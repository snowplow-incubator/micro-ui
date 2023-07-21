import Box from "@mui/material/Box";
import { EventChart } from "./chart";
import { EventsTable } from "./events_table";
import { StatsCards } from "./stats";
import Grid from "@mui/material/Grid";
import { Display, ResetButton } from "./common";

export function Content() {
  return (
    <Box
      sx={{
        maxWidth: "1260px",
        backgroundColor: "#f2f4f7",
        display: "flex",
        margin: "0 auto",
      }}
      p={3}
    >
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
    </Box>
  );
}
