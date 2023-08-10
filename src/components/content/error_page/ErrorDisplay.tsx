import { Divider, Grid, Typography, Stack, Paper, IconButton } from "@mui/material";
import { DateTime } from "luxon";
import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { extractUIErrorInfo } from './utils'
import { ErrorTag } from './ErrorTag'

export function ErrorDisplay({ singleError }: { singleError: any }) {
    const {
        errorType,
        pageUrl,
        eventId,
        userId,
        appId,
        trackerVersion,
        deviceType,
        errorMessage,
        errorTimestamp,
        browserName,
        browserVersion,
        osName,
        osVersion,
        domainUserId,
        platform,
        schema
    } = extractUIErrorInfo(singleError);

    const [openError, setOpenError] = useState(false)

    function handleOpen() {
        setOpenError(!openError)
    }

    return (
        <Paper elevation={2} sx={{ borderRadius: "10px", padding: "28px", minWidth: "45pc" }}>
            <Grid container alignItems={"stretch"} justifyContent={"space-between"} spacing={2}>
                <Grid
                    item
                    container
                    direction={"column"}
                    justifyContent={"flex-start"}
                    xs={6}
                >
                    <Typography variant="h3semibold"  >
                        <b>{errorType}</b>
                    </Typography>
                    <Typography variant="h4" color={"gray"}>
                        Error whilst validating the event
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    justifyContent={"flex-start"}
                    xs={3}
                    alignContent={"flex-end"}
                >
                    <Typography variant="h4" align="right" color={"gray"}>
                        APP ID
                    </Typography>
                    <Typography variant="body1" align="right" >
                        <b>{appId || "null"}</b>
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    justifyContent={"flex-start"}
                    xs={3}
                    alignContent={"flex-end"}
                >
                    <Typography variant="h4" align="right" color={"gray"}>
                        TIMESTAMP
                    </Typography>
                    <Typography variant="body1" align="right">
                        <b> {DateTime.fromISO(errorTimestamp).toFormat("DD HH':'mm") || "null"} </b>
                    </Typography>
                </Grid>
            </Grid>
            <Typography
                variant="h5"
                paddingTop={3}
                paddingBottom={2}
            >
                <b>Details: </b>
                {errorMessage.map((error: any, i: number) => {
                    return (
                        <p key={i}>- {error.message}</p>
                    )
                })}
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Grid container spacing={1} justifyContent={"flex-start"} paddingTop={2} paddingBottom={2}>
                <ErrorTag attribute="event id" value={eventId} />
                <ErrorTag attribute="schema" value={schema} />
                <ErrorTag attribute="tracker version" value={trackerVersion} />
                <ErrorTag
                    attribute="browser"
                    value={`${browserName} ${browserVersion}`}
                />
                <ErrorTag attribute="platform" value={platform} />
                <ErrorTag attribute="operating system" value={osName} />
                <ErrorTag attribute="operating system version" value={osVersion} />
            </Grid>
            <Grid container spacing={1} alignItems={"flex-start"} paddingTop={2} paddingBottom={2} direction='column'>
                <IconButton
                    size="small"
                    tabIndex={-1}
                    onClick={handleOpen}
                >
                    <AddCircleOutlineIcon fontSize="inherit" />View Detail
                </IconButton>
                {openError &&
                    <Stack
                        sx={{ height: "100%", width: "100%", boxSizing: "border-box" }}
                        direction="column"
                    >
                        <Paper sx={{ flex: 1, overflowX: 'scroll' }}>
                            <Stack direction="column" sx={{ height: 1 }}>
                                <DynamicReactJson
                                    collapsed={3}
                                    quotesOnKeys={false}
                                    src={singleError}
                                />
                            </Stack>
                        </Paper>
                    </Stack>}
            </Grid>
        </Paper >
    )

}
