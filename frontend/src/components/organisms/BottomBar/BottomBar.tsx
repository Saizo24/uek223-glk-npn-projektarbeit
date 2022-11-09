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
        position="static"
        sx={{ minHeight: "64px", justifyContent: "center", flex: 1 }}
      >
        <Toolbar>
          <CopyRightIcon sx={{ mr: 2 }} /> Ngoc-Phuc Nguyen & Gian-Luca
          Kunfermann
        </Toolbar>
      </AppBar>
    </Box>
  );
}
