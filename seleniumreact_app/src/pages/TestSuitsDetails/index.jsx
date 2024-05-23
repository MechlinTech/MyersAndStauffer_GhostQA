import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import {
  GetTestCaseDetails,
  GetTestCaseStepsDetails,
} from "../../redux/actions/seleniumAction";
import CustomeTableChell from "./CustomeTableChell";
import Donut from "./DonutChart";
import CustomVideoChell from "./CustomVideoChell";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@material-ui/core";
import BugReportIcon from '@mui/icons-material/BugReport';
import BugReport from "./CreateIssue";
export default function TestSuitsDetails() {
  const { testSuiteName, testRunName } = useParams();
  const classess = useStyles();
  const dispatch = useDispatch();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { testCaseDetils, testCaseSteps } = useSelector(
    (state) => state.selenium
  );

  useEffect(() => {
    if (testSuiteName !== undefined && testRunName !== undefined) {
      let data = {
        testSuitName: testSuiteName,
        runId: testRunName,
      };

      dispatch(GetTestCaseDetails(data, setLoading));
    }
  }, [dispatch, testSuiteName, testRunName]);

  const handleRowClick = (payload) => {
    let data = {
      testSuitName: payload.TestSuiteName,
      runId: payload.TestRunName,
      testCaseName: payload.TestCaseName,
    };
    dispatch(GetTestCaseStepsDetails(data));
    setButtonClicked(true);
    setActiveRow((prevSuite) => (prevSuite === payload ? null : payload));
  };

  function formatDateStringWithTime(dateString) {
    let dd = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // hour12: true
    };

    const formattedDate = dd.toLocaleString(undefined, options);
    return formattedDate;
  }

  function formatDateString(dateString) {
    let dd = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    const formattedDate = dd.toLocaleString("en-US", options);
    return formattedDate;
  }

  const calculateDonutHeight = () => {
    const parentContainer = document.getElementById("donut-container");
    const parentContainerHeight = parentContainer
      ? parentContainer.clientHeight
      : window.innerHeight;
    const desiredPercentage = 38;
    const calculatedHeight = `${
      (parentContainerHeight * desiredPercentage) / 100
    }px`;

    return calculatedHeight;
  };

  function formatTimeDifference(timeDifference) {
    const seconds = Math.floor(timeDifference / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const padWithZero = (num) => (num < 10 ? `0${num}` : num);

    // Format the time components with leading zeros
    const formattedHours = padWithZero(hours);
    const formattedMinutes = padWithZero(minutes);
    const formattedSeconds = padWithZero(remainingSeconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  const testData = [
    { name: "Tester Name", value: testCaseDetils.TesterName },
    { name: "Test Environment", value: testCaseDetils.TestEnvironment },
    // Add more data as needed
  ];
  function formatTime(dateTimeString) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString(
      undefined,
      options
    );
    return formattedTime;
  }

  function extractTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);

    // Extracting hours, minutes, and seconds
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Convert to 12-hour format with AM/PM
    const timeString = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${
      hours >= 12 ? "PM" : "AM"
    }`;
    return timeString;
  }

  function extractDate(dateStr) {
    if (typeof dateStr !== 'string') {
      return null; // Return null or some default value if dateStr is invalid
    }
    const [year, month, day] = dateStr?.split("-");

    const monthNames = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    const formattedDate = `${monthNames[month]} ${parseInt(day, 10)}, ${year}`;

    return formattedDate;
  }
  const [drawerOpen, setdrawerOpen] = useState(false)
  return (
    <>
      {" "}
      {!loading ? (
        <Grid className={classess.mainContainer}>
          {/* header button */}
          <Grid
            xs={12}
            container
            style={{ marginBottom: "15px" }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid>
              <Breadcrumbs separator="›" className={classess.breadCrumbHead}>
                <Box
                  onClick={() => {
                    navigate(-1);
                  }}
                  className={classess.breadCrumbStyle}
                >
                  {testSuiteName}
                </Box>
                <Box fontSize="14px">{testRunName}</Box>
              </Breadcrumbs>
            </Grid>
            <Grid>
              <Stack justifyContent="flex-end" alignItems="flex-end">
                <Button
                  className={classess.backBtn}
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
          {/* main compoent */}
          <Grid container spacing={2}>
            {/* Left side content */}
            <Grid item xs={12} sm={7}>
              <Grid container spacing={2}>
                {/* Left part of the card */}
                <Grid item xs={12} sm={6}>
                  <Card
                    style={{
                      background: "#f1f1f1",
                      height: "40vh",
                      padding: "10px 15px",
                      // display: "flex",
                      flexDirection: "column",
                      justifyContent: "center", // Center vertically
                      alignItems: "center", // Center horizontally
                    }}
                  >
                    {testCaseDetils?.PassedTestCases ||
                    testCaseDetils?.FailedTestCases ? (
                      <Donut
                        series={[
                          testCaseDetils?.PassedTestCases,
                          testCaseDetils?.FailedTestCases,
                        ]}
                        labels={["Passed", "Failed"]}
                        height={calculateDonutHeight()}
                      />
                    ) : (
                      <div>No data available</div>
                    )}
                  </Card>
                </Grid>

                {/* Right part of the card */}
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    {/* Top-left part */}
                    <Grid item xs={12} sm={6}>
                      <Card
                        style={{
                          width: "100%",
                          height: "19vh",
                        }}
                      >
                        <CardContent className={classess.hederStyle}>
                          <Typography style={{ fontSize: "14px" }}>
                            Tests
                          </Typography>
                        </CardContent>

                        <CardContent>
                          {" "}
                          <Typography
                            variant="body1"
                            className={classess.tbodyFont}
                          >
                            {testCaseDetils?.PassedTestCases} Tests Passed
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classess.tbodyFont}
                          >
                            {testCaseDetils?.FailedTestCases} Tests Failed
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Top-right part */}
                    <Grid item xs={12} sm={6}>
                      <Card
                        style={{
                          width: "100%",
                          height: "19vh",
                        }}
                      >
                        <CardContent className={classess.hederStyle}>
                          <Typography style={{ fontSize: "14px" }}>
                            Start Date, Time
                          </Typography>
                        </CardContent>

                        <CardContent>
                          {" "}
                          <Typography
                            variant="body1"
                            className={classess.tbodyFont}
                          >
                            {/* {formatDateString(testCaseDetils.TestRunStartDate)}{" "} */}
                            {`${extractDate(
                              testCaseDetils?.TestRunStartDate
                            )} ${testCaseDetils.TestRunStartTime}`}
                            {/* {formatDateStringWithTime(`${testCaseDetils.TestRunStartDate}T${testCaseDetils.TestRunStartTime}`)} */}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Bottom-left part */}
                    <Grid item xs={12} sm={6}>
                      <Card
                        style={{
                          width: "100%",
                          height: "19vh",
                        }}
                      >
                        <CardContent className={classess.hederStyle}>
                          <Typography style={{ fontSize: "14px" }}>
                            Tests
                          </Typography>
                        </CardContent>

                        <CardContent>
                          {" "}
                          <Typography
                            variant="body1"
                            className={classess.tbodyFont}
                          >
                            {testCaseDetils?.TotalTestCases} Total Test Case
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ color: "#654DF7" }}
                            className={classess.tbodyFont}
                          >
                            {(testCaseDetils.PassedTestCases /
                              testCaseDetils.TotalTestCases) *
                              100}
                            %
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Bottom-right part */}
                    <Grid item xs={12} sm={6}>
                      <Card
                        style={{
                          width: "100%",
                          height: "19vh",
                        }}
                      >
                        <CardContent className={classess.hederStyle}>
                          <Typography style={{ fontSize: "14px" }}>
                            Duration
                          </Typography>
                        </CardContent>

                        <CardContent>
                          {" "}
                          <Typography
                            variant="body1"
                            className={classess.tbodyFont}
                          >
                            {formatTimeDifference(
                              new Date(
                                `${testCaseDetils.TestRunEndDate}T${testCaseDetils.TestRunEndTime}`
                              ) -
                                new Date(
                                  `${testCaseDetils.TestRunStartDate}T${testCaseDetils.TestRunStartTime}`
                                )
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card>
                    <Table>
                      <TableHead>
                        <TableRow style={{ backgroundColor: "#f0f0f0" }}>
                          <TableCell>Status</TableCell>
                          <TableCell>Test Case Name</TableCell>
                          <TableCell></TableCell>
                          <TableCell>Video</TableCell>
                          <TableCell>Start Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {testCaseDetils.TestCaseDetailsList?.map(
                          (row, index) => (
                            <TableRow
                              key={index}
                              className={`${classess.hoverPointer} ${
                                row === activeRow ? classess.activeRow : ""
                              }`}
                              onClick={() => handleRowClick(row)}
                            >
                              <TableCell>
                                {row.TestCaseStatus === "Passed" ? (
                                  <Icon
                                    component={CheckCircleIcon}
                                    style={{ color: "#198754" }}
                                  />
                                ) : (
                                  <Icon
                                    component={CancelIcon}
                                    style={{ color: "#dc3545" }}
                                  />
                                )}
                              </TableCell>
                              <TableCell className={classess.tbodyFont}>
                                {row.TestCaseName}
                              </TableCell>
                              <TableCell className={classess.tbodyFont}>
                                {/* {row.TestCaseStatus === "Failed" && <BugReportIcon style={{color:'#dc3545'}} onClick={()=>setdrawerOpen(true)}/>} */}
                                <BugReport row={row}/>
                              </TableCell>
                              <CustomVideoChell row={row} />
                              <TableCell className={classess.tbodyFont}>
                                {/* {formatTime(row.TestRunStartDateTime)} */}
                                {row.TestRunStartTime}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Right side */}

            <Grid item xs={12} sm={5}>
              <Grid container spacing={2}>
                {/* Top part of the card */}
                <Grid item xs={12}>
                  <Card
                    style={{
                      height: "40vh",
                    }}
                  >
                    <CardContent className={classess.headrRightSite}>
                      <Typography className={classess.theadFont}>
                        Environment
                      </Typography>
                    </CardContent>

                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "400" }}>
                            Name
                          </TableCell>
                          <TableCell style={{ fontWeight: "400" }}>
                            Value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {testData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className={classess.tbodyFont}>
                              {row.name}
                            </TableCell>
                            <TableCell className={classess.tbodyFont}>
                              {row.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* Left part of the card */}
                {isButtonClicked &&
                  testCaseSteps &&
                  testCaseSteps.TestCaseSteps && (
                    <Grid item xs={12}>
                      <Card
                        style={{
                          minheight: "40vh",
                        }}
                      >
                        <CardContent
                          className={classess.headrRightSite}
                          style={{
                            color:
                              activeRow?.TestCaseStatus === "Failed"
                                ? "red"
                                : "green",
                          }}
                        >
                          <Typography>{testCaseSteps.TestCaseName}</Typography>
                        </CardContent>
                        <CardContent
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "10px 0 0 0",
                          }}
                        >
                          <Box textAlign="center">
                            <Typography variant="subtitle1">
                              Start DateTime
                            </Typography>
                            <Chip
                              label={`${extractDate(testCaseSteps.TestCaseStartDate)} ${testCaseSteps.TestCaseStartTime}`}
                              // label={formatDateStringWithTime(`${testCaseSteps.TestCaseStartDate}T${testCaseSteps.TestCaseStartTime}`)}
                              color="primary"
                              variant="outlined"
                              style={{ marginRight: 8, marginBottom: 8 }}
                            />
                          </Box>
                          <Box textAlign="center">
                            <Typography variant="subtitle1">
                              End DateTime
                            </Typography>
                            <Chip
                              label={`${extractDate(testCaseSteps.TestCaseEndDate)} ${testCaseSteps.TestCaseEndTime}`}
                              // label={formatDateStringWithTime(`${testCaseSteps.TestCaseEndDate}T${testCaseSteps.TestCaseEndTime}`)}
                              color="secondary"
                              variant="outlined"
                              style={{ marginRight: 8, marginBottom: 8 }}
                            />
                          </Box>
                          <Box textAlign="center">
                            <Typography variant="subtitle1">
                              Duration
                            </Typography>
                            <Chip
                              label={formatTimeDifference(
                                new Date(
                                  `${testCaseSteps.TestCaseEndDate}T${testCaseSteps.TestCaseEndTime}`
                                ) -
                                  new Date(
                                    `${testCaseSteps.TestCaseStartDate}T${testCaseSteps.TestCaseStartTime}`
                                  )
                              )}
                              color="default"
                              variant="outlined"
                              style={{ marginBottom: 8 }}
                            />
                          </Box>
                        </CardContent>
                        <hr />
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Status</TableCell>
                              <TableCell>Timestamp</TableCell>
                              <TableCell>Details</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {JSON.parse(testCaseSteps?.TestCaseSteps)?.map(
                              (row, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {" "}
                                    {row.Status === "Passed" ? (
                                      <Icon
                                        component={CheckCircleIcon}
                                        style={{ color: "#198754" }}
                                      />
                                    ) : (
                                      <Icon
                                        component={CancelIcon}
                                        style={{ color: "#dc3545" }}
                                      />
                                    )}
                                  </TableCell>
                                  <TableCell className={classess.tbodyFont}>
                                    {" "}
                                    {/* {formatTime(row.Timestamp)} */}
                                    {/* {extractTime(row.Timestamp)} */}
                                    {row.TimeStamp}
                                    {console.log(row.Timestamp)}
                                  </TableCell>
                                  {row.Status === "Passed" ? (
                                    <TableCell
                                      style={{ overflowWrap: "anywhere" }}
                                    >
                                      {row.Details}
                                    </TableCell>
                                  ) : (
                                    <TableCell
                                      style={{ overflowWrap: "anywhere" }}
                                    >
                                      {row.FailureMessage !== null &&
                                      row.FailureMessage !== undefined
                                        ? row.FailureMessage
                                        : row.Details}
                                    </TableCell>
                                  )}

                                  {row.FailureScreenShots ? (
                                    <CustomeTableChell row={row} />
                                  ) : (
                                    <TableCell></TableCell>
                                  )}
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Card>
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={25} />
        </div>
      )}
    </>
  );
}
