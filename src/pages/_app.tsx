import type { AppProps } from "next/app";

import { muiTheme as mui } from "../theme";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { Rubik } from "next/font/google";
import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE_KEY as string);
const rubik = Rubik({ subsets: ["latin"] });
const muiTheme = createTheme(mui);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Component className={rubik.className} {...pageProps} />
    </MuiThemeProvider>
  );
}
