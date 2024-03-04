import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useStylesTestCase } from "./styles";
import Button from '@mui/material/Button';
import TableTestCase from "./TableTestCase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function AddTestCase({addTestCase}) {
  const classes = useStylesTestCase();
  const [testCase,setTestCase]=useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}AddTestLab/GetTestCaseDetailsByRootId?RootId=${addTestCase}`,
          header()
        );
        // Assuming response.data is the array of data you want to set as listData
        setTestCase((response.data == '' ? [] : response.data));
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTestCase([]);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);


  return (
    <>
  <Grid
          container
          className={classes.header}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}  className={`${classes.header}`}>
          <div className={classes.highlight}>Folder (Testcase)</div>
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
              onClick={()=>navigate('/testLab/createTestcase')}
            >
              Add New TestCase
            </Button>
          </Grid>
        </Grid>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Card style={{ textAlign: "center", margin: "20px" }}>
             
              <Grid item>
               <TableTestCase testCase={testCase}/>
              </Grid>
            </Card>
          </Grid>
        </Grid>
    </>
  );
}