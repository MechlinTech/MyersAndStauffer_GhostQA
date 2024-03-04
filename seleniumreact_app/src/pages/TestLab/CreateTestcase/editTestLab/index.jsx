import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { StyledTypography } from "./styleTestCase";
import { useStyles } from "./styleTestCase";
import userActionsOptions from "../../UserActionList";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VideocamIcon from "@mui/icons-material/Videocam";
import { StyledTableCell } from "./styleTestCase";

export default function EditTestCase() {
  const [selectedAct, setselectedAct] = useState(null);
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [steps, setSteps] = useState([{ id: 1, action: null }]);
  const [isEditable, setIsEditable] = useState(false);
  const classes = useStyles();
  const handleSave = () => {
    console.log("clicked on save btn");
  };
  const handleCancle = () => {
    console.log("clicked on cancle btn");
  };
  const handleAddMoreSteps = () => {
    const newStepId = steps.length + 1;
    setSteps([...steps, { id: newStepId, action: null }]);
  };
  const handleActionChange = (act, stepId) => {
    const updatedSteps = steps.map((step) =>
      step.id === stepId ? { ...step, action: act } : step
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
  // Add more objects as needed

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
              {steps.map((step) => (
                  <li
                    key={step.id}
                    style={{ listStyle: "none", margin: "10px 0" }}
                  >
                    <StyledTypography>
                      Step {step.id}
                    </StyledTypography>
                    <Paper elevation={1} sx={{ width: "50%", padding: "10px" }}>
                      <Box mb={1}>
                        <Select
                          isClearable={true}
                          options={userActionsOptions}
                          isDisabled={!isEditable?true:false}
                          value={step.action}
                          onChange={(act) => handleActionChange(act, step.id)}
                          styles={selectStyle}
                          menuPosition={"fixed"}
                        />
                      </Box>
                      {step.action && (
                        <Box
                          className={classes.textContainer}
                          sx={{ width: "70%" }}
                        >
                          <StyledTypography>
                            {step.action?.value}
                          </StyledTypography>
                        </Box>
                      )}
                    </Paper>
                  </li>
                ))}
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
                      <StyledTableCell>Satus</StyledTableCell>
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
                          {row.status}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{
                            color:
                              selectedRunId === row.runid ? "white" : "black",
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
                          {row.status}
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
