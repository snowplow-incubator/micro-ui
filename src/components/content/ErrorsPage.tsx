import { useBadEvents } from "@/hooks";
import { Grid } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { ErrorDisplay } from './error_page/ErrorDisplay'

import { ErrorTimeline } from "./error_page/ErrorTimeline";
import { CustomNoRowsOverlay } from "./common/CustomNoRowsOverlay";

export function ErrorsPage() {
  const { badEvents, isLoading } = useBadEvents();
  const [activeEid, setActiveEid] = useState(" ")
  const [singleError, setSingleError] = useState()

  const activeHandlerCallback = (eventId: SetStateAction<string>) => {
    setActiveEid(eventId)
  }

  useEffect(() => {
    badEvents?.forEach((error: any) => {
      const singleError = JSON.parse(error.errors[1])
      const eid = singleError.data.payload.enriched.event_id
      if (eid == activeEid) {
        setSingleError(singleError)
      }
    });
  }, [activeEid]);


  if (isLoading || !badEvents.length) {
    return <CustomNoRowsOverlay />
  }
  return (

    <Grid
      item
      container
      alignItems={"flex-start"}
      justifyContent={"space-around"}
      columnGap={1}
      rowGap={1}
      sx={{ margin: "0 auto" }}
    >
      <Grid item sx={{ display: "flex", height: "fit-content" }} md={1}>
        <ErrorTimeline data={badEvents} callback={activeHandlerCallback} activeEid={activeEid} />
      </Grid>
      <Grid item justifyContent={"center"} md={8} sx={{ display: "flex", height: "fit-content" }}>
        {singleError && <ErrorDisplay singleError={singleError} />}
      </Grid>
    </Grid >
  );
}