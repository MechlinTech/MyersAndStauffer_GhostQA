import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../styles";
import axios from "axios";
import { header } from "../../../../utils/authheader";
import { toast } from "react-toastify";
import { StyledTypography } from "./style";
import { useDispatch } from "react-redux";
import { getBaseUrl } from "../../../../utils/configService";
import {
  ResetLocationScenarioVUCount,
  GetLocationScenarioVUCount,
} from "../../../../redux/actions/performanceAction";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function LoadPanel({ PerformanceFileId, testCaseData }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [xaxisCategories, setxaxisCategories] = useState([]);
  const [graphState, setGraphState] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false, // Set to false to hide the toolbar
        },
        zoom: {
          enabled: false, // Disable zooming
        },
      },
      stroke: {
        curve: "stepline",
        width: 0,
      },

      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8],
        title: {
          text: "Duration (m)",
        },
        labels: {
          formatter: function (value) {
            return Math.round(value); //
          },
          style: {
            fontSize: "14px", // Set the font size for x-axis labels
            fontFamily: "Lexend Deca",
          },
        },
      },
      yaxis: {
        title: {
          text: "Users",
        },
        labels: {
          formatter: function (value) {
            return Math.round(value); //
          },
          style: {
            fontSize: "14px", // Set the font size for x-axis labels
            fontFamily: "Lexend Deca",
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#654DF7"],
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val.toFixed(2) + " ";
          },
        },
      },
      dataLabels: {
        enabled: false, // Disable data labels in tooltip
      },
    },
    series: [
      {
        name: "Users",
        data: graphData,
      },
    ],
  });
  const [totalusers, settotalusers] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rampUpTime, setRampUpTime] = useState(0);
  const [rampUpSteps, setRampUpSteps] = useState(0);
  const testNamefield = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [designTabsActive, setDesignTabsActive] = useState(false);

  const fetchData = async () => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const loadData = res.data;

      if (Array.isArray(loadData)) {
        settotalusers(loadData[0].TotalUsers);
        const durationInMinutes = loadData[0].DurationInMinutes / 60;
        setDuration(durationInMinutes);
        // setDuration(loadData[0].DurationInMinutes);

        // Convert RampUpTimeInSeconds from seconds to minutes
        const rampUpTimeInSeconds = loadData[0].RampUpTimeInSeconds / 60;
        setRampUpTime(rampUpTimeInSeconds);
        // setRampUpTime(loadData[0].RampUpTimeInSeconds);
        setRampUpSteps(loadData[0].RampUpSteps);
      }else{
        settotalusers(0);
        setDuration(0);
        setRampUpTime(0);
        setRampUpSteps(0);
      }
    } catch {}
  };
  useEffect(() => {
    fetchData();
  }, [PerformanceFileId]);
  useEffect(() => {
    if (duration === 0) {
      setxaxisCategories([0]);
      setGraphData([0]);
    } else {
      const userPerStep = rampUpSteps ? totalusers / rampUpSteps : totalusers;
      const stepsUntilRampUp = Math.floor(totalusers / userPerStep);
      let data = [];

      // Generate data for the slope until rampUpTime
      for (let i = 1; i <= stepsUntilRampUp; i++) {
        data.push(i * userPerStep);
      }

      // Add a straight line after rampUpTime
      for (let i = 0; i < stepsUntilRampUp; i++) {
        data.push(totalusers);
      }

      let xCatagory = [];
      const timePerStep = rampUpTime ? rampUpTime / rampUpSteps : 0;
      for (let i = 0; i < rampUpSteps; i++) {
        const value = (timePerStep * i).toFixed(1); // Round to 1 decimal place
        xCatagory.push(value.toString()); // Convert to string
      }

      // Convert rampUpTime and duration to strings with at most one decimal place
      const rampUpTimeString = rampUpTime.toString();
      const durationString = duration.toString();

      setxaxisCategories([...xCatagory, rampUpTimeString, durationString]);
      setGraphData(data);
    }
  }, [totalusers, rampUpSteps, duration, rampUpTime]);

  useEffect(() => {
    // Update the series data whenever graphData changes
    setGraphState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: xaxisCategories,
        },
      },
      series: [{ data: graphData }],
    }));
  }, [graphData]);

  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [expanded, setExpanded] = useState([]);

  // const handleInputData = (event, type) => {
  //   const value = event.target.value;
  //   if (value >= 0) {
  //     const maxDuration = 20;
  //     const maxRampUpSteps = 20;
  //     if (type === "totalUsers" && value > 10) {
  //       toast.error("The maximum total users allowed is 10.");
  //     } else if (type === "duration" && value > maxDuration) {
  //       toast.error(`The maximum duration allowed for the test is ${maxDuration} minutes.`);
  //     } else if (type === "rampUpTime" && (value > duration || value < 0)) {
  //       toast.error("Ramp up Time cannot exceed the duration.");
  //     } else if (type === "rampUpSteps" && value > maxRampUpSteps) {
  //       toast.error(`Ramp-up steps cannot exceed ${maxRampUpSteps}`);
  //     } else {
  //       switch (type) {
  //         case "totalUsers":
  //           settotalusers(value);
  //           break;
  //         case "duration":
  //           setDuration(value);
  //           if (rampUpTime > value) {
  //             setRampUpTime(value);
  //           }
  //           break;
  //         case "rampUpTime":
  //           setRampUpTime(value);
  //           break;
  //         case "rampUpSteps":
  //           setRampUpSteps(value);
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   }
  // };

  const handleInputData = (event, type) => {
    const value = event.target.value;
    const maxDuration = 20;
    const maxRampUpSteps = 20;

    if (value < 0) {
      toast.error("Please enter a positive value.");
      return;
    }

    switch (type) {
      case "totalUsers":
        if (value > 10) {
          toast.error("The maximum total users allowed is 10.");
        } else {
          settotalusers(value);
        }
        break;
      case "duration":
        if (value > maxDuration) {
          toast.error(
            `The maximum duration allowed for the test is ${maxDuration} minutes.`
          );
        } else {
          setDuration(value);
        }
        break;
      case "rampUpTime":
        setRampUpTime(value);
        break;
      case "rampUpSteps":
        if (value > maxRampUpSteps) {
          toast.error(`Ramp-up steps cannot exceed ${maxRampUpSteps}`);
        } else {
          setRampUpSteps(value);
        }
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitGraphData();
    }
  };
  const submitGraphData = async () => {
    if (rampUpTime > duration) {
      toast.error("Ramp-up time cannot exceed duration.");
      return; // Exit the function if condition is not met
    }
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/Performance/AddUpdateLoadData`,
        {
          performanceFileId: PerformanceFileId,
          totalUsers: totalusers,
          rampupSteps: rampUpSteps,
          durationInMinutes: duration * 60,
          rampupTime: rampUpTime * 60,
        },
        header()
      );
      console.log("res", res);
      dispatch(GetLocationScenarioVUCount(testCaseData));
      // if (res.data === "Success") {
      toast.info("Successfully saved", {
        style: {
          background: "rgb(101, 77, 247)",
          color: "rgb(255, 255, 255)",
        },
      });
      // }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };
  const toggleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
    handleActiveTabs();
  };
  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          border: "solid 2px #DADADA",
          borderRadius: "5px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <StyledTypography> Total Users* </StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Duration(m)</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Ramp up Time(m)</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Ramp up Steps</StyledTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={0}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <input
                  type="number"
                  min={0}
                  value={totalusers}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "totalUsers")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>
              <TableCell align="left">
                <input
                  type="number"
                  min={0}
                  value={duration}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "duration")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>

              <TableCell align="left">
                <input
                  type="number"
                  min={0}
                  value={rampUpTime}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "rampUpTime")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>
              <TableCell align="left">
                <input
                  type="number"
                  min={0}
                  value={rampUpSteps}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "rampUpSteps")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Chart
        options={graphState.options}
        series={graphState.series}
        type="area"
        height={300}
      />
    </>
  );
}
