import Box from "@mui/material/Box";
import { Rubik } from "next/font/google";
import { Navigation } from "./navigation";
import { Toolbar } from "@mui/material";

const rubik = Rubik({ subsets: ["latin"] });

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box height="100vh" sx={{ display: "flex" }} className={rubik.className}>
      <Navigation />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      >
        <Toolbar />
        <Box
          sx={{
            maxWidth: "1260px",
            backgroundColor: "#f2f4f7",
            margin: "0 auto",
          }}
          p={3}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
