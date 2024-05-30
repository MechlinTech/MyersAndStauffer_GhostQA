import { Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { StyledOutlinedInput, StyledTypography, useStyles } from "./style";
import { Box, Button, CircularProgress, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "./CustomTable";
import axios from "axios";
import { toast } from "react-toastify";
import SearchField from "../../../../comman/SearchField";
import { InviteUser } from "../../../../redux/actions/authActions";
import { header } from "../../../../utils/authheader";
import { getBaseUrl } from "../../../../utils/configService";
import { fetchUsers } from "../../../../redux/actions/userActions";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function Members() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { members, loading } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState({
    emailError: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleInvite = () => {
    let error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.trim());
    // setIsEmailValid(emailRegex.test(email));
    if (!email.trim()) {
      error.emailError = "email required";
      toast.error("email required");
    } else if (!isEmailValid) {
      error.emailError = "Enter a valid email";
      toast.error("Enter a valid email");
    }
    setError(error);
    if (Object.keys(error).length === 0) {
      setEmail("");
      dispatch(InviteUser(email));
    }
  };

  const userList = members && members?.filter((user) =>
    user?.UserName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ paddingTop: "10px" }}
    >
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
                  setError((prev) => ({ ...prev, ["emailError"]: "" }));
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
        <Paper
          style={{ marginTop: "20px", maxHeight: "70vh"}}
        >
          <Grid item style={{ margin: "8px 20px"}}>
            <SearchField
              placeholder="Search User..."
              onChange={(value) => setSearchTerm(value)}
            />
          </Grid>
          <Grid item style={{
                  overflow: "auto",
                  maxHeight: "calc(70vh - 50px)",
                }}>
          {loading ? (
            <Box style={{ textAlign: "center" }}>
              <CircularProgress
                style={{ color: "rgb(101, 77, 247)" }}
                size={25}
              />
            </Box>
          ) : (
            <CustomTable users={userList} />
          )}
          </Grid>
          
        </Paper>
      </Grid>
    </Grid>
  );
}
