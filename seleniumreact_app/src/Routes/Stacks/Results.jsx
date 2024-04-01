import React from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { useStyles } from "../../Layout/styles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Results() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { isRunning } = useSelector((state) => state.result);

  return (
    <>
      <Grid
        container
        alignItems="center"
        style={{
          marginTop: "-7px",
          height: "50px",
          padding: "0 20px",
          position: "fixed",
          background: "#fafafa",
          zIndex: 1000,
          width: "100%",
        }}
      >
        <Grid item>
          <Link
            to="/result/summary"
            className={`${classes.linkStyle} ${
              location.pathname === "/result/summary" && classes.activeLink
            }`}
          >
            Summary
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/result/request-state"
            className={`${classes.linkStyle} ${
              location.pathname.startsWith("/result/request-state") &&
              classes.activeLink
            }`}
            style={{ marginLeft: "20px" }}
          >
            Request Stats
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/result/error"
            style={{ marginLeft: "20px" }}
            className={`${classes.linkStyle} ${
              location.pathname.startsWith("/result/error") &&
              classes.activeLink
            }`}
          >
            Errors
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/result/initial-setup"
            style={{ marginLeft: "20px" }}
            className={`${classes.linkStyle} ${
              location.pathname.startsWith("/result/initial-setup") &&
              classes.activeLink
            }`}
          >
            Initial Setup
          </Link>
        </Grid>
        <Grid item style={{marginLeft:"20px"}}>
          {isRunning && (
            
            <CircularProgress
              style={{
                color: "#654DF7",
                // position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              size={25}
            />
          )}
        </Grid>

        <Grid item style={{ marginLeft: "auto" }}>
          <Stack justifyContent="flex-end" alignItems="flex-end">
            <Button
              className={classes.backBtn}
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon fontSize="small" />
              Back
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <div style={{ paddingTop: "30px" }}>
        <Outlet />
      </div>
    </>
  );
}
