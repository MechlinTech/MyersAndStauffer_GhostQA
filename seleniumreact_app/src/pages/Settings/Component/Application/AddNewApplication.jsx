import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import clsx from "clsx";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  OutlinedInput,
  Box,
  Card,
} from "@mui/material";

import { AddUpdateApplication } from "../../../../redux/actions/settingAction";
import { useDispatch } from "react-redux";

export default function AddNewApplication({ onBack,addOredit,applicationToEdit,
  setApplicationToEdit }) {
  console.log("application to edit ", applicationToEdit)
  const classes = useStyles();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(applicationToEdit?applicationToEdit:{
    ApplicationName:""
  });
  console.log('form data : ', formData)
  const [Error, setError] = useState({
    ApplicationNameErrMsg: ""
  });
  
  const handleSubmit = () => {
    let payload = {
      ApplicationId:applicationToEdit?applicationToEdit.ApplicationId:0,
      ApplicationName:formData.ApplicationName
    }
    let error = {};
    console.log("formData",formData)
    if (!formData.ApplicationName.trim()) {
      error.ApplicationNameErrMsg = "Application Name is required";
    }
    // Update error state
    setError(error);

    // Check if there are any errors
    if (Object.keys(error).length === 0) {
      // Proceed with form submission
      dispatch(AddUpdateApplication(payload))
      onBack()
      setApplicationToEdit(null)
      console.log("submitted Data : ", formData);
    }else
      console.log("handleSubmit", error,"sumitted data", formData);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName] : value,
    });
  };

  return (
    <>
      <Grid
        container
        className={classes.main}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6} className={classes.header}>
        <div className={classes.highlight}> {addOredit} New Application</div>
        </Grid>
        {/* <Grid item>
          <Button
            className={classes.button}
            onClick={handleBack}
            sx={{
              backgroundColor: "rgb(101, 77, 247)",
              "&:hover": {
                backgroundColor: "rgb(101, 77, 247) !important",
                borderColor: "#654DF7",
                color: "#fff",
                "&:before": {
                  backgroundColor: "rgb(101, 77, 247) !important",
                  color: "#fff",
                },
              },
              color: "#fff",
            }}
          >
            Back
          </Button>
        </Grid> */}
      </Grid>

      {/* Body */}
      <Grid container style={{ padding: "10px" }}>
        <Card style={{ width: "100%", padding: "10px" }}>
          <Grid container>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Application Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl
                  fullWidth
                  className={clsx(classes.textField)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#654DF7",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#654DF7",
                      },
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    height: "40px",
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    placeholder="Enter application name"
                    fullWidth
                    error={Error.ApplicationNameErrMsg ? true : false}
                    value={formData.ApplicationName}
                    onChange={(e) =>
                      handleFieldChange("ApplicationName", e.target.value)
                    }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Footer */}
      <Grid container>
        <Grid item xs={12}>
          <Box style={{}} className={classes.ButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onBack}
              sx={{
                backgroundColor: "rgb(101, 77, 247)",
                "&:hover": {
                  backgroundColor: "rgb(101, 77, 247)",
                  borderColor: "#654DF7",
                },
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
              sx={{
                backgroundColor: "rgb(101, 77, 247)",
                "&:hover": {
                  backgroundColor: "rgb(101, 77, 247)",
                  borderColor: "#654DF7",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
