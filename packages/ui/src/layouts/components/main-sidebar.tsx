"use client";

import { Drawer, List, ListItemButton, ListItemIcon, useTheme } from "@mui/material";
import { Home } from "@mui/icons-material";

export default function MainSidebar() {
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "95px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "95px",
          backgroundColor: theme.palette.sidebar.default, // Sidebar background from theme
          color: theme.palette.common.white, // Text color from theme
        },
      }}
    >
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Home sx={{ color: theme.palette.primary.light }} /> {/* Themed Home Icon */}
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
