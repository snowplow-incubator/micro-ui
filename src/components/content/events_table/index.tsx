import { useGoodEvents, useBadEvents } from "@/hooks";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { TableFilters } from "./TableFilters";
import { TableGrid } from "./TableGrid";
import { mergeTwo } from "./utils";

export type TableEventEntry = {
  app_id: string;
  id: string;
  contexts: string[];
  event: Record<string, unknown>;
  eventType: string;
  timestamp: string;
  rawEvent: Record<string, unknown>;
  schema: string;
  collectorPayload: string[];
  errors: string[];
  valid?: boolean;
};

export type EventsFilterType = "all" | "good" | "bad";

export function EventsTable() {
  const { goodEvents } = useGoodEvents();
  const { badEvents } = useBadEvents();
  const [events, setEvents] = useState<TableEventEntry[]>([]);

  useEffect(() => {
    setEvents(mergeTwo(badEvents, goodEvents));
  }, [goodEvents, badEvents]);

  function handleFilter(eventsFilterType: EventsFilterType) {
    let events = mergeTwo(badEvents, goodEvents);
    switch (eventsFilterType) {
      case "all":
        break;
      case "good":
        events = events.filter((event) => event.valid === true);
        break;
      case "bad":
        events = events.filter((event) => event.valid === false);
        break;
      default:
        throw "Not implemented filter type";
    }
    setEvents(events);
    return;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableFilters handleFilter={handleFilter} />
      </Grid>
      <Grid item xs={12}>
        <TableGrid events={events} />
      </Grid>
    </Grid>
  );
}
