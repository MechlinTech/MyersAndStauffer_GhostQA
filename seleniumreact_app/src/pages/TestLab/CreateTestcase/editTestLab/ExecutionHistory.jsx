import React, { useEffect, useState } from "react";
import { StyledTypography, StyledTableCell, useStyles } from "./styleTestCase";
import {
  Box,
  Grid,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VideocamIcon from "@mui/icons-material/Videocam";
import axios from "axios";
import { headerForm } from "../../../../utils/authheader";
import { toast } from "react-toastify";
import { TimerOff } from "@material-ui/icons";
import { CircularProgress } from "@mui/material";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ExecutionHistory() {
  const classes = useStyles();
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rootId, setrootId] = useState(localStorage.getItem("rootId"));
  const [runDetail, setrunDetail] = useState(null);
  // useEffect(() => {
  //   let isMounted = true;

  //   const getExecutionHistory = async () => {
  //     try {
  //       const jsonData = await axios.get(
  //         `${BASE_URL}/AddTestLab/GetExcutedByRootId?RootId=${rootId}`
  //       );
  //       const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
  //         type: "application/json",
  //       });
  //       const formData = new FormData();
  //       formData.append("scenarios_file", blob, "data.json");
  //       formData.append("name", "testing");
  //       const executedDetail = await axios.post(
  //         "http://65.1.188.67:8010/api/test-suitesV2/execute2/",
  //         formData,
  //         headerForm()
  //       );

  //       const runId = executedDetail.data.container_runs[0].id;
  //       getRunDetail(runId, 1000, 20);
  //     } catch (error) {
  //       console.log("error fetching execution data", error);
  //     }
  //   };

  //   const getRunDetail = async (runId, delay, timeout) => {
  //     try {
  //       const res = await axios.get(
  //         `http://65.1.188.67:8010/api/test-suitesV2/${runId}/monitor_container_run/`
  //       );

  //       if (res.data.json) {
  //         console.log("rundetails : ", res.data);
  //         setrunDetail(res.data.json);
  //       } else if (timeout > 0 && isMounted) {
  //         console.log(timeout);
  //         setTimeout(() => {
  //           getRunDetail(runId, delay, timeout - 1);
  //         }, delay);
  //       } else {
  //         console.log("timeout");
  //       }
  //     } catch (error) {
  //       console.error("Error getting run details:", error);
  //       toast.error("Network error");
  //     }
  //   };

  //   getExecutionHistory();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  function formatTime(dateTimeString) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString(
      undefined,
      options
    );
    return formattedTime;
  }
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
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              maxWidth: "60vw",
              position: "relative",
            }}
          >
            <video
              autoPlay
              muted
              controls
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source src="funtion to get video url" type="video/webm" />
            </video>
            <Box
              onClick={handleCloseModal}
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
                height: "20px",
                color: "rgb(25, 118, 210)",
              }}
            >
              x
            </Box>
          </Box>
        </div>
      </Modal>
      <Grid item xs={12} mt={2}>
        <StyledTypography sx={{ fontSize: "18px", fontWeight: "400" }}>
          Execution history
        </StyledTypography>
      </Grid>

      {runDetail ? (<Grid item xs={12} md={7}> 
          <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
            <TableContainer sx={{ marginBottom: "8vh" }}>
              <Table>
                <TableHead>
                  <TableRow>
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
                        <Box
                          className={classes.statusBox}
                          sx={{
                            display: "inline-block",
                            backgroundColor:
                              selectedRunId === row.runid
                                ? ""
                                : row.status === "Completed"
                                ? "#48fab9"
                                : "#fa3737",
                          }}
                        >
                          {row.status}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          color:
                            selectedRunId === row.runid ? "white" : "#654DF7",
                        }}
                        onClick={() => {}}
                      >
                        <VideocamIcon onClick={()=>setOpenModal(true)} />
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          </Grid>) : (
          <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress style={{ color: "#654DF7" }} />
          </Grid>
        )}
      
      <Grid item xs={12} md={5} justifySelf="start">
        {selectedRunId && (
          <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
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
                        {row.status === "Success" ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
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
          </Box>
        )}
      </Grid>
    </>
  );
}
