import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

type Props = {
  pageName: string;
  children?: HTMLElement | string;
};

export default function NavBar({ pageName }: Props) {
  const navigate = useNavigate();
  const { logout } = useContext(ActiveUserContext);
  const visible: boolean = pageName === "Someone's Blog" ? true : false;

  const handleSubmit = () => {
    logout();
  };

  return (
    <Box sx={{ display: "flex", flex: 1, position: "sticky", top: 0, left: 0, flexDirection: "row" }}>
      <AppBar
        position="static"
        sx={{ minHeight: "64px", justifyContent: "center", flex: 1, display: "flex", flexDirection: "row" }}
      >
        <Toolbar
          sx={{ maxWidth: "1920px", flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/homepage")}
            disabled={visible}
          >
            {pageName === "Someone's Blog" ? "" : "Homepage"}
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/users/:userId")}
            disabled={visible}
          >
            {pageName === "Someone's Blog" ? "" : "Profile"}
          </Button>
          <Button color="inherit" onClick={handleSubmit} disabled={visible}>
            {pageName === "Someone's Blog" ? "" : "Logout"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
