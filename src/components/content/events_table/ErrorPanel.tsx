import { Stack, Paper, Typography } from "@mui/material";
/* This is required as RJV is not SSR ready. */
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

type ErrorPanelProps = {
  row: {
    errors: string[];
  };
};

export function ErrorPanel({ row }: ErrorPanelProps) {
  return (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Error Details
          </Typography>
          <Typography variant="body1">{row.errors[0]}</Typography>
          <DynamicReactJson
            collapsed={3}
            quotesOnKeys={false}
            src={JSON.parse(row.errors[1])}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
