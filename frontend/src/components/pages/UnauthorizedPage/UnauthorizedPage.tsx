import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Users will be navigated here when they try to access unauthorized spaces
 */
export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div>
      These are not the Droids you are looking for
      <Button
        onClick={() => {
          navigate(-3);
        }}
      >
        Return to previous Page
      </Button>
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Go to Login Page
      </Button>
    </div>
  );
}
