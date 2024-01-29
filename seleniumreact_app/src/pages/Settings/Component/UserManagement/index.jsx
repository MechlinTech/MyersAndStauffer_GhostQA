import React from "react";
import { useStyles } from "./styles";
import { Box } from "@material-ui/core";

export default function UserManagement() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.header}>User Management</Box>
    </>
  );
}
