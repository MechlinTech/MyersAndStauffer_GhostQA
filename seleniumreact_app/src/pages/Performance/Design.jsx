import React, { useState, useEffect } from "react";
import { Grid, Card, CircularProgress } from "@material-ui/core";
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
import { useSelector, useDispatch } from "react-redux";
import {
  GetLocationScenarioVUCount,
} from "../../redux/actions/performanceAction";
import {
  setIsRunning,
  addExecuterData,
  setExecuteJMXData,
  setRunningRootId,
} from "../../redux/actions/ResultAction";
import { getBaseUrl } from "../../utils/configService";
import { useNavigate } from "react-router-dom";
const DJANGO_URL = process.env.CODE_ENGINE_BASE_URL
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Design({ rootId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isRunning, runningRootId } = useSelector((state) => state.result);
  const { virtualUser, totalLocation } = useSelector((state) => state.performance);
  const navigate = useNavigate();

  // const [locationCount, setlocationCount] = useState(totalLocation);
  const [scenarioCount, setscenarioCount] = useState(0);
  const [showAddNewElement, setShowAddNewElement] = useState(true);
  const [folderName, setfolderName] = useState("");
  // const [uvCount, setuvCount] = useState(virtualUser);
  const [callingApi, setCallingApi] = useState(0);
  const [isScnerioCountRunning, setisScnerioCountRunning] = useState(false);

  useEffect(() => {
    fetchData();
  }, [rootId, showAddNewElement]);

  const fetchData = async () => {
    setisScnerioCountRunning(true);
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPerformanceFileByRootId?RootId=${rootId}`,
        header()
      );
      const res = await axios.get(
        `${BASE_URL}/Performance/GetProjectData`,
        header()
      );
      res.data?.map((project) => {
        if (project.id === rootId) setfolderName(project.name);
      });
      // Assuming response.data is the array of data you want to set as listData
      const testList = response.data;
      if (Array.isArray(testList)) {
        setscenarioCount(testList.length);
        dispatch(GetLocationScenarioVUCount(testList));

        // testList.map((test) => {
        //   dispatch(GetLocationScenarioVUCount(test.id));
        //   // getCounts(test.id);
        // });
      } else {
        // setlocationCount(0);
        setscenarioCount(0);
        // setuvCount(0);
      }
      setisScnerioCountRunning(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setisScnerioCountRunning(false);
    }
  };

  

  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // const handleRunNow = async () => {
  //   dispatch(setIsRunning(true));
  //   dispatch(setRunningRootId(rootId));
  //   const testername = getName();
  //   try {
  //     const BASE_URL = await getBaseUrl();
  //     const response = await axios.post(
  //       `${BASE_URL}/Performance/ExecutePerformanceJMX`,
  //       { rootId: rootId, testerName: testername, name: folderName },
  //       header()
  //     );
  //     console.log("response676", response.data);
  //     const clientId = response.data.client_Id;
  //     dispatch(setExecuteJMXData(response.data));
  //     // Navigate to the desired page after API response
  //     navigate("/result/summary");
  //     getRunDetail(response.data, clientId, 2000);
  //   } catch (error) {
  //     toast.error("NETWORK ERROR");
  //     dispatch(setIsRunning(false));
  //     dispatch(setRunningRootId(null));
  //   }
  // };

  const handleRunNow = async () => {
    dispatch(setIsRunning(true));
    dispatch(setRunningRootId(rootId));
    const testername = getName();
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/Performance/ExecutePerformanceJMX`,
        { rootId: rootId, testerName: testername, name: folderName },
        header()
      );
      console.log("response676", response.data);
      const clientId = response.data.client_Id;
      if (response.data.totalUser !== 0 && response.data.totalDuration !== 0 && response.data.totalRampUpSteps && response.data.totalRampUpTime) {
        dispatch(setExecuteJMXData(response.data));
        // Navigate to the desired page after API response
        navigate(`/result/${rootId}/summary`);
        getRunDetail(response.data, clientId, 2000);
      } else {
        toast.warn("Total Users, Duration, Ramp-up Time, or Ramp-up Steps cannot be zero. Unable to proceed.");
        dispatch(setIsRunning(false));
      }
    } catch (error) {
      toast.error("NETWORK ERROR");
      dispatch(setIsRunning(false));
      dispatch(setRunningRootId(null));
    }
  };
  

  console.log("scenarioCount", scenarioCount);
  const getRunDetail = async (data, clientId, delay) => {
    try {
      const res = await axios.get(
        `/codeengine/api/performance-container-runs/?client_reference_id=${clientId}`,
        header()
      );
      const result = res.data.results;
      const isJsonHasNull = result.some(
        (item) => item.container_status !== "exited"
      );
      dispatch(addExecuterData(res.data));
      if (isJsonHasNull) {
        setTimeout(() => {
          getRunDetail(data, clientId, delay);
        }, delay);
      } else {
        data = { ...data, responseData: res.data };
        console.log("data", data);
        const BASE_URL = await getBaseUrl();
        dispatch(setIsRunning(false));
        const response = await axios.post(
          `${BASE_URL}/Performance/AddExecuterData`,
          data,
          header()
        );
        console.log("res", response);
        dispatch(addExecuterData(response.data));
        // toast.Tost("network error in container runs");
      }
    } catch (error) {
      dispatch(setIsRunning(false));
      dispatch(setRunningRootId(null));
    }
  };

  // const handleRunNow = async () => {
  //   setisRuning(true);
  //   const testername = getName();
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}/Performance/ExecutePerformanceJMX`,
  //       { rootId: rootId, testerName: testername, name: folderName },
  //       header()
  //     );
  //     console.log("response", response);
  //     const clientId = response.data.client_Id;
  //     getRunDetail(response.data, clientId, 2000);
  //   } catch (error) {
  //     toast.error("NETWORK ERROR");
  //     setisRuning(false);
  //   }
  // };

  // const getRunDetail = async (data, clientId, delay) => {
  //   try {
  //     const res = await axios.get(
  //       `/api/performance-container-runs/?client_reference_id=${clientId}`,
  //       header()
  //     );
  //     const result = res.data.results;
  //     const isJsonHasNull = result.some(
  //       (item) => item.container_status != "exited"
  //     );
  //     if (isJsonHasNull) {
  //       setTimeout(() => {
  //         getRunDetail(data, clientId, delay);
  //       }, delay);
  //     } else {
  //       data = { ...data, responseData: res.data };
  //       console.log("data", data);
  //       setisRuning(false);
  //       const response = await axios.post(
  //         `${BASE_URL}/Performance/AddExecuterData`,
  //         data,
  //         header()
  //       );
  //       console.log("res", response);
  //     }
  //   } catch (error) {
  //     toast.error("network error in container runs");
  //     setisRuning(false);
  //   }
  // };
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
      {scenarioCount > 0 && (
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
                marginLeft:'10px'
              }}
            >
              Scenarios
            </Typography>

            <List
              sx={{ width: "100%" }}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {/*<ListItem
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
                    {totalLocation} locations
                  </span>
                }
              />
            </ListItem> */}
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
                      {scenarioCount} Scenarios
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
                      {virtualUser} VU
                    </span>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            {/* <Button
            variant="contained"
            style={{
              fontSize: 14,
              backgroundColor: isRunning ? "rgba(101, 77, 247, 0.5)" : "rgb(101, 77, 247)",
              color: "#ffffff",
              cursor: isRunning ? "not-allowed" : "pointer",
              padding: "12px 18px",
              textTransform: "none"
            }}
            disabled={isRunning}
            onClick={handleRunNow}
          >
            {isRunning ? (
              <CircularProgress style={{ color: "white" }} size={25} />
            ) : (
              <>
                <PlayCircleOutlineIcon /> Run Now
              </>
            )}
          </Button> */}

            <Button
              variant="contained"
              style={{
                fontSize: 14,
                backgroundColor: isRunning
                  ? "rgba(101, 77, 247, 0.5)"
                  : "rgb(101, 77, 247)",
                color: "#ffffff",
                cursor: isRunning ? "not-allowed" : "pointer",
                padding: "12px 18px",
                textTransform: "none",
              }}
              // disabled={isRunning || rootId !== runningRootId}
              onClick={handleRunNow}
            >
              {isRunning && rootId === runningRootId ? (
                <CircularProgress style={{ color: "white" }} size={25} />
              ) : (
                <>
                  <PlayCircleOutlineIcon /> Run Now
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TableTestCase
            rootId={rootId}
            setShowAddNewElement={setShowAddNewElement}
            showAddNewElement={showAddNewElement}
            apiCalling={fetchData}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      {/* {showAddNewElement && (
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
            textTransform: "none",
          }}
        >
          {scenarioCount ? "Add More Test" : "Add Test"}
        </Button>
      )} */}
      <Grid
        container
        style={{
          justifyContent:
            scenarioCount === 0 || isScnerioCountRunning
              ? "center"
              : "flex-end",
        }}
      >
        {showAddNewElement && (
          <Button
            variant="contained"
            onClick={() => setShowAddNewElement(!showAddNewElement)}
            style={{
              fontSize: 14,
              backgroundColor: isRunning
                ? "rgba(101, 77, 247, 0.5)"
                : "rgb(101, 77, 247)",
              color: "#ffffff",
              cursor: isRunning ? "not-allowed" : "pointer",
              padding: "12px 18px",
              marginTop: "10px",
              textTransform: "none",
            }}
            disabled={isRunning}
          >
            {scenarioCount ? "Add More Test" : "Add Test"}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
