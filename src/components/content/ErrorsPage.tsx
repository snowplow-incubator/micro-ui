import { useBadEvents } from "@/hooks";
import { Display } from "./common";
import { UAParser } from "ua-parser-js";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { DateTime } from "luxon";

import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function ErrorsPage() {
  const { badEvents, isLoading } = useBadEvents();
  if (isLoading || !badEvents.length) {
    return null;
  }
  const singleError = JSON.parse(badEvents[0].errors[1]);
  // discern between web errors
  const errorPlatform = singleError.data.payload.enriched.platform;

  // title
  const errorType = singleError.data.failure.messages[0].error.error;
  const page_url = singleError.data.payload.enriched.page_url;
  // subtitle
  const errorMessage =
    singleError.data.failure.messages[0].error.dataReports[0].message;

  // event:
  const eventId = singleError.data.payload.enriched.event_id;
  // error timestamp
  const errorTimestamp = singleError.data.failure.timestamp;

  // browsers os
  const userAgent = singleError.data.payload.enriched.useragent;
  // uid - duid
  const userId = singleError.data.payload.enriched.user_id;
  const duid = singleError.data.payload.enriched.domain_userid;

  // Tags:
  const appId = singleError.data.payload.enriched.app_id;
  const trackerVersion = singleError.data.payload.enriched.v_tracker;

  // After Json
  const microVersion = singleError.data.processor.artifact.version;
  const {
    deviceType,
    browserName,
    browserVersion,
    osName,
    osVersion,
    domainUserId,
    platform,
  } = extractUIErrorInfo(singleError);
  console.log(singleError);
  console.log(JSON.parse(singleError.data.payload.enriched.unstruct_event));

  return (
    <Display title={errorType} subtitle={page_url}>
      <Typography variant="body1">
        {DateTime.fromISO(errorTimestamp).toHTTP()}
        <br />
        <b>Event:</b> {eventId}
        <br /> <br />
        <b>Details:</b> {errorMessage}
      </Typography>

      <Divider sx={{ margin: "10px 0" }} />
      <Grid container>
        <Grid xs={12} item textAlign={"center"}>
          <AccountCircleIcon
            sx={{ width: "3em", height: "3em" }}
            color="greyLight"
          />
          <Typography variant="body2">
            <b>User ID:</b> {userId || "null"} <br />
            <b>Domain User ID:</b> {domainUserId}
          </Typography>
        </Grid>

        <Grid
          xs={8}
          item
          container
          justifyContent={"center"}
          alignItems={"center"}
          columnGap={1}
          rowGap={1}
          sx={{ margin: "0 auto" }}
        >
          <ErrorTag attribute="app id" value={appId} />
          <ErrorTag attribute="tracker version" value={trackerVersion} />
          <ErrorTag
            attribute="browser"
            value={`${browserName} ${browserVersion}`}
          />
          <ErrorTag attribute="operating system" value={osName} />
          <ErrorTag attribute="operating system version" value={osVersion} />
          <ErrorTag attribute="platform" value={platform} />
        </Grid>
      </Grid>
    </Display>
  );
}

// with trackSelfDescribingEvent({ event: { schema: "myschema.org", data: { test: 1 } } })
// Validation error does not show where there is an issue
// or is `singleError.data.failure.messages[0].error.dataReports[0].path` the path to the event structure
// maybe it is the path data.payload.enriched.unstruct_event .data.${path} in the case of unstruct event failure

function extractUIErrorInfo({ data }: { data: any }) {
  const userAgent = data.payload.enriched.useragent;
  const parser = new UAParser(userAgent);

  const { name: browserName, version: browserVersion } = parser.getBrowser();
  const { type: deviceType } = parser.getDevice();
  const { name: osName, version: osVersion } = parser.getOS();

  return {
    errorType: data.failure.messages[0].error.error,
    errorMessage: data.failure.messages[0].error.dataReports[0].message,
    pageUrl: data.payload.enriched.page_url,
    eventId: data.payload.enriched.event_id,
    errorTimestamp: data.failure.timestamp,
    browserName,
    browserVersion,
    deviceType,
    osName,
    osVersion,
    userId: data.payload.enriched.user_id,
    domainUserId: data.payload.enriched.domain_userid,
    appId: data.payload.enriched.app_id,
    // Check if we have friendly names list for trackers based on v_tracker
    trackerVersion: data.payload.enriched.v_tracker,
    platform: data.payload.enriched.platform,
  };
}

function ErrorTag({ attribute, value }: { attribute: string; value?: string }) {
  return (
    <Grid item sx={{ display: "flex", height: "fit-content" }}>
      <Box
        sx={{
          border: "1px solid gray",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          padding: "4px 8px",
          fontSize: "14px",
        }}
      >
        {attribute}
      </Box>
      <Box
        sx={{
          border: "1px solid gray",
          borderTopRightRadius: "4px",
          borderBottomRightRadius: "4px",
          padding: "4px 8px",
          borderLeft: 0,
          fontSize: "14px",
          color: "#6638B8",
          background: "#d3d3d3",
        }}
      >
        {value || "null"}
      </Box>
    </Grid>
  );
}
