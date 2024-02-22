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

export default function TestSuitsDetails() {
  const { testSuiteName, testRunName } = useParams();
  const classess = useStyles();
  const dispatch = useDispatch();
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const navigate = useNavigate();
  const { testCaseDetils, testCaseSteps } = useSelector(
    (state) => state.selenium
  );

  useEffect(() => {
    if (testSuiteName !== undefined && testRunName !== undefined) {
      let data = {
        testSuitName: testSuiteName,
        runId: testRunName,
      };

      dispatch(GetTestCaseDetails(data));
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
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
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
      hour12: true,
    };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString(
      undefined,
      options
    );
    return formattedTime;
  }

  return (
    <>
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
                        >{`${formatDateStringWithTime(
                          testCaseDetils.TestRunStartDateTime
                        )}`}</Typography>
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
                            new Date(testCaseDetils.TestRunEndDateTime) -
                              new Date(testCaseDetils.TestRunStartDateTime)
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
                <Card style={{ height: "40vh" }}>
                  <Table>
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#f0f0f0" }}>
                        <TableCell>Status</TableCell>
                        <TableCell>Test Case Name</TableCell>
                        <TableCell>Video</TableCell>
                        <TableCell>Start Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {testCaseDetils.TestCaseDetailsList?.map((row, index) => (
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
                          <CustomVideoChell row={row} />
                          <TableCell className={classess.tbodyFont}>
                            {formatTime(row.TestRunStartDateTime)}
                          </TableCell>
                        </TableRow>
                      ))}
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
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Chip
                          label={`${formatDateStringWithTime(
                            testCaseSteps.TestCaseStartDate
                          )}`}
                          color="primary"
                          variant="outlined"
                          style={{ marginRight: 8, marginBottom: 8 }}
                        />
                        <Chip
                          label={`${formatDateStringWithTime(
                            testCaseSteps.TestCaseEndDate
                          )}`}
                          color="secondary"
                          variant="outlined"
                          style={{ marginRight: 8, marginBottom: 8 }}
                        />
                        <Chip
                          label={`${formatTimeDifference(
                            new Date(testCaseSteps.TestCaseEndDate) -
                              new Date(testCaseSteps.TestCaseStartDate)
                          )}`}
                          color="default"
                          variant="outlined"
                          style={{ marginBottom: 8 }}
                        />
                      </CardContent>
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
                                  {formatTime(row.Timestamp)}
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
    </>
  );
}