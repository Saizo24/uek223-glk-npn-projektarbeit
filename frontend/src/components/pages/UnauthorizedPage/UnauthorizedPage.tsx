import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoAuthoritiesPage() {
  const navigate = useNavigate();
  return (
    <div>
      These are not the Droids you are looking for
      <Button
        onClick={() => {
          navigate(-1);
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
