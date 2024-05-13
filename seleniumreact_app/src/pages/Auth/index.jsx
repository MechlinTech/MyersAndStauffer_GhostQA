import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clsx from "clsx";
import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  IconButton,
  Grid,
  Box,
  CssBaseline,
  Button,
  Avatar,
  Typography,
  Container,
} from "@mui/material";
import { useStyles } from "./styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { UserIcon, LockIcon } from "../../comman/icons";
import { login } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.id === "outlined-adornment-email") {
        // If the email input field is focused, focus on the password input field
        document.getElementById("outlined-adornment-password").focus();
      } else if (e.target.id === "outlined-adornment-password") {
        // If the password input field is focused, trigger the login action
        handleLogin();
      }
    }
  };

  const handleLogin = () => {
    setError({});
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (/\s{6,}/.test(password)) {
      errors.password = "Enter a valid password";
    }

    if (errors.email || errors.password) {
      setError(errors);
      return;
    }

    let data = {
      email: email,
      password: password,
    };
    dispatch(login(data, setLoading));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          width: "540px !important",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
            <img src={"/images/GhostQA-Logo.png"} alt="logo" />
          </Box>
          <Box>
            <Typography className={classes.primaryTitle}>Welcome</Typography>
            <Typography className={classes.secondaryTitle}>
              Enter your login details
            </Typography>
          </Box>

          <Grid
            container
            direction="column"
            justify="space-between"
            spacing={2}
            className={classes.formContainer}
          >
            <Grid item className={classes.input}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderColor: "transparent !important",
                    "&:hover fieldset": {
                      borderColor: "#654DF7",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#654DF7",
                    },
                  },
                }}
              >
                <OutlinedInput
                  className={classes.Outlined}
                  id="outlined-adornment-email"
                  type="email"
                  placeholder="E-mail"
                  error={error.email ? true : false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.positionStart}
                    >
                      <UserIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {error.email && (
                <Typography className={classes.inputError}>{error.email}</Typography>
              )}
            </Grid>
            <Grid item className={classes.input}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#654DF7",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#654DF7",
                    },
                  },
                }}
                variant="outlined"
              >
                <OutlinedInput
                  className={classes.Outlined}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  error={error.password ? true : false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      className={classes.lockMain}
                    >
                      <IconButton
                        className={classes.lock}
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment
                      position="start"
                      className={classes.positionStart}
                    >
                      <LockIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {error.password && (
                <Typography className={classes.inputError}>{error.password}</Typography>
              )}
            </Grid>

            <Grid item>
            <Link to="/forgot-password" style={{ color: '#654DF7', textAlign: 'right', fontSize: '14px', textDecoration:'none' }}>
                <Typography>Forgot Password?</Typography>
            </Link>
            </Grid>

            <Grid item>
              <div>
                <Button
                  className={classes.button}
                  fullWidth
                  title="dkjf"
                  variant="contained"
                  sx={{ margin: "10px" }}
                  onClick={handleLogin}
                  endIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? "Logging In..." : "Log In"}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
