import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useStyles } from "./styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Add } from "@mui/icons-material";
import TableTestCase from "./TableTestCase";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Typography } from "@mui/material";
import axios from "axios";
import { header } from "../../utils/authheader";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Design({ rootId }) {
  const classes = useStyles();
  const [locationCount, setlocationCount] = useState(0);
  const [scenarioCount, setscenarioCount] = useState(0);
  const [showAddNewElement, setShowAddNewElement] = useState(true);
  const [uvCount, setuvCount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPerformanceFileByRootId?RootId=${rootId}`,
        header()
      );
      // Assuming response.data is the array of data you want to set as listData
      const testList = response.data;
      if (Array.isArray(testList)) {
        setscenarioCount(testList.length);
        testList.map((test) => {
          getCounts(test.id);
        });
      } else {
        setlocationCount(0);
        setscenarioCount(0);
        setuvCount(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCounts = async (testId) => {
    try {
      const loadRes = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${testId}`,
        header()
      );
      const locationRes = await axios.get(
        `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${testId}`,
        header()
      );
      const locCount = Array.isArray(locationRes.data) ? locationRes.data.length : 0;
      const userCount = Array.isArray(loadRes.data)
        ? loadRes.data[0].TotalUsers
        : 0;
      setuvCount((pre) => pre + userCount);
      setlocationCount((pre) => pre + locCount);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
    console.log("in side design ", rootId);
  }, [rootId]);

  const handleRunNow = async()=>{
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/ExecutePerformanceJMX?RootId=${rootId}&name=Project-1`,
        header()
      );
      console.log('response',response)
    } catch (error) {
      toast.error('NETWORK ERROR')
    }
  }
  return (
    <Grid
      container
      alignItems="center"
      style={{
        margin: "20px 0px",
        border: "solid 2px #DADADA",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Grid
        container
        alignItems="center"
        style={{
          margin: "20px 0px",
        }}
      >
        <Grid item xs={8} style={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontFamily: "Lexend Deca",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Summary
          </Typography>

          <List
            sx={{ width: "100%" }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ListItem
              key={"LocationOnOutlinedIcon"}
              disableGutters
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "28%",
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ color: "#654df7" }}
                style={{ marginRight: "8px" }}
              />
              <ListItemText
                primary={
                  <span
                    style={{
                      fontFamily: "Lexend Deca",
                      fontSize: "14px",
                    }}
                  >
                    {locationCount} locations
                  </span>
                }
              />
            </ListItem>
            <ListItem
              key={"FeaturedPlayListOutlinedIcon"}
              disableGutters
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "28%",
              }}
            >
              <FeaturedPlayListOutlinedIcon
                sx={{ color: "#654df7" }}
                style={{ marginRight: "8px" }}
              />
              <ListItemText
                primary={
                  <span
                    style={{
                      fontFamily: "Lexend Deca",
                      fontSize: "14px",
                    }}
                  >
                    {scenarioCount} scenarios
                  </span>
                }
              />
            </ListItem>
            <ListItem
              key={"PersonOutlineOutlinedIcon"}
              disableGutters
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "25%",
              }}
            >
              <PersonOutlineOutlinedIcon
                sx={{ color: "#654df7" }}
                style={{ marginRight: "8px" }}
              />
              <ListItemText
                primary={
                  <span
                    style={{
                      fontFamily: "Lexend Deca",
                      fontSize: "14px",
                    }}
                  >
                    {uvCount} VU
                  </span>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            style={{
              fontSize: 14,
              backgroundColor: "rgb(101, 77, 247)",
              color: "#ffffff",
              cursor: "pointer",
              padding: "12px 18px",
            }}
            onClick={handleRunNow}
          >
            <PlayCircleOutlineIcon /> Run Now
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TableTestCase
            rootId={rootId}
            setShowAddNewElement={setShowAddNewElement}
            showAddNewElement={showAddNewElement}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      {showAddNewElement && (
        <Button
          variant="contained"
          onClick={() => setShowAddNewElement(!showAddNewElement)}
          style={{
            fontSize: 14,
            backgroundColor: "rgb(101, 77, 247)",
            color: "#ffffff",
            cursor: "pointer",
            padding: "12px 18px",
            marginTop: "10px",
            marginLeft: "auto",
          }}
        >
          {scenarioCount?'Add More Test':'Add Test'}
        </Button>
      )}
    </Grid>
  );
}
