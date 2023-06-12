import { extendTheme } from "@chakra-ui/react";

/* Extend the theme to include custom colors, fonts, etc */
const colors = {
  secondary: "#1d2939",
};

const fonts = {
  heading: "var(--font-rubik)",
  body: "var(--font-rubik)",
};

export const theme = extendTheme({ colors, fonts });
