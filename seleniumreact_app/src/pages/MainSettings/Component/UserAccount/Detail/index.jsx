import React, { useEffect, useState } from "react";
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
import { useStyles } from "./style";
import { Avatar } from "@material-ui/core";
import { StyledTypography, StyledOutlinedInput } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile, fetchUserByEmail } from "../../../../../redux/actions/userActions";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function Detail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, organizationDetails } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [isEditable, setisEditable] = useState(false);
  const [Error, setError] = useState({
    nameError: "",
    emailError: "",
    organizationNameError: "",
  });

  // useEffect(() => {
  //   dispatch(fetchUserByEmail());
  // }, []);
  useEffect(() => {
    if (user) {
      setEmail(user.Email || "");
      setFullName(user.FullName || "");
      setOrganizationName(user.OrganizationName || "");
    }
  }, [user]);
  // Extracting the name of user
  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleCancel = () => {
    setEmail(user?.Email || "");
    setFullName(user?.FullName || "");
    setOrganizationName(user?.OrganizationName || "");
    setisEditable(false);
  };
  const handleSave = () => {
    const payload = {
      id: user?.Id,
      fullName,
      email,
      organizationName,
    };
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) error.nameError = "Name required";
    if (!email.trim()) error.emailError = "Email required";
    else if (!emailRegex.test(email)) {
      error.emailError = "Enter a valid email";
    }
    if (!organizationName.trim())
      error.organizationNameError = "Organization name required";

    //updating error state before submitting
    setError(error);
    if (Object.keys(error).length === 0) {
      dispatch(UpdateUserProfile(payload));
      setisEditable(false);
    } else {
      console.log("some field are empty or not valid");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <Paper elevation={0} className={classes.papercontainer}>
          {loading ? (
            <Box style={{ textAlign: "center" }}>
              <CircularProgress
                style={{ color: "rgb(101, 77, 247)" }}
                size={25}
              />
            </Box>
          ) : (
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
                  src={organizationDetails?organizationDetails.LogoPath:""}
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
                        type="text"
                        placeholder="Enter your full name"
                        disabled={!isEditable}
                        error={Error.nameError ? true : false}
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
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
                        type="email"
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
                          setOrganizationName(e.target.value);
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
                        // onClick={() => setisEditable(false)}
                        onClick={handleCancel}
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
