import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { Typography, makeStyles } from "@material-ui/core";
import { StyledFormControl, StyledOutlinedInput } from "./styleTree";
import { StyledTypography } from "./styles";

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
  const [lengthOfWorkspace, setlengthOfWorkspace] = useState(0)
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
              onChange={(e)=>{
                setlengthOfWorkspace(e.target.value.length)
                handleChange(e)}}
              required
              inputProps={{ maxLength: 250 }}
            />
          </StyledFormControl>
          <Typography  style={{ color: 'red', fontSize: '10px', fontFamily: 'Lexend Deca' }} mb={1}>
            {lengthOfWorkspace===250 && "Input limit 250 letters"}
          </Typography>
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
