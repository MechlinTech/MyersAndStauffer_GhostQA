import React, { useState } from "react";
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
import { AddUpdateTestUser } from "../../../../../redux/actions/settingAction";
// import { AddUpdateTestUser } from "../../../../redux/actions/settingAction";

export default function AddNewTestUser({
  onBack,
  addOredit,
  setUserEdit,
  userEdit,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Initial form data based on userEdit prop
  const [formData, setFormData] = useState(
    userEdit
      ? userEdit
      : {
          UserName: "",
          Password: "",
        }
  );

  // State for storing error messages
  const [error, setError] = useState({
    UserNameErrMsg: "",
    PasswordErrMsg: "",
  });

  // Function to validate password according to the given criteria
  const validatePassword = (password) => {
    const minLength = 8;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const digit = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!upperCase.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!lowerCase.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!digit.test(password)) {
      return 'Password must contain at least one digit.';
    }
    if (!specialChar.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = () => {
    let payload = {
      id: userEdit ? userEdit.UserId : 0,
      userName: formData.UserName,
      password: formData.Password,
    };

    // Initialize error object
    let errorObj = {};

    // Validate user name
    if (!formData.UserName.trim()) {
      errorObj.UserNameErrMsg = "User Name is required.";
    }
   
    if (!formData.Password.trim()) {
      errorObj.PasswordErrMsg = "Password is required.";
    }

    // Update error state
    setError(errorObj);

    // Check if there are any errors
    if (Object.keys(errorObj).length === 0) {
      // No errors, dispatch the form data
      dispatch(AddUpdateTestUser(payload));
      setUserEdit(null);
      onBack();
    } else {
      console.log("handleSubmit", errorObj, formData);
    }
  };

  // Handle field changes
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
          <div className={classes.highlight}>{addOredit} New Test User</div>
        </Grid>
      </Grid>

      {/* Body */}
      <Grid container style={{ padding: "10px" }}>
        <Card
          style={{
            width: "100%",
            borderTop: "2px solid #DADADA",
            borderRight: "2px solid #DADADA",
            borderLeft: "2px solid #DADADA",
          }}
        >
          <Grid container>
            {/* User Name Field */}
            <Grid container xs={6} style={{ borderRight: "2px solid #DADADA" }}>
              <Grid item xs={3} style={{ padding: "5px" }}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Username*
                </Typography>
              </Grid>
              <Grid item xs={9} style={{ padding: "5px" }}>
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
                    placeholder="Enter test user name"
                    fullWidth
                    error={error.UserNameErrMsg ? true : false}
                    value={formData.UserName}
                    onChange={(e) => handleFieldChange("UserName", e.target.value)}
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
                {/* Display UserName error message */}
                {error.UserNameErrMsg && (
                  <Typography className={clsx(classes.inputError)}>
                    {error.UserNameErrMsg}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Password Field */}
            <Grid container xs={6}>
              <Grid item xs={3} style={{ padding: "5px" }}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Password*
                </Typography>
              </Grid>
              <Grid item xs={9} style={{ padding: "5px" }}>
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
                    id="outlined-adornment-password"
                    type="text"
                    placeholder="Enter Password"
                    fullWidth
                    error={error.PasswordErrMsg ? true : false}
                    value={formData.Password}
                    onChange={(e) =>
                      handleFieldChange("Password", e.target.value)
                    }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
                {/* Display Password error message */}
                {error.PasswordErrMsg && (
                  <Typography  className={clsx(classes.inputError)}>
                    {error.PasswordErrMsg}
                  </Typography>
                )}
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
