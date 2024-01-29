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
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [Error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError({});
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      errors.email = "Email is required";
    } else if (!regex.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    if (errors.email || errors.password) {
      setError(errors);
    } else {
      let data = {
        email: email,
        password: password,
      };
      dispatch(login(data, setLoading));
    }
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
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "40px" }}
          >
            
            <img src={"/images/GhostQA-Logo.png"} alt="logo" />{" "}
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <Typography
              variant="h6"
              style={{
                fontFamily: "Poppins",
                fontSize: "26px",
                fontWeight: "bold",
                lineHeight: "44px",
              }}
            >
              <span style={{ color: "rgb(33, 35, 48)", fontWeight: "bold" }}>
                Ghost{" "}
              </span>{" "}
              <span style={{ color: "#654DF7", fontWeight: "bold" }}>QA</span>
            </Typography> */}
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
            {/* E-mail field */}
            <Grid item className={classes.input}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderColor: 'transparent !important',
                    "&:hover fieldset": {
                      borderColor: "#654DF7",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#654DF7",
                    },
                  },
                }}
              >
                {/* <TextField placeholder="E-mail" startAdornment={<UserIcon />} /> */}

                <OutlinedInput
                  className={classes.Outlined}
                  id="outlined-adornment-email"
                  type="e-mail"
                  placeholder="E-mail"
                  error={Error.email ? true : false}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {Error.email && (
                <Typography className={classes.inputError}>
                  {Error.email}
                </Typography>
              )}
            </Grid>
            {/* Password field */}
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
                  error={Error.password ? true : false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end" className={classes.lockMain}>
                      <IconButton
                        className={classes.lock}
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => setshowPassword(!showPassword)}
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
              {Error.password && (
                <Typography className={classes.inputError}>
                  {Error.password}
                </Typography>
              )}
            </Grid>

            <Grid item>
              <div>
                <Button
                  className={classes.button}
                  fullWidth
                  variant="contained"
                  sx={{ margin: "10px" }}
                  // sx={{ mt: 3, mb: 2 }}
                  
                  onClick={() => handleLogin()}
                  endIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
