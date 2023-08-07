import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, timelineItemClasses, TimelineSeparator } from "@mui/lab"
import { DateTime } from "luxon"

export function ErrorTimeline({ data, callback, activeEid }: { data: any, callback: any, activeEid: string }) {
    const handleCallback = (eid: any) => callback(eid)

    return (
        <Timeline sx={{
            [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
            },
        }} position="left">
            {data.map((error: any) => {
                const singleError = JSON.parse(error.errors[1])
                const eid = singleError.data.payload.enriched.event_id
                return (
                    <TimelineItem sx={{ cursor: "pointer" }} key={eid} onClick={() => handleCallback(eid)}>

                        <TimelineSeparator>
                            <TimelineDot color="primary" variant={activeEid == eid ? "filled" : "outlined"} />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{
                            fontSize: "20px",
                            fontWeight: "bold"
                        }}>{DateTime.fromISO(singleError.data.failure.timestamp).toFormat("HH':'mm")}</TimelineContent>
                    </TimelineItem>
                )
            })}
            <TimelineItem sx={{ cursor: "pointer" }} key={1}>
                <TimelineSeparator>
                    <TimelineDot color="secondary" variant="filled" />
                </TimelineSeparator>
                <TimelineContent sx={{
                    fontSize: "20px",
                    fontWeight: "bold"
                }}>Start</TimelineContent>
            </TimelineItem>
        </Timeline>)
}