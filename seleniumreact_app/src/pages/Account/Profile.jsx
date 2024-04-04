import React, { useEffect, useState } from "react";
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
import { UpdateUserProfile } from "../../redux/actions/authActions";
import axios from "axios";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState(user?.Email);
  const [organizationName, setorganizationName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEditable, setisEditable] = useState(false);
  const [Error, setError] = useState({
    nameError: "",
    emailError: "",
    organizationNameError: "",
  });

  useEffect(() => {
    const emailFromSession = sessionStorage.getItem("email");

    const updateUserByEmail = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/Selenium/GetProfilByEmail?Email=${emailFromSession}`,
          emailFromSession,
          header()
        );
        setuser(res.data);
        setEmail(res.data?.Email || "");
        setfullName(res.data?.FullName || "");
        setorganizationName(res.data?.OrganizationName || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    updateUserByEmail();
  }, []);
  // Extracting the name of user
  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const handleSave = () => {
    const payload = {
      id: user?.Id,
      fullName,
      email,
      organizationName,
    };
    let error = {};

    if (!fullName.trim()) error.nameError = "Name required";
    if (!email.trim()) error.emailError = "Email required";
    if (!organizationName.trim())
      error.organizationNameError = "Organization name required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
    if (!isEmailValid) {
      error.emailError = "Enter a valid email";
    }
    //updating error state before submitting
    setError(error);
    if (Object.keys(error).length === 0) {
      dispatch(UpdateUserProfile(payload));
      setisEditable(false);
    } else {
      console.log("some field are empty or not valid");
    }
  };

  console.log("Error", Error);
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <Paper elevation={0} className={classes.papercontainer}>
          {user && (
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
                        disabled={!isEditable}
                        error={Error.nameError ? true : false}
                        value={fullName}
                        onChange={(e) => {
                          setfullName(e.target.value);
                          setError((prev) => ({ ...prev, ["nameError"]: "" }));
                        }}

                        // sx={{ backgroundColor: "rgb(242, 242, 242)",fontFamily:'Lexend Deca',fontWeight:'400', height:'40px'}}
                      />
                    </FormControl>
                    {Error.nameError && (
                      <Typography className={classes.inputError}>
                        {Error.nameError}
                      </Typography>
                    )}
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
                        type="text"
                        placeholder="Enter your email"
                        disabled={!isEditable}
                        error={Error.emailError ? true : false}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError((prev) => ({ ...prev, ["emailError"]: "" }));
                        }}
                      />
                    </FormControl>
                    {Error.emailError && (
                      <Typography className={classes.inputError}>
                        {Error.emailError}
                      </Typography>
                    )}
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
                        disabled={!isEditable}
                        error={Error.organizationNameError ? true : false}
                        value={organizationName}
                        onChange={(e) => {
                          setorganizationName(e.target.value);
                          setError({ ...Error, ["organizationNameError"]: "" });
                        }}
                      />
                    </FormControl>
                    {Error.organizationNameError && (
                      <Typography className={classes.inputError}>
                        {Error.organizationNameError}
                      </Typography>
                    )}
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
                  {isEditable ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setisEditable(false)}
                        sx={{
                          backgroundColor: "rgb(108, 117, 125)",
                          color: "#f1f1f1",
                          "&:hover": {
                            backgroundColor: "rgb(101, 77, 247)",
                          },
                          marginRight: "10px",
                        }}
                      >
                        Cancel
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
                    </>
                  ) : (
                    <>
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
                        onClick={() => setisEditable(true)}
                        sx={{
                          backgroundColor: "rgb(101, 77, 247)",
                          "&:hover": {
                            backgroundColor: "rgb(101, 77, 247)",
                            borderColor: "#654DF7",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Box>
              </Paper>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
