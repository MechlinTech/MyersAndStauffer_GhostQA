import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <div styles={{ marginTop: "15px" }}>
      <Grid container justify="center" alignItems="left" >
        <Grid item>
          <Typography paragraph style={{ marginBottom: "0" ,fontSize: "18px" , fontFamily: "Poppins" , lineHeight: "44px" , color: "#878787"}}>Copyright @ 2021-2022 Ghost QA</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
