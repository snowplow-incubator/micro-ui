import { common } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material/styles";
import { AlertClassKey } from "@mui/material/Alert";
import { AlertTitleClassKey } from "@mui/material/AlertTitle";
import { AutocompleteClassKey } from "@mui/material/Autocomplete";
import { ToggleButtonClassKey } from "@mui/material/ToggleButton";
import { ToggleButtonGroupClassKey } from "@mui/material/ToggleButtonGroup";
import { colors } from "./colors";
import { Rubik } from "next/font/google";

export const rubik = Rubik({ subsets: ["latin"] });

type SnColor = {
  "900": string;
  "800": string;
  "700": string;
  "600": string;
  "500": string;
  "400": string;
  "300": string;
  "200": string;
  "100": string;
  "50": string;
};

type colorKeys =
  | "primary"
  | "secondary"
  | "information"
  | "warning"
  | "error"
  | "grey"
  | "success";

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    color: {
      [key in colorKeys]: SnColor;
    };
    buttonShadows: {};
    fontWeight: typeof theme.fontWeight;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    color?: {
      [key in colorKeys]: SnColor;
    };
    buttonShadows: {};
    fontWeight: typeof theme.fontWeight;
  }
}

declare module "@mui/material/styles/overrides" {
  interface ComponentNameToClassKey {
    MuiAutocomplete: AutocompleteClassKey;
    MuiAlert: AlertClassKey;
    MuiAlertTitle: AlertTitleClassKey;
    MuiToggleButtonGroup: ToggleButtonGroupClassKey;
    MuiToggleButton: ToggleButtonClassKey;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h1semibold: React.CSSProperties;
    h2semibold: React.CSSProperties;
    h3semibold: React.CSSProperties;
    h4semibold: React.CSSProperties;
    h5semibold: React.CSSProperties;
    h6semibold?: React.CSSProperties;
    body1italic?: React.CSSProperties;
    body1semibold: React.CSSProperties;
    body2italic?: React.CSSProperties;
    body2semibold: React.CSSProperties;
    subtitle1semibold: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1semibold?: React.CSSProperties;
    h2semibold?: React.CSSProperties;
    h3semibold?: React.CSSProperties;
    h4semibold?: React.CSSProperties;
    h5semibold?: React.CSSProperties;
    h6semibold?: React.CSSProperties;
    body1italic?: React.CSSProperties;
    body1semibold?: React.CSSProperties;
    body2italic?: React.CSSProperties;
    body2semibold?: React.CSSProperties;
    subtitle1semibold?: React.CSSProperties;
  }

  interface TypeBackground {
    chip?: string;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1semibold: true;
    h2semibold: true;
    h3semibold: true;
    h4semibold: true;
    h5semibold: true;
    h6semibold: true;
    body1italic: true;
    body1semibold: true;
    body2italic: true;
    body2semibold: true;
    subtitle1semibold: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    primaryDark: Palette["primary"];
    primaryLight: Palette["primary"];
    warningLight: Palette["warning"];
    errorLight: Palette["error"];
    greyDefault: Palette["primary"];
    greyLight: Palette["primary"];
    infoLight: Palette["info"];
    successLight: Palette["success"];
    secondaryLight: Palette["secondary"];
  }
  interface PaletteOptions {
    primaryDark: PaletteOptions["primary"];
    primaryLight: PaletteOptions["primary"];
    warningLight: PaletteOptions["warning"];
    errorLight: PaletteOptions["error"];
    greyLight: PaletteOptions["primary"];
    greyDefault: PaletteOptions["primary"];
    infoLight: PaletteOptions["info"];
    successLight: PaletteOptions["success"];
    secondaryLight: PaletteOptions["secondary"];
  }

  interface PaletteColor {
    primaryLight?: string;
    primaryDark?: string;
    warningLight?: string;
    errorLight?: string;
    grey?: string;
    greyLight?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryLight: true;
    warningLight: true;
    errorLight: true;
    greyDefault: true;
    greyLight: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    primaryDark: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    primaryLight: true;
    secondaryLight: true;
    warningLight: true;
    errorLight: true;
    greyDefault: true;
    greyLight: true;
    successLight: true;
    infoLight: true;
  }
}

