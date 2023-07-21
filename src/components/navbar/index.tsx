import { Box, AppBar, Toolbar, Typography } from "@mui/material";

export function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, p: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Snowplow Micro{" "}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
