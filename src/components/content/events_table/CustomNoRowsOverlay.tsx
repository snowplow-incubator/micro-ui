import { Box, SvgIcon } from "@mui/material";
import SnowplowLogo from "./logo.svg";

export function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        filter: "grayscale(0.7)",
      }}
    >
      <SvgIcon
        component={SnowplowLogo}
        viewBox="0 0 300 360"
        sx={{ width: 35, height: 35 }}
      />
      No Events Available
    </Box>
  );
}
