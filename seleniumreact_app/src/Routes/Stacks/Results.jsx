import React from "react";
import { useStyles } from "../../Layout/styles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { StyledDashBoardIcon } from "../../comman/icons";
import * as Flatted from "flatted";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Results() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

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
            to="/result/request-stats"
            className={`${classes.linkStyle} ${
              location.pathname.startsWith("/request-stats") &&
              classes.activeLink
            }`}
            style={{ marginLeft: "20px" }}
            onClick={() => {
              sessionStorage.setItem(
                "selectedCategory",
                Flatted.stringify({
                  title: "Environment",
                  icon: <StyledDashBoardIcon />,
                  path: "/",
                })
              );
            }}
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
