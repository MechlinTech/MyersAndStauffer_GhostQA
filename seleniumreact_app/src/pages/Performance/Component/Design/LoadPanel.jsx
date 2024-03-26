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
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function LoadPanel({ PerformanceFileId }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [xaxisCategories, setxaxisCategories] = useState([]);
  const [graphState, setGraphState] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false // Set to false to hide the toolbar
        },
        zoom: {
          enabled: false // Disable zooming
        }
      },
      stroke: {
        curve: "stepline",
        width: 0,
      },

      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8],
        title: {
          text: "Duration (min)",
        },
      },
      yaxis: {
        title: {
          text: "Users",
        },
      },
      fill: {
        type: "solid",
        colors: ["#654DF7"], // Change the color to your desired color code
        opacity: 1, // Adjust opacity as needed
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val + " ";
          },
        },
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
      const res = await axios.get(
        `${BASE_URL}/Performance/GetLoadByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const loadData = res.data;
      if (Array.isArray(loadData)) {
        settotalusers(loadData[0].TotalUsers);
        setDuration(loadData[0].DurationInMinutes);
        setRampUpTime(loadData[0].RampUpTimeInSeconds);
        setRampUpSteps(loadData[0].RampUpSteps);
      }
    } catch {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if(duration === 0){
      setxaxisCategories([0])
      setGraphData([0])
    }else{
      const userPerStep = rampUpSteps?(totalusers / rampUpSteps):totalusers;
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
      const timePerStep = rampUpTime?(rampUpTime/rampUpSteps):0
      for (let i = 0; i < rampUpSteps; i++) {
        const value = (timePerStep*i).toFixed(1); // Round to 1 decimal place
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
  const [testCaseData, setTestCaseData] = useState([
    {
      id: 1,
      name: "Test name ",
      file: "",
      fileName: "Myscript1.jmx",
    },
    {
      id: 2,
      name: "Test name ",
      file: "",
      fileName: "Myscript1.jmx",
    },
  ]);
  const [expanded, setExpanded] = useState([]);
  const handleInputData = (event, type) => {
    switch (type) {
      case "totalUsers":
        settotalusers(event.target.value);
        break;
      case "duration":
        setDuration(event.target.value);
        break;
      case "rampUpTime":
        setRampUpTime(event.target.value);
        break;
      case "rampUpSteps":
        setRampUpSteps(event.target.value);
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
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/AddUpdateLoadData`,
        {
          performanceFileId: PerformanceFileId,
          totalUsers: totalusers,
          rampupSteps: rampUpSteps,
          durationInMinutes: duration,
          rampupTime: rampUpTime,
        },
        header()
      );
      console.log("res", res);
      if (res.data === "Success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
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
                <StyledTypography>Duration(m)*</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Ramp up Time (s)</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Ramp up steps</StyledTypography>
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
                  value={totalusers}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "totalUsers")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>
              <TableCell align="left">
                <input
                  type="number"
                  value={duration}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "duration")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>

              <TableCell align="left">
                <input
                  type="number"
                  value={rampUpTime}
                  className={classes.inputField}
                  onChange={(event) => handleInputData(event, "rampUpTime")}
                  onKeyDown={handleKeyPress}
                />
              </TableCell>
              <TableCell align="left">
                <input
                  type="number"
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
