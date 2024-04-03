import React from "react";
import { useSelector } from "react-redux";
import { Grid, Card, CardContent } from "@material-ui/core";
import { useStyles } from "./styles";
import { Typography } from "@mui/material";
import {
  SanariesIcon,
  TotalDuration,
  UsersIcons,
} from "../../../../../comman/icons";
import { InitialSetupTable } from "./InitialSetupTable";

export default function InitialSetup() {
  const classes = useStyles();
  const { executeJMXData } = useSelector((state) => state.result);

  return (
    <Grid className={classes.mainContainer}>
      <Grid item xs={12} sm={12}>
        <Card style={{ padding: "20px" }}>
          <Grid item xs={12} sm={12} className={classes.InitialStateHeader}>
            <Grid>
              <Typography
                sx={{
                  fontFamily: "Lexend Deca",
                  fontSize: "30px",
                  fontWeight: "500",
                  color: "#646464",
                }}
              >
                Initial Setup
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={5} sm={5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Card style={{ width: "100%", height: "18vh" }}>
                        <CardContent>
                          <Typography
                            variant="body1"
                            className={`${classes.initialSetupCardStyle}`}
                          >
                            Total Scenarios
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.tbodyFont}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <SanariesIcon />
                            <span
                              style={{ color: "#654DF7", fontSize: "20px" }}
                            >
                              <span style={{ fontSize: "40px" }}>
                                {executeJMXData?.scenarios?.length
                                  ? executeJMXData?.scenarios?.length
                                  : null}
                              </span>
                              vu
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Card style={{ width: "100%", height: "18vh" }}>
                        <CardContent>
                          <Typography
                            variant="body1"
                            className={`${classes.initialSetupCardStyle}`}
                          >
                            Total Users
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.tbodyFont}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <span style={{ height: "18px", width: "26px" }}>
                              <UsersIcons />
                            </span>
                            <span
                              style={{ color: "#654DF7", fontSize: "20px" }}
                            >
                              <span style={{ fontSize: "40px" }}>
                                {executeJMXData?.totalUser}
                              </span>
                              vu
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card style={{ width: "100%", height: "18vh" }}>
                        <CardContent>
                          <Typography
                            variant="body1"
                            className={`${classes.initialSetupCardStyle}`}
                          >
                            Total Duration
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.tbodyFont}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <TotalDuration />
                            <span
                              style={{ color: "#FACE09", fontSize: "20px" }}
                            >
                              <span style={{ fontSize: "40px" }}>
                                {executeJMXData?.totalDuration}
                              </span>
                              s
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={6}>
                      <Card style={{ width: "100%", height: "18vh" }}>
                        <CardContent>
                          <Typography
                            variant="body1"
                            className={`${classes.initialSetupCardStyle}`}
                          >
                            Location
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.tbodyFont}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <TotalDuration />
                            <span
                              style={{ color: "#FACE09", fontSize: "20px" }}
                            >
                              Default
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {/* <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card style={{ width: "100%", height: "18vh" }}>
                        <CardContent>
                          <Typography
                            variant="body1"
                            className={`${classes.initialSetupCardStyle}`}
                          >
                            Ramp Up Time
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.tbodyFont}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                             <UpTimeIcon />
                             <span style={{ color: "#00A879", fontSize: "20px" }}>
                              <span style={{ fontSize: "40px" }}>
                               { executeJMXData?.totalRampUpTime}
                              </span>
                              s
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={6}>
                      <Card style={{ width: "100%", height: "18vh" }}>
                        <CardContent>
                          <Typography
                            variant="body1"
                            className={`${classes.initialSetupCardStyle}`}
                          >
                            Ramp Up Steps
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.tbodyFont}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <StepsIcon />
                            <span
                              style={{ color: "#00A879", fontSize: "40px" }}
                            >
                              {executeJMXData?.totalRampUpSteps}
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid> */}
                </Grid>
                <Grid item xs={7} sm={7}>
                  <Card
                    style={{
                      width: "100%",
                    }}
                  >
                    <InitialSetupTable data={executeJMXData} />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
