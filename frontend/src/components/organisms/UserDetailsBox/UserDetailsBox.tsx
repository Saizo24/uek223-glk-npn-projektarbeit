import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { User } from "../../../types/models/User.model";
import { Nullable } from "../../../types/Nullable";

type Props = { user: Nullable<User> };

const UserDetailsBox = (user: Props) => {
  const [userDetails, setUserDetails] = useState(user);

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: 2,
        mb: 1,
      }}
    >
      <Typography>
        {userDetails.user?.email} {userDetails.user?.firstName}{" "}
        {userDetails.user?.lastName}
      </Typography>
      <Button onClick={() => {}} variant="outlined">
        Add new Post
      </Button>
    </Box>
  );
};

export default UserDetailsBox;
