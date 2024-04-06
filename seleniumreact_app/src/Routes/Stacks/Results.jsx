import React from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import { useStyles } from "../../Layout/styles";
import { Link, Outlet, useLocation, useNavigate,useParams } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Results() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const {rootId,tab,runId } = useParams()
  const { isRunning } = useSelector((state) => state.result);
console.log('runid in sumamay',runId)
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
            to={`/result/${rootId}/${tab}/summary/${runId}`}
            className={`${classes.linkStyle} ${
              location.pathname.includes("summary") && classes.activeLink
            }`}
          >
            Summary
          </Link>
        </Grid>
        <Grid item>
          <Link
            to={`/result/${rootId}/${tab}/request-state/${runId}`}
            className={`${classes.linkStyle} ${
              location.pathname.includes("request-state") &&
              classes.activeLink
            }`}
            style={{ marginLeft: "20px" }}
          >
            Request Stats
          </Link>
        </Grid>
        <Grid item>
          <Link
            to={`/result/${rootId}/${tab}/error/${runId}`}
            style={{ marginLeft: "20px" }}
            className={`${classes.linkStyle} ${
              location.pathname.includes("error") &&
              classes.activeLink
            }`}
          >
            Errors
          </Link>
        </Grid>
        <Grid item>
          <Link
            to={`/result/${rootId}/${tab}/initial-setup/${runId}`}
            style={{ marginLeft: "20px" }}
            className={`${classes.linkStyle} ${
              location.pathname.includes("initial-setup") &&
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
                navigate(`/performance?rootId=${rootId}&tab=${tab}&runId=${runId}`);
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
