import React, { useState, useEffect } from 'react';
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
import {
  UserGroupIcon,
  AvarageIcon,
  ResponseTimeIcon,
  ErrorIcon,
  BandwidthIcon,
  TimeIcon,
} from "../../../../comman/icons";
import LineChart from "./LoadLineChart";
import ResponseLineChart from "./ResponseLineChart";




export default function Summary() {
  const classes = useStyles();
  const { executerData, executeJMXData, isRunning } = useSelector((state) => state.result);
  const [endedTime, setEndedTime] = useState(null);

console.log("executeJMXData", executeJMXData, executerData)

// Function to format date in "MMM DD, YYYY hh:mm:ss AM/PM" format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
  return date.toLocaleString('en-US', options);
}

// Convert totalDuration from seconds to minutes
const totalDurationInMinutes = executeJMXData.totalDuration / 60;
console.log("totalDurationInMinutes",executeJMXData.totalDuration / 60)
// Format start date
const formattedStartDate = formatDate(executeJMXData.startDate);

// For Location
const location = executeJMXData?.scenarios?.[0]?.location;

const getCurrentTime = () => {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
  return currentDate.toLocaleString('en-US', options);
};

useEffect(() => {
  if (!isRunning && !endedTime) {
    const currentTime = getCurrentTime();
    setEndedTime(currentTime);
  }
}, [isRunning, endedTime]);


const data = [
  { label: "Duration", value: `${totalDurationInMinutes} minutes` },
  { label: "Started", value: formattedStartDate },
  { label: "Ended", value: endedTime || "" },
  { label: "Test Type", value: "JMeter" },
  { label: "Response Codes", value: "2xx" },
  { label: "Locations", value: location ? location : "Unknown" },
];
  const calculateDonutHeight = () => {
    const parentContainer = document.getElementById("line-container");
    const parentContainerHeight = parentContainer
      ? parentContainer.clientHeight
      : window.innerHeight;
    const desiredPercentage = 38;
    const calculatedHeight = `${
      (parentContainerHeight * desiredPercentage) / 100
    }px`;

    return calculatedHeight;
  };

  return (
    <>
      <Grid className={classes.mainContainer}>
        {/* Top Component */}
        <Grid container style={{ height: "48vh", marginBottom:'10px' }} spacing={2}>
          <Grid item xs={12} sm={8} style={{ height: "100%" }}>
              {/*Top Left part of the card */}
                <Card
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "10px",
                    height: "100%",
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Top-left part */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        style={{
                          width: "100%",
                          height: "20vh",
                        }}
                      >
                        <CardContent>
                          {/* First row */}
                          <Typography
                            variant="body1"
                            className={`${classes.tbodyFont} ${classes.CustomfontSize}`}
                          >
                            Max User
                          </Typography>

                          {/* Second row */}
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
                            <UserGroupIcon />
                            <span
                              className={`${classes.fontSize50}`}
                              style={{ color: "#654DF7" }}
                            >
                              {executeJMXData?.totalUser}vu
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Top-middl-part */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        style={{
                          width: "100%",
                          height: "20vh",
                        }}
                      >
                        <CardContent>
                          {/* First row */}
                          <Typography
                            variant="body1"
                            className={`${classes.tbodyFont} ${classes.CustomfontSize}`}
                          >
                            Avg. Throughput
                          </Typography>

                          {/* Second row */}
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
                            <ResponseTimeIcon />
                            <span style={{ color: "#00A879" }}>
                              <span className={`${classes.fontSize50}`}>
                               {typeof executerData?.summary?.throughput === 'number' ? (executerData?.summary?.throughput / 1000).toFixed(2) : null}
                              </span>
                              Hits/s
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Top-right part */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        style={{
                          width: "100%",
                          height: "20vh",
                        }}
                      >
                        <CardContent>
                          {/* First row */}
                          <Typography
                            variant="body1"
                            className={`${classes.tbodyFont} ${classes.CustomfontSize}`}
                          >
                            Avg. Response Time
                          </Typography>

                          {/* Second row */}
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
                            <AvarageIcon />
                            <span style={{ color: "#FACE09" }}>
                              <span className={`${classes.fontSize50}`}>
                              {typeof executerData?.summary?.medianResTime === 'number' ? (executerData?.summary?.medianResTime / 1000).toFixed(2) : null}
                             
                              </span>
                              S
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Bottom-left part */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        style={{
                          width: "100%",
                          height: "20vh",
                        }}
                      >
                        <CardContent>
                          {/* First row */}
                          <Typography
                            variant="body1"
                            className={`${classes.tbodyFont} ${classes.CustomfontSize}`}
                          >
                            Errors
                          </Typography>

                          {/* Second row */}
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
                            <ErrorIcon />
                            <span style={{ color: "#F64E4E" }}>
                              <span className={`${classes.fontSize50}`}>{executerData?.summary?.errorPct}</span>
                              %
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Bottom-middle-part */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        style={{
                          width: "100%",
                          height: "20vh",
                        }}
                      >
                        <CardContent>
                          {/* First row */}
                          <Typography
                            variant="body1"
                            className={`${classes.tbodyFont} ${classes.CustomfontSize}`}
                          >
                            Avg. Bandwidth
                          </Typography>

                          {/* Second row */}
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
                            <BandwidthIcon />
                            <span style={{ color: "#00A879" }}>
                              <span className={`${classes.fontSize50}`}>
                              {typeof executerData?.summary?.receivedKBytesPerSec === 'number' ? (executerData?.summary?.receivedKBytesPerSec / 1000).toFixed(2) : null}
                              </span>
                              KiB/S
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Bottom-right part */}
                    <Grid item xs={12} sm={4}>
                      <Card
                        style={{
                          width: "100%",
                          height: "20vh",
                        }}
                      >
                        <CardContent>
                          {/* First row */}
                          <Typography
                            variant="body1"
                            className={`${classes.tbodyFont} ${classes.CustomfontSize}`}
                          >
                            90% Response Time
                          </Typography>

                          {/* Second row */}
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
                            <TimeIcon />
                            <span style={{ color: "#FACE09" }}>
                              <span className={`${classes.fontSize50}`}>
                              {/* {executerData?.summary?.pct1ResTime} */}
                              {typeof executerData?.summary?.pct1ResTime === 'number' ? (executerData?.summary?.pct1ResTime / 1000).toFixed(2) : null}
                              </span>
                              S
                            </span>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Card>
          </Grid>
          {/* Spacing */}
        
          {/*Top Right side */}
          <Grid item xs={12} sm={4} style={{ height:'100%' }}>
            <Card style={{ marginTop: "20px", width: "100%", height:'100%' }}>
              <CardContent>
                <Grid container spacing={2} style={{ height: "100%" }}>
                  {data.map((item, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} sm={4}>
                        <Typography className={classes.durationStyle}>{item.label}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <Typography>:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <Typography className={classes.durationStyle}>{item.value}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Buttom Component */}

        <Grid container spacing={1} sx={{marginTop:'20px !important'}} style={{marginTop:'20px'}}>
          <Grid item xs={12} sm={12}>

            <Card
              style={{
                width: "100%",
                height: "50vh",
                padding: "10px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  <Card
                    style={{
                      width: "100%",
                      height: "45vh",
                    }}
                  >
                    <LineChart height={calculateDonutHeight()} />
                  </Card>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Card
                    style={{
                      width: "100%",
                      height: "45vh",
                    }}
                  >
                    <ResponseLineChart height={calculateDonutHeight()} />
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
