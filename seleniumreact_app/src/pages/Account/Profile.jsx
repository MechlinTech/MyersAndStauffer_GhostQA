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

export default function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [organizationName, setorganizationName] = useState("");
  const [newMemEmail, setnewMemEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [Error, setError] = useState({
    nameError: "",
    emailError: "",
    organizationNameError: "",
    newMemEmailError: "",
  });

  // Extracting the name of user
  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const handleSave = () => {
    const payload = {
      fullName,
      email,
      organizationName,
      newMemEmail,
    };
    console.log("payload ", payload);

    let error = {};

    if (!fullName.trim()) error.nameError = "name required";
    if (!email.trim()) error.emailError = "email required";
    if (!organizationName.trim())
      error.organizationNameError = "organization name required";
    if (!newMemEmail.trim())
      error.newMemEmailError = "new member email required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
    if (!isEmailValid) {
      error.newMemEmailError = "enter valid email";
    }
    //updating error state before submitting
    setError(error);
    if (Object.keys(error).length === 0) {
      // invite api
      setfullName("");
      setEmail("");
      setorganizationName("");
      setnewMemEmail("");
    } else {
      console.log("error saving");
    }
  };

 

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <Paper elevation={0} className={classes.papercontainer}>
          <Box sx={{ width: "70%" }}>
            <Box
              m={1}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{ marginRight: "10px", backgroundColor: "#654DF7" }}
                src=""
              />
              <Typography fontSize="18px" fontFamily="Lexend Deca">
                {getName()}
              </Typography>
            </Box>
            <Paper
              variant="outlined"
              sx={{ padding: "20px", marginBottom: "20px" }}
            >
              <Grid container justifyContent="center" spacing={1}>
                <Grid item xs={12}>
                  <StyledTypography>Full name</StyledTypography>
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
                      placeholder="Enter your full name"
                      error={Error.nameError ? true : false}
                      value={fullName}
                      onChange={(e) => {
                        setfullName(e.target.value);
                        setError({ ...Error, ["nameError"]: "" });
                      }}

                      // sx={{ backgroundColor: "rgb(242, 242, 242)",fontFamily:'Lexend Deca',fontWeight:'400', height:'40px'}}
                    />
                  </FormControl>
                </Grid>
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
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle1">
                    Organization name
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
                      type="text"
                      placeholder="Enter your organization name"
                      error={Error.organizationNameError ? true : false}
                      value={organizationName}
                      onChange={(e) => {
                        setorganizationName(e.target.value);
                        setError({ ...Error, ["organizationNameError"]: "" });
                      }}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} md={10}>
                  <StyledTypography variant="subtitle1">
                    Type E-mail to invite
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
                    className={classes.btn}
                  >
                    <StyledOutlinedInput
                      id="outlined-adornment-name"
                      type="email"
                      placeholder="Enter your email to invite"
                      error={Error.newMemEmailError ? true : false}
                      value={newMemEmail}
                      onChange={(e) => {
                        setnewMemEmail(e.target.value);
                        setError({ ...Error, ["newMemEmailError"]: "" });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={2} alignSelf="end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInvite}
                    sx={{
                      backgroundColor: "rgb(101, 77, 247)",
                      height: "38px",
                      "&:hover": {
                        backgroundColor: "rgb(101, 77, 247)",
                        borderColor: "#654DF7",
                      },
                    }}
                  >
                    Invite
                  </Button>
                </Grid> */}
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
