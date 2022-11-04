import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  pageName: string;
  children?: HTMLElement | string;
};

export default function NavBar({ pageName }: Props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <AppBar
        position="static"
        sx={{ minHeight: "64px", justifyContent: "center", flex: 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
          <Button color="inherit" onClick={() => navigate("/homepage")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
