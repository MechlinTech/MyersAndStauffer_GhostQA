import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTypography, StyledOutlinedInput, useStyles } from "./styles";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/authActions";

export default function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const [Error, setError] = useState({
    emailError: "",
  });

  const handleSubmit = () => {
    setError({});
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      errors.emailError = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.emailError = "Email is invalid";
    }
    if (errors.emailError) {
      setError(errors);
      return;
    }

    let data = {
      email: email,
    };
    
    dispatch(forgotPassword(data, setLoading, navigate))
    console.log("data", data);
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={0}
    >
      <Grid item xs={12} sm={12} md={10} lg={8}>
        <Box
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            src={"/images/Logo_GhostQA.svg"}
            alt="logo"
            style={{ marginLeft: "20px", textAlign: "center" }}
          />
        </Box>
        {/* <Paper elevation={2} className={classes.papercontainer}> */}
        <Box elevation={2} className={classes.papercontainer}>
          <Box
            style={{ width: "60%", display: "flex", justifyContent: "left" }}
          >
            <StyledTypography
              sx={{ textAlign: "left", fontSize: "24px", marginBottom: "20px" }}
            >
              Forgot Password
            </StyledTypography>
          </Box>
          <Box sx={{ width: "60%" }}>
            <Paper
              variant="outlined"
              sx={{ padding: "20px", marginBottom: "20px" }}
            >
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                  <StyledTypography mb={1}>E-mail</StyledTypography>
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
                  {Error.emailError && (
                    <Typography className={classes.inputError}>{Error.emailError}</Typography>
                  )}
                </Grid>
              </Grid>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/")}
                  sx={{
                    backgroundColor: "rgb(108, 117, 125)",
                    color: "#f1f1f1",
                    "&:hover": {
                      backgroundColor: "rgb(101, 77, 247)",
                    },
                    marginRight: "10px",
                    textTransform: "none",
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "rgb(101, 77, 247)",
                    "&:hover": {
                      backgroundColor: "rgb(101, 77, 247)",
                      borderColor: "#654DF7",
                    },
                    textTransform: "none",
                  }}
                  endIcon={loading && <CircularProgress size={20} color="inherit" />}
                  >
                    {loading ? "Sending..." : "Send Link"}
                </Button>
              </Box>
            </Paper>
          </Box>
          </Box>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
}
