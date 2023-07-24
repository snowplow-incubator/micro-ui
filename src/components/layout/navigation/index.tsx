import DashboardIcon from "@mui/icons-material/Dashboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const drawerWidth: number = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps & { open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    background: "#1D1034",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            sx={{
              ...(open && { display: "none" }),
              color: "white",
              marginLeft: "-10px",
              marginRight: "26px",
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" component="div">
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                marginRight: "4px",
              }}
              variant="h3"
              component="span"
            >
              Snowplow{" "}
            </Typography>
            Micro
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer sx={{ background: "#1D1034" }} variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            backgroundColor: "#1D1034",
          }}
        >
          <IconButton sx={{ color: "white" }} onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider color="white" />
        <List component="nav">
          <ListItemButton sx={{ marginLeft: "5px" }}>
            <ListItemIcon sx={{ color: "white", minWidth: "49px" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: "h4" }}
              primary="Dashboard"
            />
          </ListItemButton>
          <ListItemButton sx={{ marginLeft: "5px" }}>
            <ListItemIcon sx={{ color: "white", minWidth: "49px" }}>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: "h4" }}
              primary="Config"
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
