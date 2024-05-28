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
  Button,
  Breadcrumbs,
  TableContainer,
} from "@material-ui/core";
import { StyledTypography, useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Donut from "./DonutChart";
import CustomVideoChell from "./modals/CustomVideoChell";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@material-ui/core";
import { StyledTableCell } from "./styles";
import CustomStatusCell from "./modals/CustomStatusCell";
import { fetchStepDetails } from "../../../../redux/actions/testlab/ResultAction";
import Rundetails from "./RundetailsTable";
import { useState } from "react";
// import BugReport from "./CreateIssue";
export default function TestLabSuitsDetails() {
  const { testSuiteName, testRunId } = useParams();
  const classess = useStyles();
  const dispatch = useDispatch();
  const [selectedRunId, setSelectedRunId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { executionDetail } = useSelector(
    (state) => state.testlabResult
  );
  const testCaseDetails = {
    TestSuiteName: "Aa-Test-Demo1",
    TestRunName: "TestRun-1",
    TestEnvironment: "staging",
    TesterName: "admin@gmail.com",
    TotalTestCases: 1,
    PassedTestCases: 0,
    FailedTestCases: 1,
    TestRunStartDate: "2024-04-25",
    TestRunStartTime: "19:47:53",
    TestRunEndDate: "2024-04-25",
    TestRunEndTime: "21:30:24",
    TestCaseDetailsList: [
      {
        TestSuiteName: "Aa-Test-Demo1",
        TestRunName: "TestRun-1",
        TestCaseName: "VerifyLoginOK",
        TestCaseStatus: "Failed",
        TestCaseVideoURL: "\\Recordings\\25-04-2024\\12-00-24.mp4",
        TestRunStartDate: "2024-04-25",
        TestRunStartTime: "19:47:53",
        TestRunEndDate: "2024-04-25",
        TestRunEndTime: "21:30:24",
      },
    ],
  };
  const handleRowClick = (runId) => {
    setSelectedRunId(runId);
    dispatch(fetchStepDetails(runId));
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };
  
  function extractDate(dateStr) {
    if (typeof dateStr !== "string") {
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
  
  const testData = [{ name: "Tester Name", value: testCaseDetails.TesterName }];

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
                <Box fontSize="14px">{testRunId}</Box>
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
                    {testCaseDetails?.PassedTestCases ||
                    testCaseDetails?.FailedTestCases ? (
                      <Donut
                        series={[
                          testCaseDetails?.PassedTestCases,
                          testCaseDetails?.FailedTestCases,
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
                            {testCaseDetails?.PassedTestCases} Tests Passed
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classess.tbodyFont}
                          >
                            {testCaseDetails?.FailedTestCases} Tests Failed
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
                            {/* {formatDateString(testCaseDetails.TestRunStartDate)}{" "} */}
                            {`${extractDate(
                              testCaseDetails?.TestRunStartDate
                            )} ${testCaseDetails.TestRunStartTime}`}
                            {/* {formatDateStringWithTime(`${testCaseDetails.TestRunStartDate}T${testCaseDetails.TestRunStartTime}`)} */}
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
                            {testCaseDetails?.TotalTestCases} Total Test Case
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ color: "#654DF7" }}
                            className={classess.tbodyFont}
                          >
                            {(testCaseDetails.PassedTestCases /
                              testCaseDetails.TotalTestCases) *
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
                                `${testCaseDetails.TestRunEndDate}T${testCaseDetails.TestRunEndTime}`
                              ) -
                                new Date(
                                  `${testCaseDetails.TestRunStartDate}T${testCaseDetails.TestRunStartTime}`
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
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Run Id </StyledTableCell>
                            <StyledTableCell>Start Time</StyledTableCell>
                            <StyledTableCell>End Time</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Video</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {executionDetail ? (
                            executionDetail.map((row) => (
                              <TableRow
                                key={row.TestCase}
                                className={`${classess.tableRow} ${
                                  selectedRunId === row.TestCase
                                    ? classess.activeRow
                                    : ""
                                }`}
                                // spacing="1"
                                onClick={() => handleRowClick(row.TestCase)}
                              >
                                <StyledTableCell
                                  sx={{
                                    color:
                                      selectedRunId === row.TestCase
                                        ? "white"
                                        : "#654DF7",
                                  }}
                                >
                                  {row.TestCase}
                                </StyledTableCell>
                                <StyledTableCell
                                  sx={{
                                    color:
                                      selectedRunId === row.TestCase
                                        ? "white"
                                        : "black",
                                  }}
                                >
                                  {formatDate(row.StartDateTime)}
                                </StyledTableCell>
                                <StyledTableCell
                                  sx={{
                                    color:
                                      selectedRunId === row.TestCase
                                        ? "white"
                                        : "black",
                                  }}
                                >
                                  {formatDate(row.EndDateTime)}
                                </StyledTableCell>
                                <CustomStatusCell
                                  status={row.Status}
                                  selected={selectedRunId === row.TestCase}
                                />
                                <StyledTableCell>
                                  <CustomVideoChell imgUrl = {row.TestVideoUrl} isSelected = {selectedRunId === row.TestCase}/>
                                </StyledTableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <StyledTableCell colSpan={5} align="center">
                                No execution history
                              </StyledTableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
                {selectedRunId && (
                  <Grid item xs={12}>
                    <Card>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell colSpan={4}>
                                <StyledTypography variant="h6" color="primary">
                                  {selectedRunId}
                                </StyledTypography>
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <Rundetails/>
                          </TableBody>
                        </Table>
                      </TableContainer>
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
