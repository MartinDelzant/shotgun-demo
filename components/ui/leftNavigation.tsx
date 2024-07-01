import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

export const DRAWER_WIDTH = 240;

export interface LeftNavProps extends React.PropsWithChildren {
  title: string;
  drawerTitle: string;
  drawerContent: React.ReactNode;
}

export default function LeftNav({
  title,
  drawerTitle,
  drawerContent,
  children,
}: LeftNavProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ width: "100%", textAlign: "center", marginTop: 2 }}
        >
          {drawerTitle}
        </Typography>
        <List>{drawerContent}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
