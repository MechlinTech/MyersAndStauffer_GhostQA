import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { StyledFormControl, StyledOutlinedInput } from "./styleTree";

// Define styles for the form
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    width: "100%",
  },
}));

// Form component
const AddNewProject = ({ handleChange, handleSubmit, formData }) => {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={1}
      >
        <Grid item xs={9}>
          <StyledFormControl>
            <StyledOutlinedInput
              placeholder="Workspace Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </StyledFormControl>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            textAlign: "right",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            style={{
              fontSize: 14,
              backgroundColor: "rgb(101, 77, 247)",
              color: "#ffffff",
              cursor: "pointer",
              textAlign: "right",
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewProject;
