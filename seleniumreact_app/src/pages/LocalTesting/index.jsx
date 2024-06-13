import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import SearchField from "../../comman/SearchField";
import BasicAccordion from "../../comman/Accordion";
import {
  getTestCaseRundetailsByTestName,
  getTestSuites,
  ExecuteTestCasesByTestSuite,
  Getsuitebyname,
  setExecutingSuite,
  setSelectedSuite,
  setSelectedTab,
} from "../../redux/actions/seleniumAction";
import { useDispatch, useSelector } from "react-redux";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Graph from "./component/InbuiltSuite/Components/Graph";
import { Tooltip } from "@mui/material";
import DeleteSuite from "./component/InbuiltSuite/Modal/DeleteSuite";

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((store) => store.auth);
  const {
    testSuits,
    testSuiteAdded,
    executingSuite,
    selectedSuite,
    selectedTab,
  } = useSelector((state) => state.selenium);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDelModal, setopenDelModal] = useState(false);
  const [suitToDelete, setsuitToDelete] = useState("");
  const [inprogress, setInProgress] = useState(false);
  const [suiteTab, setSuiteTab] = useState("1"); 

  useEffect(() => {
    if (testSuiteAdded?.actionType === "SaveAndExecute") {
      let data = {
        TestSuiteName: testSuiteAdded.testSuiteName,
        TestSuiteFlag: "Custom",
      };
      handleExecuteClick(data);
    }
  }, [testSuiteAdded]);

  useEffect(() => {
    // Set default selected tab to "inbuilt"
    dispatch(setSelectedTab("inbuilt"));
  }, [dispatch]);

  const handleAddSuite = () => {
    navigate("/add-suite");
  };

  const handleTabChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
  };

  const handleSuiteTabChange = (event, newValue) => {
    setSuiteTab(newValue); 
  };

  const tabLableStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    padding: "10px 22px",
  };

  const tabHeaderStyle = {
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "Lexend Deca",
  };

  useEffect(() => {
    dispatch(getTestSuites());
  }, [dispatch, openDelModal]);

  useEffect(() => {
    if (!executingSuite) {
      dispatch(getTestCaseRundetailsByTestName(selectedSuite, setInProgress));
    }
  }, [executingSuite, dispatch, selectedSuite]);

  const filteredTestSuiteData = testSuits?.filter((suite) =>
    suite?.TestSuiteName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handlePaperClick = (suite) => {
    let data = suite.TestSuiteName;
    dispatch(setSelectedSuite(data));
    dispatch(getTestCaseRundetailsByTestName(data, setInProgress));
  };

  const handleEditClick = (suite) => {
    const suiteName = suite.TestSuiteName;
    dispatch(Getsuitebyname(suiteName));
    navigate(`/edit/${suiteName}`);
  };

  const handleExecuteClick = (suite) => {
    dispatch(setExecutingSuite(suite.TestSuiteName));
    let data = {
      testSuiteName: suite.TestSuiteName,
      userId: userId,
    };
    dispatch(ExecuteTestCasesByTestSuite(data));
  };

  const handleDeleteClick = (suite) => {
    setopenDelModal(true);
    setsuitToDelete(suite.TestSuiteName);
  };

  return (
    <>
      <div className={classes.main}>
        <DeleteSuite
          open={openDelModal}
          onClose={() => setopenDelModal(false)}
          suitToDelete={suitToDelete}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card style={{ paddingBottom: "30px", maxHeight: "78vh" }}>
              <Grid container alignItems="center">
                {executingSuite && (
                  <Grid
                    item
                    xs={12}
                    style={{
                      color: "red",
                      padding: "3px",
                      textAlign: "center",
                    }}
                  >
                    Another test is already running, please wait until the test
                    is completed.
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleTabChange} aria-label="Tabs">
                        <Tab
                          label="In-built Suite"
                          value="inbuilt"
                          style={tabHeaderStyle}
                        />
                        <Tab
                          label="Custom Suite"
                          value="custom"
                          style={tabHeaderStyle}
                        />
                      </TabList>
                    </Box>
                  </TabContext>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} style={{ padding: "10px 20px" }}>
                  <SearchField
                    placeholder="Search Test Suite..."
                    onChange={(value) => setSearchTerm(value)}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                style={{
                  overflow: "auto",
                  maxHeight: "calc(70vh - 50px)",
                  paddingBottom: "10px",
                }}
              >
                {selectedTab === "inbuilt" && (
                  <>
                    {filteredTestSuiteData &&
                    filteredTestSuiteData.length > 0 ? (
                      filteredTestSuiteData.map((suite) => (
                        <Paper
                          key={suite.TestSuiteName}
                          className={`${classes.paper} ${
                            selectedSuite === suite.TestSuiteName
                              ? classes.paperActive
                              : ""
                          }`}
                          onClick={() => handlePaperClick(suite)}
                        >
                          <Grid container className={classes.paperGrid}>
                            <Grid item className={classes.infoGridHeader}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Tooltip
                                  title={
                                    suite.TestSuiteName?.length > 30 &&
                                    suite.TestSuiteName
                                  }
                                >
                                  <Typography
                                    className={`${classes.infoHeader} ${
                                      selectedSuite === suite.TestSuiteName
                                        ? classes.activeColor
                                        : ""
                                    }`}
                                  >
                                    {suite.TestSuiteName?.length > 30
                                      ? suite.TestSuiteName.slice(0, 30) + "..."
                                      : suite.TestSuiteName}
                                  </Typography>
                                </Tooltip>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {suite.TestSuiteFlag === "Custom" && (
                                    <>
                                      {executingSuite ===
                                      suite.TestSuiteName ? (
                                        <CircularProgress
                                          size={25}
                                          style={{
                                            marginRight: "8px",
                                            color:
                                              selectedSuite ===
                                              suite.TestSuiteName
                                                ? "#fff"
                                                : "rgb(101, 77, 247)",
                                          }}
                                        />
                                      ) : (
                                        <PlayCircleIcon
                                          style={{
                                            marginRight: "8px",
                                            color:
                                              selectedSuite ===
                                              suite.TestSuiteName
                                                ? "#fff"
                                                : "rgb(101, 77, 247)",
                                            cursor: executingSuite
                                              ? "not-allowed"
                                              : "pointer",
                                            opacity: executingSuite ? 0.7 : 1,
                                          }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (!executingSuite)
                                              handleExecuteClick(suite);
                                          }}
                                        />
                                      )}
                                      <EditIcon
                                        style={{
                                          marginRight: "8px",
                                          color:
                                            selectedSuite ===
                                            suite.TestSuiteName
                                              ? "#fff"
                                              : "rgb(101, 77, 247)",
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditClick(suite);
                                        }}
                                      />
                                      <DeleteIcon
                                        style={{ color: "rgb(247, 77, 77)" }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteClick(suite);
                                        }}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))
                    ) : (
                      <Box textAlign="center">No test suite</Box>
                    )}
                  </>
                )}
              </Grid>
            </Card>
          </Grid>

          {selectedSuite && (
            <Grid item xs={12} sm={8}>
              <Card>
                <Box style={tabLableStyle}>
                  {selectedTab === "inbuilt" ? "Test Run" : "Custom Suite"}
                </Box>
                {selectedTab === "inbuilt" && (
                  <Grid container>
                    <Grid item xs={12} style={{ paddingLeft: "20px" }}>
                      <TabContext value={suiteTab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleSuiteTabChange}
                            aria-label="Test Run Tabs"
                          >
                           <Tab
                            label="Dashboard"
                            value="1"
                            style={tabHeaderStyle}
                          />
                          <Tab
                            label="History"
                            value="2"
                            style={tabHeaderStyle}
                          />
                          </TabList>
                        </Box>
                        <TabPanel value="1" style={{ padding: "0px" }}>
                          <Grid
                            item
                            style={{
                              maxHeight: "70vh",
                              overflow: "auto",
                              paddingBottom: "10px",
                            }}
                          >
                            {inprogress ? (
                              <Box textAlign="center">
                                <CircularProgress />
                              </Box>
                            ) : (
                              <Graph />
                            )}
                          </Grid>
                        </TabPanel>
                        <TabPanel value="2" style={{ padding: "0px" }}>
                          <Grid
                            item
                            style={{
                              maxHeight: "70vh",
                              overflow: "auto",
                              paddingBottom: "10px",
                            }}
                          >
                            {inprogress ? (
                              <Box textAlign="center">
                                <CircularProgress />
                              </Box>
                            ) : (
                              <BasicAccordion />
                            )}
                          </Grid>
                        </TabPanel>
                      </TabContext>
                    </Grid>
                  </Grid>
                )}
                {selectedTab === "custom" && (
                  <Grid container justify="center">
                    <Typography variant="h6" style={{ marginTop: "20px" }}>
                      Custom Suite
                    </Typography>
                  </Grid>
                )}
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}
