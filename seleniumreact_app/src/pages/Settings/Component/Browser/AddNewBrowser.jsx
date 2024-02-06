import React, { useState,useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { AddUpdateBrowser, GetBrowser } from "../../../../redux/actions/seleniumAction";


export default function AddNewBrowser({ onBack,addOredit,browserToEdit,setBrowserToEdit }) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState(browserToEdit?browserToEdit:{
    BrowserName: ""
  });
  const [Error, setError] = useState({
    BrowserNameErrMsg: ""
  });
  
  const handleSubmit = () => {
    let payload = {
      "BrowserId": browserToEdit?browserToEdit.BrowserId:0,
      "BrowserName": formData.BrowserName
    }
    let error = {};
    if (!formData.BrowserName.trim()) {
      error.BrowserNameErrMsg = "browser Name is required";
      
    }
    // Update error state
    setError(error);

    // Check if there are any errors
    if (Object.keys(error).length === 0) {
      // Proceed with form submission
      dispatch(AddUpdateBrowser(payload))
      setBrowserToEdit(null) //clear browser to edit after saving
      onBack()
    }else
      console.log("handleSubmit", error, formData);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
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
        <div className={classes.highlight}> {addOredit} New Browser</div>
        </Grid>
        {/* <Grid item>
          <Button
            className={classes.button}
            onClick={onBack}
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
                  Browser Name
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
                    placeholder="Enter Browser name"
                    fullWidth
                    error={Error.BrowserNameErrMsg ? true : false}
                    value={formData.BrowserName}
                    onChange={(e) =>
                      handleFieldChange("BrowserName", e.target.value)
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