const theme = {
  color: { ...colors },
  font: {
    family: "Roboto, sans-serif",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    bold: 500,
  },
  fontSize: {
    tiny: "10px",
    small: "12px",
    medium: "14px",
    large: "16px",
    huge: "18px",
  },
  radii: {
    small: "2px",
    medium: "4px",
    large: "8px",
  },
  buttonShadows: {
    "&": {
      boxShadow:
        "0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(16, 24, 40, 0.05)",
    },
    "&:hover": {
      boxShadow:
        "inset 0 -2px 0 rgba(0, 0, 0, 0.2), inset 0 -3em 0 rgba(255, 255, 255, 0.15)",
    },
    "&:active": {
      boxShadow:
        "inset 2px 2px 0px rgba(0, 0, 0, 0.1), inset 0 -8em 0 rgba(0, 0, 0, 0.25)",
    },
  },
};

export const muiTheme: ThemeOptions = {
  color: theme.color,
  // these are the default mui breakponts from https://mui.com/material-ui/customization/breakpoints/
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280, // except this one, as stated in https://snplow.atlassian.net/browse/DM-204 this is what the design team uses
      xl: 1536, // based on the same ticket we might considered to change this to 1440px
    },
  },
  fontWeight: theme.fontWeight,
  buttonShadows: theme.buttonShadows,
  palette: {
    primary: {
      light: theme.color.primary["400"],
      main: theme.color.primary["500"],
      dark: theme.color.primary["700"],
      contrastText: common.white,
    },
    secondary: {
      light: theme.color.secondary["100"],
      main: theme.color.secondary["600"],
      dark: theme.color.secondary["600"],
      contrastText: common.white,
    },
    secondaryLight: {
      light: theme.color.secondary["100"],
      main: theme.color.secondary["100"],
      dark: theme.color.secondary["600"],
      contrastText: theme.color.secondary["800"],
    },
    warning: {
      light: theme.color.warning["100"],
      main: theme.color.warning["500"],
      dark: theme.color.warning["600"],
      contrastText: common.black,
    },
    warningLight: {
      light: theme.color.warning["100"],
      main: theme.color.warning["100"],
      dark: theme.color.warning["600"],
      contrastText: theme.color.warning["800"],
    },
    error: {
      light: theme.color.error["500"],
      main: theme.color.error["500"],
      dark: theme.color.error["600"],
      contrastText: common.white,
    },
    errorLight: {
      light: theme.color.warning["100"],
      main: theme.color.error["50"],
      dark: theme.color.warning["100"],
      contrastText: theme.color.error["700"],
    },
    primaryDark: {
      light: theme.color.primary["400"],
      main: theme.color.primary["500"],
      dark: theme.color.primary["700"],
      contrastText: common.white,
    },
    primaryLight: {
      light: theme.color.primary["50"],
      main: theme.color.primary["50"],
      contrastText: theme.color.primary["700"],
    },
    greyLight: {
      light: theme.color.grey["100"],
      main: theme.color.grey["200"],
      dark: theme.color.grey["100"],
      contrastText: theme.color.grey["800"],
    },
    greyDefault: {
      light: theme.color.grey["100"],
      main: theme.color.grey["700"],
      dark: theme.color.grey["500"],
      contrastText: common.white,
    },
    info: {
      light: theme.color.information["100"],
      main: theme.color.information["500"],
      dark: theme.color.information["500"],
      contrastText: common.white,
    },
    infoLight: {
      light: theme.color.information["100"],
      main: theme.color.information["100"],
      dark: theme.color.information["600"],
      contrastText: theme.color.information["800"],
    },
    successLight: {
      light: theme.color.success["100"],
      main: theme.color.success["100"],
      dark: theme.color.success["600"],
      contrastText: theme.color.success["800"],
    },
    success: {
      light: theme.color.success["100"],
      main: theme.color.success["600"],
      dark: theme.color.success["600"],
      contrastText: common.white,
    },
    background: {
      default: "#f2f4f7",
      chip: theme.color.information["100"],
    },
    text: {
      primary: "#101828",
    },
  },
  shadows: [
    "none",
    "0px 0px 2px 0px rgba(0, 0, 0, 0.16)",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.16)",
    "0px 1px 6px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 8px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
    "0px 0px 16px 0px rgba(0, 0, 0, 0.24)",
  ],
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontSize: "32px",
      fontWeight: theme.fontWeight.normal,
      fontFamily: rubik.style.fontFamily,
    },
    h2: {
      fontSize: "28px",
      fontWeight: theme.fontWeight.normal,
      fontFamily: rubik.style.fontFamily,
      lineHeight: "32px",
    },
    h3: {
      fontSize: "24px",
      letterSpacing: "0px",
      lineHeight: "24px",
      fontWeight: theme.fontWeight.normal,
      fontFamily: rubik.style.fontFamily,
    },
    h4: {
      fontSize: "20px",
      fontWeight: theme.fontWeight.normal,
      letterSpacing: "0px",
      lineHeight: "20px",
      fontFamily: rubik.style.fontFamily,
    },
    h5: {
      fontSize: "18px",
      fontWeight: theme.fontWeight.normal,
      fontFamily: rubik.style.fontFamily,
      lineHeight: "20px",
    },
    h6: {
      fontFamily: rubik.style.fontFamily,
    },
    body1: {
      fontSize: "16px",
      fontWeight: theme.fontWeight.normal,
      letterSpacing: "0px",
      lineHeight: "24px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: theme.fontWeight.normal,
      lineHeight: "20px",
    },
    subtitle1: {
      fontWeight: theme.fontWeight.bold,
      fontSize: "14px",
      lineHeight: "16px",
    },
    h1semibold: {
      fontSize: "32px",
      fontWeight: theme.fontWeight.bold,
      fontFamily: rubik.style.fontFamily,
    },
    h2semibold: {
      fontSize: "28px",
      fontWeight: theme.fontWeight.bold,
      fontFamily: rubik.style.fontFamily,
      lineHeight: "32px",
    },
    h3semibold: {
      fontWeight: theme.fontWeight.bold,
      fontSize: "24px",
      letterSpacing: "0px",
      lineHeight: "24px",
      fontFamily: rubik.style.fontFamily,
    },
    h4semibold: {
      fontSize: "20px",
      fontWeight: theme.fontWeight.bold,
      letterSpacing: "0px",
      lineHeight: "20px",
      fontFamily: rubik.style.fontFamily,
    },
    h5semibold: {
      fontSize: "18px",
      fontWeight: theme.fontWeight.bold,
      fontFamily: rubik.style.fontFamily,
      lineHeight: "20px",
    },
    h6semibold: {
      fontWeight: theme.fontWeight.bold,
      fontFamily: rubik.style.fontFamily,
    },
    body1semibold: {
      fontSize: "16px",
      fontWeight: theme.fontWeight.bold,
      letterSpacing: "0px",
      lineHeight: "24px",
      //TODO: the default font doesnt appear to get attached to these custom variants. Re-adding here until I can work out why not
      fontFamily: "Roboto, sans-serif",
    },
    body1italic: {
      fontSize: "16px",
      fontStyle: "italic",
      letterSpacing: "0px",
      lineHeight: "24px",
      fontWeight: theme.fontWeight.normal,
    },
    body2semibold: {
      fontSize: "14px",
      fontWeight: theme.fontWeight.bold,
      //TODO: the default font doesnt appear to get attached to these custom variants. Re-adding here until I can work out why not
      fontFamily: "Roboto, sans-serif",
      lineHeight: "20px",
    },
    body2italic: {
      fontSize: "14px",
      lineHeight: "20px",
      fontStyle: "italic",
      //TODO: the default font doesnt appear to get attached to these custom variants. Re-adding here until I can work out why not
      fontFamily: "Roboto, sans-serif",
      fontWeight: theme.fontWeight.normal,
    },
    subtitle1semibold: {
      fontWeight: theme.fontWeight.bold,
      fontSize: "14px",
      lineHeight: "16px",
      //TODO: the default font doesnt appear to get attached to these custom variants. Re-adding here until I can work out why not
      fontFamily: "Roboto, sans-serif",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButtonGroup: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          fontWeight: theme.fontWeight.normal,
          "& > .MuiButton-contained": {
            "&:active": {
              outline: "none",
            },
          },
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: "always" },
      styleOverrides: {
        root: {
          textDecorationColor: theme.color.primary["500"],
        },
      },
    },
    MuiIcon: {
      defaultProps: { fontSize: "inherit" },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          padding: "0px",
          borderRadius: "none",
        },
        message: {
          width: "100%",
          padding: ".75rem 16px",
        },
        icon: {
          padding: "0.75rem 8px 0.75rem 8px",
          marginRight: 0,
        },
        standardError: {
          "& > .MuiAlert-message": {
            color: common.black,
            backgroundColor: theme.color.error["100"],
            "& > p": {
              marginTop: "0.35rem",
            },
          },
          "& > .MuiAlert-icon": {
            color: common.black,
            backgroundColor: theme.color.error["500"],
            fontSize: "24px",
          },
          "& > .MuiAlert-action": {
            padding: "12px 16px 0px 16px",
            marginRight: 0,
            "& > .MuiButtonBase-root.MuiIconButton-root": {
              padding: 0,
              "& > .MuiSvgIcon-root": {
                fontSize: "24px",
              },
            },
          },
        },
        standardWarning: {
          backgroundColor: theme.color.warning["100"],
          "& > .MuiAlert-message": {
            color: common.black,
            "& > p": {
              marginTop: "0.35rem",
            },
          },
          "& > .MuiAlert-icon": {
            color: common.black,
            backgroundColor: theme.color.warning["500"],
            fontSize: "24px",
          },
          "& > .MuiAlert-action": {
            padding: "12px 16px 0px 16px",
            marginRight: 0,
            "& > .MuiButtonBase-root.MuiIconButton-root": {
              padding: 0,
              "& > .MuiSvgIcon-root": {
                fontSize: "24px",
              },
            },
          },
        },
        standardInfo: {
          backgroundColor: theme.color.information["50"],
          "& > .MuiAlert-message": {
            color: common.black,
            "& > p": {
              marginBottom: "8px",
            },
          },
          "& > .MuiAlert-icon": {
            color: common.black,
            backgroundColor: theme.color.information["500"],
            fontSize: "24px",
          },
          "& > .MuiAlert-action": {
            padding: "12px 16px 0px 16px",
            marginRight: 0,
            "& > .MuiButtonBase-root.MuiIconButton-root": {
              padding: 0,
              "& > .MuiSvgIcon-root": {
                fontSize: "24px",
              },
            },
          },
        },
        standardSuccess: {
          backgroundColor: theme.color.success["100"],
          "& > .MuiAlert-message": {
            color: common.black,
            "& > p": {
              marginTop: "0.35rem",
            },
          },
          "& > .MuiAlert-icon": {
            color: common.black,
            backgroundColor: theme.color.success["500"],
            fontSize: "24px",
          },
          "& > .MuiAlert-action": {
            padding: "12px 16px 0px 16px",
            marginRight: 0,
            "& > .MuiButtonBase-root.MuiIconButton-root": {
              padding: 0,
              "& > .MuiSvgIcon-root": {
                fontSize: "24px",
              },
            },
          },
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          backgroundColor: common.white,
          '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            paddingTop: "16px",
            paddingBottom: "16px",
          },
          '&[class*="MuiOutlinedInput-root"] .MuiOutlinedInput-input.MuiAutocomplete-input':
            {
              padding: 0,
            },
          "& input::placeholder": {
            color: theme.color.grey["500"],
            opacity: 1,
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: theme.color.grey["100"],
          padding: "24px 24px 24px 48px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px 48px 24px 48px",
          "&.MuiDialogContent-root": {
            paddingTop: "24px",
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1semibold: "h1",
          h2semibold: "h2",
          h3semibold: "h3",
          h4semibold: "h4",
          h5semibold: "h5",
          h6semibold: "h6",
          body1italic: "p",
          body1semibold: "p",
          body2italic: "p",
          body2semibold: "p",
          subtitle1semibold: "h6",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        multiline: {
          padding: "1rem",
        },
        root: {
          "&.Mui-disabled": {
            color: theme.color.grey["700"],
            backgroundColor: theme.color.grey["200"],
          },
          "& input::placeholder": {
            color: theme.color.grey["500"],
            opacity: 1,
            fontSize: theme.fontSize.medium,
            lineHeight: "20px",
          },
          " & .MuiInputBase-inputMultiline": {
            "::placeholder": {
              color: theme.color.grey["500"],
              opacity: 1,
              fontSize: theme.fontSize.medium,
              lineHeight: "20px",
            },
          },
        },
        input: {
          "&.Mui-disabled": {
            WebkitTextFillColor: "#000",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: theme.radii.medium,
          fontWeight: 500,
        },
        clickable: {
          "&:focus": {
            boxShadow:
              "inset 0 -2px 0 rgba(0, 0, 0, 0.2), inset 0 -3em 0 rgba(255, 255, 255, 0.15)",
          },
          "&:hover": {
            boxShadow:
              "inset 0 -2px 0 rgba(0, 0, 0, 0.2), inset 0 -3em 0 rgba(255, 255, 255, 0.15)",
          },
          "&:active": {
            boxShadow:
              "inset 2px 2px 0px rgba(0, 0, 0, 0.1), inset 0 -8em 0 rgba(0, 0, 0, 0.25)",
          },
          transition: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          position: "absolute" as "absolute",
          right: 0,
          top: 0,
          marginBottom: 0,
          bottom: 0,
          borderRadius: `${theme.radii.large} ${theme.radii.large} 0 0`,
          maxHeight: "100%",
        },
        paperWidthSm: {
          maxWidth: "640px",
        },
        paperWidthMd: {
          maxWidth: "800px",
        },
        paperWidthLg: {
          maxWidth: "960px",
        },
        paperScrollPaper: {
          maxHeight: "calc(100% - 24px)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: theme.fontWeight.bold,
          "&.Mui-disabled": {
            border: `1px solid ${theme.color.grey["200"]}`,
            background: theme.color.grey["200"],
            color: theme.color.grey["400"],
          },
        },
        textPrimary: {
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        text: {
          fontWeight: theme.fontWeight.normal,
          boxShadow: "none",
          textTransform: "none",
          textDecoration: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "transparent",
            textDecoration: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "transparent",
            textDecoration: "none",
          },
          "&.Mui-disabled": {
            border: "none",
            background: "transparent",
            color: theme.color.grey["400"],
          },
          "&.MuiButton-textPrimaryLight": {
            border: "1px solid transparent",
            background: "transparent",
            color: common.white,
            textDecoration: "none",
            transition: "none",
            "&:hover": {
              border: `1px solid transparent`,
              boxShadow:
                "inset 0px -2px 0px rgba(0, 0, 0, 0.15), inset 0px 48px 0px rgba(255, 255, 255, 0.15)",
            },
            "&:active": {
              outline: `4px solid ${theme.color.primary["100"]}`,
              border: `1px solid ${theme.color.primary["100"]}`,
              background: theme.color.primary["200"],
              boxShadow: "0px 0px 0px 4px #FEE4E2",
              filter: "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))",
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
        },
        sizeMedium: {
          padding: "10px 16px",
          fontSize: "14px",
          lineHeight: "20px",
        },
        sizeSmall: {
          padding: "6px 12px",
          fontSize: "14px",
          lineHeight: "20px",
        },
        sizeLarge: {
          padding: "12px 20px",
          fontSize: "16px",
          lineHeight: "24px",
        },
        contained: {
          boxShadow:
            "0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(16, 24, 40, 0.05)",
          "&:hover": {
            transition: "none",
            boxShadow:
              "inset 0px -2px 0px rgba(0, 0, 0, 0.15), inset 0px 48px 0px rgba(255, 255, 255, 0.15)",
          },
          "&.MuiButton-containedPrimaryLight": {
            border: `1px solid ${theme.color.primary["50"]}`,
            background: theme.color.primary["50"],
            color: theme.color.primary["700"],
            "&:hover": {
              border: `1px solid ${theme.color.primary["50"]}`,
              background: theme.color.primary["50"],
            },
            "&:active": {
              border: `1px solid ${theme.color.primary["100"]}`,
              outline: `4px solid ${theme.color.primary["50"]}`,
              background: theme.color.primary["100"],
              boxShadow:
                "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF",
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
          "&.MuiButton-containedErrorLight": {
            border: `1px solid ${theme.color.error["50"]}`,
            background: theme.color.error["50"],
            color: theme.color.error["700"],
            "&:hover": {
              background: theme.color.error["50"],
            },
            "&:active": {
              border: `1px solid ${theme.color.error["100"]}`,
              background: theme.color.error["100"],
              boxShadow:
                "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2",
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
          "&.MuiButton-containedWarningLight": {
            border: `1px solid ${theme.color.warning["50"]}`,
            background: theme.color.warning["50"],
            color: theme.color.warning["800"],
            "&:hover": {
              background: theme.color.warning["50"],
            },
            "&:active": {
              outline: `4px solid ${theme.color.warning["50"]}`,
              border: `1px solid ${theme.color.warning["100"]}`,
              background: theme.color.warning["100"],
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
          "&.MuiButton-containedGreyDefault": {
            border: `1px solid ${theme.color.grey["700"]}`,
            background: theme.color.grey["700"],
            color: common.white,
            "&:hover": {
              border: `1px solid ${theme.color.grey["500"]}`,
              background: theme.color.grey["500"],
            },
            "&:active": {
              outline: `4px solid ${theme.color.grey["200"]}`,
              border: `1px solid ${theme.color.grey["800"]}`,
              background: theme.color.grey["800"],
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
          "&.MuiButton-containedGreyLight": {
            border: `1px solid ${theme.color.grey["200"]}`,
            background: theme.color.grey["200"],
            color: theme.color.grey["800"],
            "&:hover": {
              border: `1px solid ${theme.color.grey["100"]}`,
              background: theme.color.grey["100"],
            },
            "&:active": {
              border: `1px solid ${theme.color.grey["300"]}`,
              background: theme.color.grey["300"],
              boxShadow:
                "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #E4E7EC",
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
        },
        containedPrimary: {
          border: `1px solid ${theme.color.primary["500"]}`,
          "&:hover": {
            background: theme.color.primary["500"],
          },
          "&:active": {
            outline: `4px solid ${theme.color.primary["100"]}`,
            background: theme.color.primary["600"],
            boxShadow:
              "0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(16, 24, 40, 0.05)",
          },
          "&.Mui-disabled": {
            border: `1px solid ${theme.color.grey["200"]}`,
            background: theme.color.grey["200"],
            color: theme.color.grey["400"],
          },
        },
        containedError: {
          border: `1px solid ${theme.color.error["500"]}`,
          background: theme.color.error["500"],
          "&:hover": {
            background: theme.color.error["500"],
          },
          "&:active": {
            outline: `4px solid ${theme.color.error["100"]}`,
            background: theme.color.error["600"],
            boxShadow:
              "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2",
          },
          "&.Mui-disabled": {
            border: `1px solid ${theme.color.grey["200"]}`,
            background: theme.color.grey["200"],
            color: theme.color.grey["400"],
          },
        },
        containedWarning: {
          border: `1px solid ${theme.color.warning["500"]}`,
          background: theme.color.warning["500"],
          color: theme.color.warning["800"],
          "&:hover": {
            background: theme.color.warning["500"],
          },
          "&:active": {
            outline: `4px solid ${theme.color.warning["50"]}`,
            background: theme.color.warning["600"],
          },
          "&.Mui-disabled": {
            border: `1px solid ${theme.color.grey["200"]}`,
            background: theme.color.grey["200"],
            color: theme.color.grey["400"],
          },
        },
        outlined: {
          transition: "none",
          "&.MuiButton-outlinedGreyLight": {
            border: `1px solid ${theme.color.grey["300"]}`,
            background: common.white,
            color: theme.color.grey["800"],
            "&:hover": {
              border: `1px solid ${theme.color.grey["400"]}`,
              boxShadow: "none",
            },
            "&:active": {
              outline: `4px solid ${theme.color.grey["300"]}`,
              border: `1px solid ${theme.color.grey["100"]}`,
              background: theme.color.grey["100"],
              boxShadow:
                "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #E4E7EC",
            },
            "&.Mui-disabled": {
              border: `1px solid ${theme.color.grey["200"]}`,
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
        },
        outlinedPrimary: {
          border: `1px solid ${theme.color.primary["200"]}`,
          background: "transparent",
          color: theme.color.grey["700"],
          "&:hover": {
            border: `1px solid ${theme.color.primary["50"]}`,
            background: theme.color.primary["50"],
            boxShadow:
              "inset 0px -2px 0px rgba(0, 0, 0, 0.15), inset 0px 48px 0px rgba(255, 255, 255, 0.15)",
          },
          "&:active": {
            outline: `4px solid ${theme.color.primary["100"]}`,
            border: `1px solid ${theme.color.primary["100"]}`,
            background: theme.color.primary["50"],
            boxShadow: "0px 0px 0px 4px #FEE4E2",
            filter: "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))",
          },
          "&.Mui-disabled": {
            border: `1px solid ${theme.color.grey["200"]}`,
            background: theme.color.grey["200"],
            color: theme.color.grey["400"],
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.color.grey["700"],
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        contained: {
          margin: "8px 0",
        },
        root: {
          fontSize: theme.fontSize.medium,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
          "&.MuiMenuItem-root.Mui-selected": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          marginRight: "8px",
          "&.MuiListItemIcon-root": {
            minWidth: 0,
            marginRight: "16px",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          ".MuiMenuItem-root": {
            color: theme.color.grey["800"],
            fontSize: theme.fontSize.medium,
            lineHeight: "20px",
            padding: "10px 16px",
            "&:hover": {
              background: theme.color.grey["100"],
            },
            ".MuiListItemIcon-root": {
              fontSize: theme.fontSize.large,
              ".MuiSvgIcon-root": {
                fill: theme.color.grey["800"],
              },
            },
          },
          ".MuiDivider-root": {
            borderColor: theme.color.grey["100"],
            margin: 0,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: theme.color.primary["500"],
          },
          "&.Mui-disabled": {
            color: "rgba(0, 0, 0, 0.26)",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
        colorPrimary: {
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
          "&.Mui-checked": {
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:active": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        colorPrimary: {
          "&.Mui-checked": {
            boxShadow: "none",
            backgroundColor: "transparent",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "transparent",
            },
            "&:active": {
              boxShadow: "none",
              backgroundColor: "transparent",
            },
          },
        },
        root: {
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "transparent",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "transparent",
          },
          "&.Mui-checked": {
            boxShadow: "none",
            backgroundColor: "transparent",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "transparent",
            },
            "&:active": {
              boxShadow: "none",
              backgroundColor: "transparent",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-internal-autofill-selected$disabled": {
            color: "rgba(0, 0, 0, 0.38) !important",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        select: {
          fontFamily: "Roboto, sans-serif",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          overflow: "visible",
          marginBottom: 16,
          "& .MuiTabs-indicator": {
            transition: "none",
            height: "4px",
          },

          "& .MuiTabs-scroller": {
            overflow: "visible !important",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 0,
          textTransform: "none",
          fontWeight: theme.fontWeight.normal,
          borderBottom: `4px solid ${theme.color.grey["200"]}`,
          color: theme.color.grey["900"],
          "&.Mui-selected": {
            color: theme.color.grey["900"],
            fontWeight: theme.fontWeight.bold,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& tr:last-of-type > td": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontFamily: rubik.style.fontFamily,
            textTransform: "uppercase",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: theme.fontSize.large,
          fontWeight: theme.fontWeight.normal,
          backgroundColor: theme.color.grey["700"],
          borderRadius: theme.radii.large,
          padding: "14px 16px",
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.5)",
        },
        arrow: {
          color: theme.color.grey["700"],
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.radii.small,
          transition: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.MuiIconButton-colorPrimaryDark": {
            border: `1px solid ${theme.color.primary["500"]}`,
            background: theme.color.primary["500"],
            color: common.white,
            borderRadius: theme.radii.medium,
            "&:hover": {
              boxShadow:
                "inset 0px -2px 0px rgba(0, 0, 0, 0.15), inset 0px 48px 0px rgba(255, 255, 255, 0.15)",
            },
            "&:focus": {
              background: theme.color.primary["600"],
              outline: `4px solid ${theme.color.primary["100"]}`,
            },
            "&.Mui-disabled": {
              background: theme.color.grey["200"],
              color: theme.color.grey["400"],
              border: `1px solid ${theme.color.grey["200"]}`,
            },
          },
          "&.MuiIconButton-colorWarning": {
            border: `1px solid ${theme.color.warning["500"]}`,
            background: theme.color.warning["500"],
            color: common.black,
            borderRadius: theme.radii.medium,
            "&:hover": {
              boxShadow:
                "inset 0px -2px 0px rgba(0, 0, 0, 0.15), inset 0px 48px 0px rgba(255, 255, 255, 0.15)",
            },
          },
        },

        colorPrimary: {
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        },
        sizeSmall: {
          padding: "6px",
        },
        sizeMedium: {
          padding: "10px",
        },
        sizeLarge: {
          padding: "12px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: theme.color.grey["700"],
          fontSize: "16px",
          textTransform: "none",
          fontWeight: theme.fontWeight.normal,
          borderRadius: theme.radii.medium,
          borderColor: theme.color.grey["200"],
          background: common.white,
          lineHeight: "24px",
          "&:hover": {
            background: theme.color.grey["100"],
          },
          "&.MuiToggleButton-standard": {
            "&.Mui-selected": {
              backgroundColor: theme.color.grey["700"],
              color: common.white,
              "&:hover": {
                backgroundColor: theme.color.grey["700"],
                color: common.white,
              },
              "&.Mui-disabled": {
                backgroundColor: theme.color.grey["200"],
                borderColor: theme.color.grey["200"],
                color: theme.color.grey["400"],
              },
            },
            "&.Mui-disabled": {
              borderColor: theme.color.grey["200"],
              color: theme.color.grey["200"],
            },
            "&.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
              borderLeft: `1px solid ${theme.color.grey["200"]}`,
            },
            "&.MuiToggleButtonGroup-grouped.Mui-selected": {
              backgroundColor: theme.color.grey["700"],
              color: common.white,
              "&:hover": {
                backgroundColor: theme.color.grey["700"],
                color: common.white,
              },
            },
            "&.MuiToggleButtonGroup-grouped.Mui-disabled.Mui-disabled": {
              borderColor: theme.color.grey["200"],
              color: theme.color.grey["200"],
            },
            "&.MuiToggleButtonGroup-grouped.Mui-selected.Mui-disabled": {
              backgroundColor: theme.color.grey["200"],
              borderColor: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
          "&.MuiToggleButton-primary": {
            "&.Mui-selected": {
              backgroundColor: theme.color.primary["500"],
              color: common.white,
              "&:hover": {
                backgroundColor: theme.color.primary["500"],
                color: common.white,
              },
              "&.Mui-disabled": {
                backgroundColor: theme.color.grey["200"],
                borderColor: theme.color.grey["200"],
                color: theme.color.grey["400"],
              },
            },
            "&.Mui-disabled": {
              borderColor: theme.color.grey["200"],
              color: theme.color.grey["200"],
            },
            "&.MuiToggleButtonGroup-grouped:not(:first-of-type)": {
              borderLeft: `1px solid ${theme.color.grey["200"]}`,
            },
            "&.MuiToggleButtonGroup-grouped.Mui-selected": {
              backgroundColor: theme.color.primary["500"],
              color: common.white,
              "&:hover": {
                backgroundColor: theme.color.primary["500"],
                color: common.white,
              },
            },
            "&.MuiToggleButtonGroup-grouped.Mui-disabled.Mui-disabled": {
              borderColor: theme.color.grey["200"],
              color: theme.color.grey["200"],
            },
            "&.MuiToggleButtonGroup-grouped.Mui-selected.Mui-disabled": {
              backgroundColor: theme.color.grey["200"],
              borderColor: theme.color.grey["200"],
              color: theme.color.grey["400"],
            },
          },
        },
        sizeSmall: {
          padding: "4px 8px",
          fontSize: "14px",
        },
        sizeMedium: {
          padding: "8px 16px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          minWidth: "50%",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: "42px",
          height: "26px",
          padding: 0,
          margin: "8px",
        },

        switchBase: {
          padding: "3px",
          "&.Mui-checked": {
            "& + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: theme.color.primary[300],
            },
            transform: "translateX(14px)",
          },
        },

        thumb: {
          marginLeft: "1px",
          color: common.white,
          width: "20px",
          height: "20px",
        },

        track: {
          borderRadius: "9999px",
          border: 0,
          backgroundColor: theme.color.grey[500],
          opacity: 1,
          transition: "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
  },
};

export default theme;
