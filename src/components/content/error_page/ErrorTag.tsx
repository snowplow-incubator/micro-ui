import { Box, Grid } from "@mui/material";

export function ErrorTag({ attribute, value }: { attribute: string; value?: string }) {
    return (
        <Grid item sx={{ display: "flex", height: "fit-content" }}>
            <Box
                sx={{
                    border: "1px solid #d3d3d3",
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}
            >
                {attribute}
            </Box>
            <Box
                sx={{
                    border: "1px solid #d3d3d3",
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                    padding: "4px 8px",
                    borderLeft: 0,
                    fontSize: "14px",
                    color: "#6638B8",
                }}
            >
                {value || "null"}
            </Box>
        </Grid>
    );
}
