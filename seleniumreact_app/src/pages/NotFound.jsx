import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function NotFound() {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h2">
          Page You are looking for is not available
        </Typography>
        <Typography paragraph color="primary">
          404 page not found
        </Typography>
      </Grid>
    </Grid>
  );
}
