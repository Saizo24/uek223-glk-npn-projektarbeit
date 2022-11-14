import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { User } from "../../../types/models/User.model";
import { Nullable } from "../../../types/Nullable";

type Props = {
  user: Nullable<User>
};

/**
 * Box displaying personal info of an user
 */
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
        Name = {userDetails.user?.firstName} {userDetails.user?.lastName}
      </Typography>
      <Typography>Email = {userDetails.user?.email}</Typography>
    </Box>
  );
};

export default UserDetailsBox;
