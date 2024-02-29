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
import { StyledTypography, StyledOutlinedInput } from "./style";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ChangePasswordReq } from "../../redux/actions/authActions";


export default function ChangePassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {emailId} = useParams()
  const [email, setEmail] = useState(emailId);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [Error, setError] = useState({
    emailError: "",
    oldPasswordError: "",
    newPasswordError: "",
  });

  const handleSave = () => {
    const payload = {
      email,
      oldPassword,
      newPassword
    };
   console.log(payload)
    let error = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    // if (!email.trim()) error.emailError = "email required";
    if (!oldPassword.trim())
      error.oldPasswordError = "old password required";
    else if(!passwordRegex.test(oldPassword))
      error.oldPasswordError = "at least one lowercase, one uppercase, one number, one special character is required"
    if (!newPassword.trim())
      error.newPasswordError = "new password required";
    else if(!passwordRegex.test(newPassword))
      error.newPasswordError = "at least one lowercase, one uppercase, one number, one special character is required"
    

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsEmailValid(emailRegex.test(email));
    // if (!isEmailValid) {
    //   error.emailError = "enter valid email";
    // }
    //updating error state before submitting
    setError(error);
    if (Object.keys(error).length === 0) {
      setNewPassword("")
      setOldPassword("")
    dispatch(ChangePasswordReq(payload))
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
                      disabled
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
                    Old Password
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
                      placeholder="old password"
                      error={Error.oldPasswordError ? true : false}
                      value={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                        setError({ ...Error, ['oldPasswordError']: "" });
                      }}
                    />
                  </FormControl>
                  {Error.oldPasswordError&& <Typography  sx={{color:'red',fontSize:'12px'}}>{Error.oldPasswordError}</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle1">
                    New Password
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
                      placeholder="new password"
                      error={Error.newPasswordError ? true : false}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError({ ...Error, ['newPasswordError']: "" });
                      }}
                    />
                  </FormControl>
                  {Error.newPasswordError&& <Typography  sx={{color:'red',fontSize:'12px'}}>{Error.newPasswordError}</Typography>}
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
                  onClick={() => navigate()}
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
                  save
                </Button>
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
