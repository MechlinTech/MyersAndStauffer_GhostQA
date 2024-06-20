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
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Graph from "./component/InbuiltSuite/Components/Graph";
import { Tooltip } from "@mui/material";
import DeleteSuite from "./component/InbuiltSuite/Modal/DeleteSuite";

import Button from "@mui/material/Button";
import TabsPanel from "./component/CustomSuite/TabsPanel";
import AddNewProject from "./component/CustomSuite/AddNewProject";
import DynamicTreeView from "./component/CustomSuite/DynamicTreeView";
import axios from "axios";
import { header } from "../../utils/authheader";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../utils/configService";
import {
  AddWorkspace,
  fetchWorkSpaces,
  setRootId,
} from "../../redux/actions/localsuiteAction";

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
  const [addNewProject, setAddNewProject] = useState(false);
  const [depth, setdepth] = useState(0);
  const [formData, setFormData] = useState({ name: "" });
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (testSuiteAdded?.actionType === "SaveAndExecute") {
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
  }, [executingSuite]);

  useEffect(() => {
    dispatch(fetchWorkSpaces());
  }, [dispatch]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Whitespace is not allowed.");
      return;
    }
      try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/Selenium/AddUpdateFunctionalSuiteRelation`,
        {
          "id": 0,
          "name": formData.name,
          "parent": formData.parentId,
          "isCustomSuite": true
        },
        header()
      );
      if (response.data.status === "fail") {
        toast.error(response.data.message);
      } else {
        dispatch(AddWorkspace(response.data.Data[0]));
        setFormData({ name: "" });
        setAddNewProject(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ name: value, id: Math.random(), parentId: 0 });
  };

  const handleTestCaseList = (id, node) => {
    setdepth(node);
    setAddNewProject(false);
    dispatch(setRootId(id));
  };
  // const handleTestCaseList = (id, node) => {
  //   setdepth(node);
  //   setAddNewProject(false);
  //   if (node > 1) {
  //   //   setAddTestCase(id);
  //   dispatch(setRootId(id))
  //   } else {
  //   dispatch(setRootId(0))
  //   }
  //   dispatch(setRootId(id))

  // };

  const handleCancel = () => {
    setAddNewProject(false);
    setFormData({ name: "" });
  };

  const treeStyle = drawerOpen ? {} : { display: "none" };

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
                      <TabList
                        onChange={handleTabChange}
                        aria-label="Tabs"
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
                                    className={classes.infoGridName}
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {suite.TestSuiteName}
                                  </Typography>
                                </Tooltip>
                              </div>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))
                    ) : (
                      <Grid container justifyContent="center">
                        <Typography>No Suites found.</Typography>
                      </Grid>
                    )}
                  </>
                )}
                {selectedTab === "custom" && (
                  <Grid item xs={12} md={12} xl={12} >
                    <Grid
                      className={classes.card}
                      style={{ paddingBottom: "20px", paddingLeft: "20px", paddingRight: "20px"}}
                    >
                      <Grid
                        container
                        alignItems="center"
                        className={classes.bodyHeader}
                        style={{ position: "relative" }}
                      >
                        <Grid item xs={6}>
                          Workspaces
                        </Grid>
                        <Grid item xs={5} style={{ textAlign: "right" }}>
                          {addNewProject ? (
                            <Button
                              variant="contained"
                              onClick={handleCancel}
                              style={{
                                fontSize: 14,
                                backgroundColor: "rgb(101, 77, 247)",
                                color: "#ffffff",
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => setAddNewProject(true)}
                              style={{
                                fontSize: 14,
                                backgroundColor: "rgb(101, 77, 247)",
                                color: "#ffffff",
                                cursor: "pointer",
                              }}
                            >
                              <Add />
                            </Button>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          {addNewProject && (
                            <AddNewProject
                              handleChange={handleChange}
                              handleSubmit={handleSubmit}
                              formData={formData}
                            />
                          )}
                        </Grid>
                      </Grid>
                      <Grid>
                        <DynamicTreeView TestCaseHandle={handleTestCaseList} />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            {inprogress ? (
              <Grid container justifyContent="center">
                <CircularProgress />
              </Grid>
            ) : (
              <>
                {selectedTab === "inbuilt" && (
                  <TabContext value={suiteTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleSuiteTabChange}
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
                          style={tabLableStyle}
                        />
                        <Tab label="History" value="2" style={tabLableStyle} />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Graph />
                    </TabPanel>
                    <TabPanel value="2">
                      <BasicAccordion />
                    </TabPanel>
                  </TabContext>
                )}
                {selectedTab === "custom" && (
                  <>{depth === 3 ? <TabsPanel /> : <Box />}</>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
