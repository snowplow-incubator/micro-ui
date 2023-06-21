import type { AppProps } from "next/app";

import { muiTheme as mui } from '../theme'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
const muiTheme = createTheme(mui)


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}
