import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import SearchField from "../../comman/SearchField";
import BasicAccordion from "../../comman/Accordion";
import {
  getTestCaseRundetailsByTestName,
  getTestSuites,
  ExecuteTestCasesByTestSuite,
  GetApplication
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
import AddSuite from "./Modal/AddSuite";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const classess = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { testSuits } = useSelector((state) => state.selenium);
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabNo, setTabNo] = useState("2");
  const [openModal, setOpenModal] = useState(false);

  const handleAddSuite = () => {
    //  setOpenModal(true);
    navigate("/add-suite");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

  useEffect(() => {
    dispatch(getTestSuites());
  }, []);

  const filteredTestSuiteData = testSuits?.filter((suite) =>
    suite?.TestSuiteName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handlePaperClick = (suite) => {
    let data = suite.TestSuiteName;
    setSelectedSuite((prevSuite) => (prevSuite === suite ? null : suite));
    dispatch(getTestCaseRundetailsByTestName(data));
  };

  const handleChange = (event, newValue) => {
    // Redirect based on the selected tab
    if (newValue === "1") {
      navigate("/");
    } else if (newValue === "2") {
      navigate("/settings");
    }
  };
  const handleEditClick = (suite) => {
    console.log("Edit clicked for suite:", suite);
    navigate('/edit-suite')
    // getsuitebyname api will give you detail
  };

  const handleExecuteClick = (suite) => {
    let data = suite.TestSuiteName;
    setSelectedSuite((prevSuite) => (prevSuite === suite ? null : suite));
    dispatch(ExecuteTestCasesByTestSuite(data));
  };

  const handleDeleteClick = (suite) => {
    console.log("Delete clicked for suite:", suite);
  };

  return (
    <>
      {/* <Typography variant="h4" gutterBottom>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: tabNo === "1" ? "#654DF7" : "inherit",
              ...tabHeaderStyle,
            }}
            onClick={(event) => handleTabChange(event, "1")}
          >
            Home
          </Link>

          <Link
            to="/settings"
            style={{
              marginLeft: "20px",
              textDecoration: "none",
              color: tabNo === "2" ? "#654DF7" : "inherit",
              ...tabHeaderStyle,
            }}
            onClick={(event) => handleTabChange(event, "2")}
          >
            Settings
          </Link>
        </Box>
      </Typography> */}
      <div className={classess.main}>
        <AddSuite
          open={openModal}
          onClose={() => setOpenModal(false)}
          hookProps={{}}
        />

        <Grid container spacing={2}>
          {/* Left side for Search and Results */}
          <Grid item xs={12} sm={4}>
            <Card style={{ paddingBottom: "30px", minHeight: "84vh" }}>
              <Grid container alignItems="center">
                <Grid item xs={6} style={tabLableStyle}>
                  Test Suite
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "25px" }}
                >
                  <Add
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
                item
                style={{ overflow: "auto", maxHeight: "calc(70vh - 50px)" }}
              >
                {filteredTestSuiteData.map((suite, index) => (
                  <Paper
                    key={index}
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
                          <Typography className={classess.infoHeader}>
                            {suite.TestSuiteName}
                          </Typography>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <PlayCircleIcon
                              style={{
                                marginRight: "8px",
                                color: "rgb(101, 77, 247)",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExecuteClick(suite);
                              }}
                            />
                            <EditIcon
                              style={{
                                marginRight: "8px",
                                color: "rgb(101, 77, 247)",
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
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
            </Card>
          </Grid>

          {/* Right side for Test Cases */}
          {selectedSuite !== null && (
            <Grid item xs={12} sm={8}>
              <Card style={{ paddingBottom: "30px", minHeight: "84vh" }}>
                <Box style={tabLableStyle}>Test Run</Box>
                <Grid container>
                  <Grid item xs={12} style={{ padding: "20px" }}>
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
                      <TabPanel value="1">Dashboard</TabPanel>
                      <TabPanel value="2">
                        <Box sx={{ padding: "0 !important" }}>
                          <BasicAccordion />
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