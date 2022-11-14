import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

type Props = {
  pageName: string;
  children?: HTMLElement | string;
};

/**
 * Component for Navbar. Homepage is exclusive for authenticated user, admin page for admins. Profile page can be accessed by admin and
 * regular users, but only admins can navigate to other users profile page through the admin page.
 */
export default function NavBar({ pageName }: Props) {
  const navigate = useNavigate();
  const { logout } = useContext(ActiveUserContext);
  const { user } = useContext(ActiveUserContext);
  const visible: boolean = pageName === "Someone's Blog" ? false : true;

  const handleSubmit = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        position: "sticky",
        top: 0,
        left: 0,
        flexDirection: "row",
        zIndex: 10,
      }}
    >
      <AppBar
        position="static"
        sx={{
          minHeight: "64px",
          justifyContent: "center",
          flex: 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Toolbar sx={{ maxWidth: "1920px", flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/homepage")}
            sx={{ display: visible ? undefined : "none" }}
          >
            {user && user.roles.some((role) => role.name === "ADMIN") ? "Admin Page" : "Homepage"}
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate(`/users/${user?.id}`)}
            sx={{ display: visible ? undefined : "none" }}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleSubmit}
            sx={{ display: visible ? undefined : "none" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
