import { Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { StyledOutlinedInput, StyledTypography, useStyles } from "./style";
import { Button, FormControl } from "@mui/material";
import { useDispatch } from "react-redux";
import { InviteUser } from "../../redux/actions/authActions";
import { CustomTable } from "./CustomTable";
import SearchField from "../../comman/SearchField";
import axios from "axios";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [users, setusers] = useState([])
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState({
    emailError: "",
  });

  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get(
        `${BASE_URL}/Selenium/GetUserDetails`,
        header()
      );
      console.log("user list : ", res);
      setusers(res.data)
    };

    getUserList();
  }, []);

  const handleInvite = () => {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
    if (!email.trim()) error.emailError = "email required";
    else if (!isEmailValid) error.emailError = "Enter a valid email";
    setError(error);
    console.log('errors ',Object.values(error))
    if (Object.keys(error).length === 0) {
      setEmail("");
      dispatch(InviteUser(email));
    }
  };

  const userList = users?.filter((user) =>
    user?.UserName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={10}>
          <Grid
            container
            spacing={1}
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={12} md={2}>
              <StyledTypography variant="subtitle1">
                Type E-mail to invite
              </StyledTypography>
            </Grid>
            <Grid item xs={12} md={8}>
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
                  error={Error.emailError ? true : false}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // setError((prev) => ({ ...prev, ["emailError"]: "" }));
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} md={1} style={{ alignSelf: "flex-end" }}>
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
            </Grid>
          </Grid>
          <Paper style={{ marginTop: "20px",maxHeight:'70vh',overflow:'auto', }}>
            <Grid item style={{ margin: "8px 20px", }}>
              <SearchField
                placeholder="Search User..."
                onChange={(value) => setSearchTerm(value)}
              />
            </Grid>
            <CustomTable users={userList} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
