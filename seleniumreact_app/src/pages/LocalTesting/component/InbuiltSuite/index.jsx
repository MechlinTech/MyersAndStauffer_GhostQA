import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import {
  getTestCaseRundetailsByTestName,
  getTestSuites,
  ExecuteTestCasesByTestSuite,
  Getsuitebyname,
  setExecutingSuite,
  setSelectedSuite,
  setSelectedTab,
} from "./../../../../redux/actions/seleniumAction";
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
import Graph from "./Components/Graph";
import { Tooltip } from "@mui/material";
import BasicAccordion from './../../../../comman/Accordion/index';

export default function InbuiltSuite() {
  const classess = useStyles();
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
 

  useEffect(() => {
    console.log("testSuiteAdded", testSuiteAdded);
    if (testSuiteAdded?.actionType == "SaveAndExecute") {
      let data = {
        TestSuiteName: testSuiteAdded.testSuiteName,
        TestSuiteFlag: "Custom",
      };
      handleExecuteClick(data);
    }
  }, [testSuiteAdded]);
  const handleAddSuite = () => {
    navigate("/add-suite");
  };

  const handleTabChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
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

  useEffect(()=>{
    if(!executingSuite)
    dispatch(getTestCaseRundetailsByTestName(selectedSuite,setInProgress))
  },[executingSuite])
  const filteredTestSuiteData =
    testSuits &&
    testSuits?.filter((suite) =>
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
        testSuiteName:suite.TestSuiteName,
        userId: userId
    }
    dispatch(ExecuteTestCasesByTestSuite(data));
  };

  const handleDeleteClick = (suite) => {
    setopenDelModal(true);
    setsuitToDelete(suite.TestSuiteName);
  };

  return (
    <>
      <div className={classess.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
              <Grid
                item
                style={{
                  overflow: "auto",
                  maxHeight: "calc(70vh - 50px)",
                  paddingBottom: "10px",
                }}
              >
                {filteredTestSuiteData ? (
                  filteredTestSuiteData.map((suite, index) => (
                    <Paper
                      key={suite.TestSuiteName}
                      className={`${classess.paper} ${
                        selectedSuite === suite.TestSuiteName
                          ? classess.paperActive
                          : ""
                      }`}
                      onClick={() => handlePaperClick(suite)}
                    >
                      <Grid container className={classess.paperGrid}>
                        <Grid item className={classess.infoGridHeader}>
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
                                className={`${classess.infoHeader} ${
                                  selectedSuite === suite.TestSuiteName
                                    ? classess.activeColor
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
                              {suite.TestSuiteFlag == "Custom" && (
                                <>
                                  {executingSuite &&
                                  executingSuite === suite.TestSuiteName ? (
                                    <CircularProgress
                                      size={25}
                                      style={{
                                        marginRight: "8px",
                                        color:
                                          selectedSuite === suite.TestSuiteName
                                            ? "#fff"
                                            : "rgb(101, 77, 247)",
                                      }}
                                    />
                                  ) : (
                                    <PlayCircleIcon
                                      style={{
                                        marginRight: "8px",
                                        color:
                                          selectedSuite === suite.TestSuiteName
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
                                        selectedSuite === suite.TestSuiteName
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
              </Grid>
          </Grid>

          {/* Right side for Test Cases */}
          {selectedSuite !== null && (
            <Grid item xs={12} sm={8}>
              <Card>
                <Box style={tabLableStyle}>Test Run</Box>
                <Grid container>
                  <Grid item xs={12} style={{ paddingLeft: "20px" }}>
                    <TabContext value={selectedTab}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleTabChange}
                          textColor="black"
                          sx={{
                            "& .Mui-selected": {
                              color: "#654DF7",
                            },
                            "& .MuiTabs-indicator": {
                              backgroundColor: "#654DF7",
                            },
                          }}
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
                      <TabPanel value="1">
                        <Graph testSuitName={selectedSuite} />
                      </TabPanel>
                      <TabPanel value="2">
                        <Box sx={{ padding: "0 !important" }}>
                          {inprogress ? (

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CircularProgress size={25} />
                            </div>
                          ) : (
                            <BasicAccordion inprogress={inprogress} />
                          )}
                        </Box>
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}
