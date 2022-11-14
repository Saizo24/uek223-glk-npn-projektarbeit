import { Link, Typography } from "@mui/material";
import React from "react";

/**
 * Introduction Page content, when visitors aren't logged in
 */
const LandingPageBox = () => {
  return (
    <div>
      <Typography variant="h2" align="center" mb={20} mt={20}>
        Hello and Welcome to our Blog-Posting-Website (definitely not Twitter)
      </Typography>
      <Typography variant="h3" align="center" mb={20}>
        <Link href="/login">Login</Link> to continue
      </Typography>
    </div>
  );
};

export default LandingPageBox;
