import { rubik } from "@/theme";
import { Box, Paper, Typography } from "@mui/material";

interface DisplayProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function Display({ children, title, subtitle }: DisplayProps) {
  return (
    <Paper elevation={2} sx={{ borderRadius: "10px", padding: "28px" }}>
      <Box mb={4}>
        <Typography
          component="span"
          variant="h3semibold"
          sx={{ lineHeight: "28px" }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ fontFamily: rubik.style.fontFamily, fontWeight: "400" }}
          >
            &nbsp;{subtitle}
          </Typography>
        )}
      </Box>
      <Box>{children}</Box>
    </Paper>
  );
}
