import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import { makeStyles } from "@material-ui/core";

// Define styles for the form
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    width: "100%"
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: '100%',
    
  },
}));

// Form component
const AddNewProject = ({ handleChange, handleSubmit, formData }) => {
  const classes = useStyles();
  return (

    <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
      <Grid container alignItems="center" className={classes.bodyHeader} direction="row"
        justifyContent="space-between"       
      >
        <Grid item xs={9}>
          <TextField
            className={classes.textField}
            label="Workspace Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}

            required
          />
        </Grid>
        <Grid item xs={3} style={{
          textAlign:"right"
        }}>
          <Button type="submit" variant="contained"
            style={{
              fontSize: 14,
              backgroundColor: "rgb(101, 77, 247)",
              color: "#ffffff",
              cursor: "pointer",
              textAlign: 'right',
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

