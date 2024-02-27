import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style";
import { Avatar } from "@material-ui/core";
import { StyledTypography, StyledOutlinedInput } from "./style";
import { useDispatch } from "react-redux";
import { InviteUser } from "../../redux/actions/seleniumAction";

export default function ChangePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [Error, setError] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleSave = () => {
    const payload = {
      email,
      password,
      confirmPassword,
    };
    console.log("payload ", payload);

    let error = {};

    if (!email.trim()) error.emailError = "email required";
    if (!password.trim())
      error.passwordError = "password required";
    if (!confirmPassword.trim())
      error.confirmPasswordError = "new member email required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
    if (!isEmailValid) {
      error.newMemEmailError = "enter valid email";
    }
    //updating error state before submitting
    setError(error);
    if (Object.keys(error).length === 0) {
      // invite api
    //   setfullName("");
    //   setEmail("");
    //   setorganizationName("");
    //   setnewMemEmail("");
    } else {
      console.log("error saving");
    }
  };


  return (
    <Grid container justifyContent="center" alignItems="center" height='100vh'>
      <Grid item xs={12} sm={12} md={10} lg={8}>
        <Paper elevation={2} className={classes.papercontainer}>
          <Box sx={{ width: "70%" }}>
            <Paper
              variant="outlined"
              sx={{ padding: "20px", marginBottom: "20px" }}
            >
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                  <StyledTypography>E-mail</StyledTypography>
                  <FormControl
                    fullWidth
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
                    }}
                  >
                    <StyledOutlinedInput
                      id="outlined-adornment-name"
                      type="email"
                      placeholder="Enter your email"
                      error={Error.emailError ? true : false}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError({ ...Error, ["emailError"]: "" });
                      }}
                    />
                  </FormControl>
                 {Error.emailError&& <Typography>{Error.emailError}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle1">
                    old Password
                  </StyledTypography>
                  <FormControl
                    fullWidth
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
                    }}
                  >
                    <StyledOutlinedInput
                      id="outlined-adornment-name"
                      type="password"
                      placeholder="password"
                      error={Error.organizationNameError ? true : false}
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                        setError({ ...Error, ["passwordError"]: "" });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle1">
                    new Password
                  </StyledTypography>
                  <FormControl
                    fullWidth
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
                    }}
                  >
                    <StyledOutlinedInput
                      id="outlined-adornment-name"
                      type="password"
                      placeholder="password"
                      error={Error.organizationNameError ? true : false}
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                        setError({ ...Error, ["passwordError"]: "" });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle1">
                    Confirm password
                  </StyledTypography>
                  <FormControl
                    fullWidth
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
                    }}
                  >
                    <StyledOutlinedInput
                      id="outlined-adornment-name"
                      type="password"
                      placeholder="confirm password"
                      error={Error.organizationNameError ? true : false}
                      value={confirmPassword}
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                        setError({ ...Error, ["confirmPasswordError"]: "" });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                mt={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                  sx={{
                    backgroundColor: "rgb(108, 117, 125)",
                    color: "#f1f1f1",
                    "&:hover": {
                      backgroundColor: "rgb(101, 77, 247)",
                    },
                    marginRight: "10px",
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
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
            </Paper>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
