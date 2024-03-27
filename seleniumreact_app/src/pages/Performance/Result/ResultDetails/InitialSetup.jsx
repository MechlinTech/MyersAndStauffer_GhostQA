import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { useStyles } from "./styles";
import { Typography } from "@mui/material";
import {
  SanariesIcon,
  TotalDuration,
  UpTimeIcon,
  StepsIcon,
  UsersIcons,
} from "../../../../comman/icons";
import { InitialSetupTable } from "./InitialSetupTable";


const data = [
  { scenarioName: "Scenario 1", duration: "1 hour", location: "Location 1" },
  { scenarioName: "Scenario 2", duration: "2 hours", location: "Location 2" },
  {
    scenarioName: "Scenario 3",
    duration: "30 minutes",
    location: "Location 3",
  },
  {
    scenarioName: "Scenario 4",
    duration: "45 minutes",
    location: "Location 4",
  },
  { scenarioName: "Scenario 5", duration: "3 hours", location: "Location 5" },
  { scenarioName: "Scenario 6", duration: "2.5 hours", location: "Location 6" },
  { scenarioName: "Scenario 7", duration: "1.5 hours", location: "Location 7" },
  { scenarioName: "Scenario 8", duration: "2 hours", location: "Location 8" },
];

export default function InitialSetup() {
  const classes = useStyles();

  return (
    <Grid className={classes.mainContainer}>
      <Grid item xs={12} sm={12}>
        <Card style={{ padding: "20px" }}>
          <Grid item xs={12} sm={12} className={classes.RequestStateHeader}>
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
                            Total no of Sanarios
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
                              <SanariesIcon />
                            </span>
                            <span
                              style={{ color: "#654DF7", fontSize: "40px" }}
                            >
                              10uv
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
                             Total no. of Users
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
                              style={{ color: "#654DF7", fontSize: "40px" }}
                            >
                              10uv
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
                              style={{ color: "#FACE09", fontSize: "40px" }}
                            >
                              10uv
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
                            Duration
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
                              style={{ color: "#FACE09", fontSize: "40px" }}
                            >
                              5uv
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
                            <span
                              style={{ color: "#00A879", fontSize: "40px" }}
                            >
                              10uv
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
                              19
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7} sm={7}>
                  <Card
                    style={{
                      width: "100%",
                    }}
                  >
                    <InitialSetupTable data={data} />
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
