import {
  Box,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledTypography } from "./styleTestCase";
import { useStyles } from "./styleTestCase";
import userActionsOptions from "../../UserActionList";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TableRow from "@mui/material/TableRow";
import VideocamIcon from "@mui/icons-material/Videocam";
import { StyledTableCell } from "./styleTestCase";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateTestStepsDetails } from "../../../../redux/actions/seleniumAction";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EditTestCase() {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {testId} = useParams()
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [steps, setSteps] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [testcaseDetail, setTestcaseDetail]=useState(null)

  useEffect(() => {
    const getSteps = async () => {
      const res = await axios.get(
        `${BASE_URL}/AddTestLab/GetTestStepsDetailsByTestStepsId?TestStepsId=${testId}`, // change this uri
      );
      setTestcaseDetail(res.data)
      //extracting the actionlist
      const actionList = res.data[0].ActionName.split(',')
      const actionObj = actionList.map((act,index)=>{
        return userActionsOptions.find((action)=> action.value === act)
      })
      setSteps(actionObj)
      console.log("steps list : ", res);
    };

    getSteps();
  }, []);

  const savetoEdit = ()=>{
    setIsEditable(false)
  }
  const handleSave = () => {
    console.log(testcaseDetail)
    let payload = {
      testStepsDetailsId: testcaseDetail[0].TestStepsDetailsId,
      testCaseDetailsId: testcaseDetail[0].TestCaseDetailsId,
      testStepsName: testcaseDetail[0].TestStepsName,
      actionName: steps.map((step)=>{
        return step?.value
      }).join(',')
    }
    dispatch(UpdateTestStepsDetails(payload,savetoEdit))
  };
  const handleCancle = () => {
    navigate(-1)
  };
  const handleAddMoreSteps = () => {
    setSteps([...steps, null]);
  };
  const handleRemoveStep = (curr) => {
    const updatedSteps = steps.filter((step) => step !== curr);
    setSteps(updatedSteps);
  };

  const handleActionChange = (act,index) => {
    console.log('act',act)
    const updatedSteps = steps.map((step,i) =>
      i === index ? act  : step
    );
    setSteps(updatedSteps);
  };
  const runsArray = [
    {
      runid: 123456789,
      startTime: "08:00 AM",
      endTime: "10:30 AM",
      status: "Completed",
    },
    {
      runid: 987654321,
      startTime: "11:45 AM",
      endTime: "01:15 PM",
      status: "Running",
    },
    {
      runid: 555555555,
      startTime: "02:20 PM",
      endTime: "03:45 PM",
      status: "Failed",
    },
    // Add more objects as needed
  ];
  const data = [
    {
      status: "Success",
      timestamp: "2022-03-01T10:30:00Z",
      detail: "Operation completed successfully.",
    },
    {
      status: "Error",
      timestamp: "2022-03-01T12:45:00Z",
      detail: "An error occurred during the operation.",
    },
    // Add more objects as needed
  ];
  const selectStyle = {
    container: (provided) => ({
      ...provided,
      width: "50%",
      backgroundColor: "rgb(242, 242, 242)",
      // zIndex: 1, // Adjust the zIndex value
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(242, 242, 242)",
      "&:hover": {
        borderColor: "#654DF7",
      },
      borderColor: Error.environment
        ? "red"
        : state.isFocused
        ? "#654DF7"
        : "rgb(242, 242, 242)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#654DF7" : "transparent",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        color: "#654DF7", // Change the color on hover if desired
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        color: "#654DF7", // Change the color on hover if desired
      },
    }),
  };
  const listOfSteps = steps?.map((step,index) => (
    <li
      key={index}
      style={{ listStyle: "none", margin: "10px 0" }}
    >
      <Box sx={{display:'flex',justifyContent:'space-between',width:'50%'}}>
      <StyledTypography>
        Step {index+1}
      </StyledTypography>
      {isEditable && <DeleteIcon  onClick={() => handleRemoveStep(step)} sx={{cursor:'pointer',color:'red'}}/>}
      </Box>
      <Paper elevation={1} sx={{ width:"50%", padding: "10px", '@media (max-width: 600px)': {
        width: '100%',  
      }, }}>
        <Box mb={1}>
          <Select
            isClearable={true}
            options={userActionsOptions}
            isDisabled={!isEditable}
            
            value={step}
            onChange={(act) => handleActionChange(act,index)}
            styles={selectStyle}
            menuPosition={"fixed"}
          />
        </Box>
        {step && (
          <Box
            className={classes.textContainer}
            sx={{ width: "70%" }}
          >
            <StyledTypography>
              {step.value}
            </StyledTypography>
          </Box>
        )}
      </Paper>
    </li>
  ))
  return (
    <div className={classes.main}>
      <Paper sx={{ width: "100%", p: 2 }}>
        <Grid
          container
          display="flex"
          justifyContent='center'
          alignItems="start"
          sx={{ padding: "10px 0" }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Grid item xs={12} md={3}>
              <StyledTypography sx={{ fontSize: "18px", fontWeight: "400" }}>
                Sample Testcase
              </StyledTypography>
            </Grid>
            <Grid item xs={12} md={2} display="flex" justifyContent="end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancle}
                sx={{
                  backgroundColor: "rgb(108, 117, 125)",
                  color: "#f1f1f1",
                  "&:hover": {
                    backgroundColor: "rgb(101, 77, 247)",
                  },
                  marginRight: "10px",
                }}
              >
                Cancel
              </Button>
              {isEditable ? (
                <Button
                  onClick={handleSave}
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
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditable(true)}
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
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              <ul>
              {listOfSteps}
                {isEditable && (
                  <Button
                    onClick={handleAddMoreSteps}
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
                  >
                    + Add More Steps
                  </Button>
                )}
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} mt={2} >
            <StyledTypography sx={{ fontSize: "18px", fontWeight: "400" }}>
              Execution history
            </StyledTypography>
          </Grid>
          <Grid item xs={12} md={7} >
            <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              <TableContainer sx={{ marginBottom: "8vh" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {/* <StyledTableCell>Project Name</StyledTableCell> */}
                      <StyledTableCell>Run Id </StyledTableCell>
                      <StyledTableCell>Start Time</StyledTableCell>
                      <StyledTableCell>End Time</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Video</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {runsArray?.map((row) => (
                      <TableRow
                        key={row.Email}
                        className={`${classes.tableRow} ${
                          selectedRunId === row.runid ? classes.activeRow : ""
                        }`}
                        style={{ height: "10px" }}
                        spacing="3"
                        onClick={() => setSelectedRunId(row.runid)}
                      >
                        <StyledTableCell
                          sx={{
                            color:
                              selectedRunId === row.runid ? "white" : "black",
                          }}
                        >
                          {row.runid}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            color:
                              selectedRunId === row.runid ? "white" : "black",
                          }}
                        >
                          {row.startTime}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            color:
                              selectedRunId === row.runid ? "white" : "black",
                          }}
                        >
                          {row.endTime}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            color:
                              selectedRunId === row.runid ? "white" : "black",
                          }}
                        >
                          <Box className={classes.statusBox} sx={{
                            display:'inline-block',
                            backgroundColor: selectedRunId === row.runid ? "":row.status === 'Completed'?'#48fab9':'#fa3737'
                          }}>{row.status}</Box>
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            color:
                              selectedRunId === row.runid ? "white" : "#654DF7",
                          }}
                        >
                          <VideocamIcon />
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}  justifySelf='start'>
            {selectedRunId && <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              <TableContainer sx={{ marginBottom: "8vh" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell colSpan={3}>
                        <StyledTypography variant="h6" color="primary">
                        {selectedRunId}
                        </StyledTypography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Status </StyledTableCell>
                      <StyledTableCell>Timestramp</StyledTableCell>
                      <StyledTableCell>Detail</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row) => (
                      <TableRow
                        key={row.Email}
                        className={`${classes.tableRow}`}
                        style={{ height: "10px" }}
                        spacing="3"
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.status === 'Success'?<CheckCircleIcon color="success"/>:<CancelIcon color="error"/>}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.timestamp}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.detail}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
