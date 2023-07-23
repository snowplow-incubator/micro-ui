import Box from "@mui/material/Box";

export function Layout({ children }: { children: React.ReactNode }) {
  return <Box height="100vh">{children}</Box>;
}
