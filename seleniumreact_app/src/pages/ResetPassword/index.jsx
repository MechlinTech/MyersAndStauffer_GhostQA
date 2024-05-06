import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StyledTypography, StyledOutlinedInput, useStyles } from "./styles";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/actions/authActions";

export default function ResetPassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const { token } = useParams()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let  token = searchParams.get('token');
  if (token !== null) {
    token = token.replace(/ /g, '+');
  }
  const email = searchParams.get('email');
  const [isdisabled, setdistable] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [Error, setError] = useState({
    emailError: "",
    confirmPasswordError: "",
    newPasswordError: "",
  });

  useEffect(() => {
    if (confirmPassword.length > 0 && newPassword.length > 0) {
        if (confirmPassword.length === newPassword.length) {
          setdistable(false);
        } else {
          setdistable(true);
        }
    }
  }, [confirmPassword, newPassword]);
 
  const handleSave = () => {
    const payload =  {
      token: token,
      email: email,
      newPassword: confirmPassword
    }
    console.log(payload);
    let error = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

      if (!newPassword.trim()) error.newPasswordError = "new password required";
      else if (!passwordRegex.test(newPassword))
        error.newPasswordError =
          "at least one lowercase, one uppercase, one number, one special character is required";

    if (!confirmPassword.trim())
      error.oldPasswordError = "confirm password required";
    else if (!passwordRegex.test(confirmPassword))
      error.confirmPasswordError =
        "at least one lowercase, one uppercase, one number, one special character is required";

    setError(error);

    if (Object.keys(error).length === 0 && confirmPassword === newPassword) {
      dispatch(resetPassword(payload, navigate));
      setNewPassword("");
      setConfirmPassword("");
    } else {
      console.log("some field are empty");
      toast.warn('The new password and confirmation password do not match. Please verify and try again.')
    }
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
      <Grid item xs={12} sm={12} md={10} lg={8} style={{maxWidth:"33.33%"}}>
        <Box
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            src={"/images/Logo_GhostQA.svg"}
            alt="logo"
            style={{ marginLeft: "20px", textAlign: "center" }}
          />
        </Box>
        <Paper elevation={2} className={classes.papercontainer}>
          <Box
            style={{ width: "80%", display: "flex", justifyContent: "left" }}
          >
            <StyledTypography
              sx={{ textAlign: "left", fontSize: "24px", marginBottom: "20px" }}
            >
              Reset Password
            </StyledTypography>
          </Box>
          <Box sx={{ width: "80%" }}>
            <Paper
              variant="outlined"
              sx={{ padding: "20px", marginBottom: "20px" }}
            >
              <Grid container justifyContent="center" spacing={1}>
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
                        setError({ ...Error, ["newPasswordError"]: "" });
                      }}
                    />
                  </FormControl>
                  {Error.newPasswordError && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>
                      {Error.newPasswordError}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="subtitle1">
                    Confirm Password
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
                      error={Error.confirmPasswordError ? true : false}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError({ ...Error, ["confirmPasswordError"]: "" });
                      }}
                    />
                  </FormControl>
                  {Error.oldPasswordError && (
                    <Typography sx={{ color: "red", fontSize: "12px" }}>
                      {Error.confirmPasswordError}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
            <Box
              mt={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={isdisabled}
                sx={{
                  backgroundColor: "rgb(101, 77, 247)",
                  "&:hover": {
                    backgroundColor: "rgb(101, 77, 247)",
                    borderColor: "#654DF7",
                  },
                  textTransform: "none",
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
