import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { StyledTypography, useStylesTestCase } from "./styles";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TableTestCase from "./TableTestCase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { header } from "../../utils/authheader";
import { getBaseUrl } from "../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function AddTestCase({ addTestCase, nameSuite }) {
  const classes = useStylesTestCase();
  const [testCase, setTestCase] = useState([]);
  const [fetchingTest, setfetchingTest] = useState(true);
  const navigate = useNavigate();
  localStorage.setItem("rootId", addTestCase);
  useEffect(() => {
    setTestCase([]);
    setfetchingTest(true);
    const fetchData = async () => {
      try {
        const BASE_URL = await getBaseUrl();
        const response = await axios.post(
          `${BASE_URL}/AddTestLab/GetTestCaseDetailsByRootId?RootId=${addTestCase}`,
          header()
        );

        // Assuming response.data is the array of data you want to set as listData
        console.log("response ", response.data);
        setTestCase(
          response.data.status === "fail" || response.data == ""
            ? []
            : response.data
        );
        console.log(response);
        setfetchingTest(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setfetchingTest(false);
        setTestCase([]);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [addTestCase]);

  console.log("test case", testCase);
  console.log("root id", addTestCase);
  return (
    <>
      <Grid
        container
        className={classes.header}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6} className={`${classes.header}`}>
          <div className={classes.highlight}>
            {nameSuite.length > 40 ? nameSuite.slice(0, 40) + "..." : nameSuite}
          </div>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            //onClick={handleAddEnvironment}
            sx={{
              backgroundColor: "rgb(101, 77, 247)",
              "&:hover": {
                backgroundColor: "rgb(101, 77, 247) !important",
                borderColor: "#654DF7",
                color: "#fff",
                "&:before": {
                  backgroundColor: "rgb(101, 77, 247) !important",
                  color: "#fff",
                },
              },
              color: "#fff",
            }}
            onClick={() => navigate(`/testLab/createTestcase/${addTestCase}`)}
          >
            Add New Testcase
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", margin: "20px" }}>
            <Grid item>
              {fetchingTest ? (
                <StyledTypography p={5}>
                  <CircularProgress
                    style={{ color: "rgb(101, 77, 247)" }}
                    size={25}
                  />
                </StyledTypography>
              ) : testCase.length !== 0 ? (
                <TableTestCase testCase={testCase} rootId={addTestCase} />
              ) : (
                <StyledTypography p={5}>No test cases found</StyledTypography>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
