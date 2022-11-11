import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import CopyRightIcon from "@mui/icons-material/Copyright";

/**
 * Bottom Navigationnn
 */

export default function BottomBar() {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <AppBar
        position="sticky"
        sx={{ minHeight: "64px", justifyContent: "center", flex: 1, bottom: 0, display: "flex", flexDirection: "row" }}
      >
        <Toolbar
          sx={{ maxWidth: "1920px", flex: 1 }}>
          <CopyRightIcon sx={{ mr: 2 }} /> Ngoc-Phuc Nguyen & Gian-Luca
          Kunfermann
        </Toolbar>
      </AppBar>
    </Box>
  );
}
