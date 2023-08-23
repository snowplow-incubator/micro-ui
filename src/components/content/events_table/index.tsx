import { useGoodEvents, useBadEvents } from "@/hooks";
import { Fade, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { TableFilters } from "./TableFilters";
import { TableGrid } from "./TableGrid";
import { mergeTwo } from "./utils";
import { TableColumnsControl } from "./TableColumnsControl";
import { initialVisibilityState } from "./columnDefinitions";

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
  eventName: string;
  eventVendor: string;
};

export type EventsFilterType = "all" | "good" | "bad";

export function EventsTable() {
  const { goodEvents } = useGoodEvents();
  const { badEvents } = useBadEvents();
  const [events, setEvents] = useState<TableEventEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<EventsFilterType>("all");
  const [visibleColumns, setVisibleColumns] = useState<
    Record<string | number, boolean>
  >(initialVisibilityState);

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
    setActiveFilter(eventsFilterType);
    setEvents(events);
    return;
  }

  function handleColumnsVisibilityChange(
    columnVisibilityChange: Record<string | number, boolean>
  ) {
    setVisibleColumns(columnVisibilityChange);
  }

  return (
    <Grid container rowGap={4}>
      {Boolean(events.length || (goodEvents || badEvents)) && (
        <Fade
          in={Boolean(events)}
          style={{ transformOrigin: "0 0 0" }}
          timeout={1000}
        >
          <Grid container item xs={12} alignItems="center">
            <Grid item xs={8}>
              <TableColumnsControl
                handleColumnsVisibilityChange={handleColumnsVisibilityChange}
                visibleColumns={visibleColumns}
              />
            </Grid>
            <Grid item xs={4}>
              <TableFilters
                handleFilter={handleFilter}
                activeFilter={activeFilter}
              />
            </Grid>
          </Grid>
        </Fade>
      )}
      <Grid item xs={12}>
        <TableGrid events={events} visibleColumns={visibleColumns} />
      </Grid>
    </Grid>
  );
}
