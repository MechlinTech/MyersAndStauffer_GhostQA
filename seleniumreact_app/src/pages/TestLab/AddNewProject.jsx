import React, { useState } from 'react';
import { TextField, Button, Container} from '@mui/material';
import { makeStyles } from "@material-ui/core";

// Define styles for the form
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '300px',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

// Form component
const AddNewProject = ({ handleChange, handleSubmit, formData }) => {
    const classes = useStyles();
    return (
        <Container>
            <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
                <TextField
                    className={classes.textField}
                    label="Project Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Add
                </Button>
            </form>
        </Container>
    );
};

export default AddNewProject;

