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
import CircularProgress from '@mui/material/CircularProgress';
import LoadingWave from "./Modal/LoadingWave";
import DeleteSuite from "./Modal/DeleteSuite";
import { useNavigate } from "react-router-dom";
import Graph from "./Components/Graph";
import { Tooltip } from "@mui/material";
 
export default function Dashboard() {
  const classess = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { testSuits, testSuiteAdded,executingSuite } = useSelector((state) => state.selenium);
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabNo, setTabNo] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const [openDelModal, setopenDelModal] = useState(false);
  const [suitToDelete, setsuitToDelete] = useState("");
  // const [executingSuite, setexecutingSuite] = useState({});
  const [inprogress, setInProgress] = useState(false);

  useEffect(() => {
    // dispatch(ExecuteTestCasesByTestSuite(data, controlLoading));
    console.log("testSuiteAdded",testSuiteAdded)
    if(testSuiteAdded?.actionType == "SaveAndExecute") {
      let data =  {
        TestSuiteName: testSuiteAdded.testSuiteName,
        TestSuiteFlag: "Custom"
    }
      // dispatch(ExecuteTestCasesByTestSuite(data, controlLoading));
      // console.log("data",data)
      handleExecuteClick(data)
    }
  },[testSuiteAdded])
  const handleAddSuite = () => {
    navigate("/add-suite");
  };
 
  const handleTabChange = (event, newValue) => {
    setTabNo(newValue);
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
 
  // useEffect(() => {
  //   dispatch(getTestSuites());
  // }, []);
 
  useEffect(() => {
    dispatch(getTestSuites());
  }, [dispatch,openDelModal,executingSuite]);
 
  const filteredTestSuiteData = testSuits && testSuits?.filter((suite) =>
    suite?.TestSuiteName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
 
  const handlePaperClick = (suite) => {
    let data = suite.TestSuiteName;
    setSelectedSuite((prevSuite) => (prevSuite === suite ? null : suite));
    dispatch(getTestCaseRundetailsByTestName(data,setInProgress));
  };
  const handleEditClick = (suite) => {
    const suiteName = suite.TestSuiteName
    dispatch(Getsuitebyname(suiteName));
    // getsuitebyname api will give you detail
    navigate(`/edit/${suiteName}`);
  };
 
  // const controlLoading = (suiteName) => { // function to set loading false when promise resolve or reject
  // //  setOpenModal(false)
  // setexecutingSuite((prevExecutingSuite)=>({
  //   ...prevExecutingSuite,
  //   [suiteName]:false
  // }))
  // dis
  // };
 
  const handleExecuteClick = (suite) => {
    console.log("handleExecuteClick",suite)
    let data = suite.TestSuiteName;
    console.log("handleExecuteClick111",data)
    // setSelectedSuite((prevSuite) => (prevSuite === suite ? null : suite));
    // setOpenModal(true)
    // setexecutingSuite(data)
    // setexecutingSuite((prevExecutingSuite)=>({
    //   ...prevExecutingSuite,
    //   [data]:true
    // }))
    dispatch(setExecutingSuite(suite.TestSuiteName))
    dispatch(ExecuteTestCasesByTestSuite(data));
  };
 
  const handleDeleteClick = (suite) => {
    setopenDelModal(true);
    setsuitToDelete(suite.TestSuiteName);
  };
 
  return (
    <>
      <div className={classess.main}>
        {/* <LoadingWave
          open={openModal}
          onClose={() => setOpenModal(false)}
          suiteName={executingSuite}
        /> */}
        <DeleteSuite
          open={openDelModal}
          onClose={() => setopenDelModal(false)}
          suitToDelete={suitToDelete}
        />
        <Grid container spacing={2}>
          {/* Left side for Search and Results */}
          <Grid item xs={12} sm={4}>
            <Card style={{ paddingBottom: "30px", maxHeight: "78vh" }}>
              <Grid container alignItems="center">
                <Grid item xs={6} style={tabLableStyle}>
                  Test Suite
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "25px" }}
                >
                  <Tooltip title='add test' placement="top" arrow>
                  <Add
                  aria-label="Accessibility Icon"
                    style={{
                      fontSize: 25,
                      backgroundColor: "rgb(101, 77, 247)",
                      color: "#ffffff",
                      borderRadius: "50%",
                      // padding: "8px",
                      cursor: "pointer",
                    }}
                    onClick={handleAddSuite}
                  />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container style={{}}>
                <Grid item xs={12} style={{ padding: "10px 20px" }}>
                  <SearchField
                    placeholder="Search Test Suite..."
                    onChange={(value) => setSearchTerm(value)}
                  />
                </Grid>
              </Grid>
              <Grid
                // className={classess.remScrollbar}
                item
                style={{ overflow: "auto", maxHeight: "calc(70vh - 50px)", paddingBottom:'10px' }}
              >
                {filteredTestSuiteData ? filteredTestSuiteData.map((suite, index) => (
                  <Paper
                    key={suite.TestSuiteName}
                    className={`${classess.paper} ${
                      selectedSuite === suite ? classess.paperActive : ""
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
                          <Typography
                            className={`${classess.infoHeader} ${
                              selectedSuite === suite
                                ? classess.activeColor
                                : ""
                            }`}
                          >
                            {suite.TestSuiteName}
                          </Typography>
 
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {suite.TestSuiteFlag == "Custom" && (
                              <>
                                 {executingSuite && executingSuite === suite.TestSuiteName?<CircularProgress size={25} style={{
                                      marginRight: "8px",
                                      color:
                                        selectedSuite === suite
                                          ? "#fff"
                                          : "rgb(101, 77, 247)",
                                    }}/>
                                    :<PlayCircleIcon
                                    style={{
                                      marginRight: "8px",
                                      color: selectedSuite === suite ? "#fff" : "rgb(101, 77, 247)",
                                      cursor: executingSuite ? "not-allowed" : "pointer",
                                    }}
                                    onClick={executingSuite ? null : (e) => {
                                      e.stopPropagation();
                                      handleExecuteClick(suite);
                                    }}
                                  />}
                                <EditIcon
                                  style={{
                                    marginRight: "8px",
                                    color:
                                      selectedSuite === suite
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
                )):<Box textAlign='center'>No test suite</Box>}
              </Grid>
            </Card>
          </Grid>
 
          {/* Right side for Test Cases */}
          {selectedSuite !== null && (
            <Grid item xs={12} sm={8}>
              <Card>
                <Box style={tabLableStyle}>Test Run</Box>
                <Grid container>
                  <Grid item xs={12} style={{ paddingLeft: "20px" }}>
                    <TabContext value={tabNo}>
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
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
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
