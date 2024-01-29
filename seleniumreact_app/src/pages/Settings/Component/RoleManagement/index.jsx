import React from "react";
import { useStyles } from "./styles";
import { Box } from "@material-ui/core";

export default function RoleManagement() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.header}>Roles Management</Box>
    </>
  );
}
