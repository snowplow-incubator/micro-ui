import { Stack, Paper, Typography } from "@mui/material";
/* This is required as RJV is not SSR ready. */
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

type GoodRowPanelProps = {
    row: {
        contexts: string[];
        event: object;
        eventType: string;
        rawEvent: object;
        schema: string;
    };
};

export function GoodRowPanel({ row }: GoodRowPanelProps) {
    return (
        <Stack
            sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
            direction="column"
        >
            <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
                <Stack direction="column" spacing={1} sx={{ height: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                        Event Details
                    </Typography>
                    <Typography variant="body1">{row.eventType} event</Typography>
                    <DynamicReactJson
                        collapsed={1}
                        quotesOnKeys={false}
                        src={row}
                    />
                </Stack>
            </Paper>
        </Stack>
    );
}
