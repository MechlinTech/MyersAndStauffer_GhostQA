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
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ExecutionHistory() {
  const classes = useStyles();
  const { testCaseName } = useParams();
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [videoLink, setvideoLink] = useState("")
  const [stepDetail, setstepDetail] = useState(null);
  const [executionDetail, setexecutionDetail] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rootId, setrootId] = useState(localStorage.getItem("rootId"));
  const [runDetail, setrunDetail] = useState(null);
  console.log("name", testCaseName);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/AddTestLab/GetTestDetailByTestName?TestName=${testCaseName}`
      );
      console.log("res", res);
      if (Array.isArray(res.data)) setexecutionDetail(res.data);
      else setexecutionDetail(null);
    } catch (error) {
      toast.error("NETWORK ERROR");
    }
  };

  const getStpeDetail = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/AddTestLab/GetTestStepsDetailByTestCaseId?TestCaseId=${selectedRunId}`
      );
      console.log("resid", res);
      if (Array.isArray(res.data)) setstepDetail(res.data);
      else setstepDetail(null);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getStpeDetail();
    console.log("TestCase ", stepDetail);
  }, [selectedRunId]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleVideoPlay = (vdUrl)=>{
    setvideoLink(vdUrl)
    setOpenModal(true)
  }
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
      TestSuite: "Project",
      TestCase:
        "2aeb0987826ffc3bb5b8bdb833e0c8fcb2e692740527877e0c81326819b41ae7",
      Status: "failed",
      StartDateTime: "3/21/2024 8:45:52 AM",
      EndDateTime: "3/21/2024 8:45:54 AM",
      TestDuration: "1284",
      TestVideoUrl: "http://65.1.188.67:8010/api/test-suitesV2/103/get_file/",
    },
  ];
  const test = {
    TestStepJson:
      '[{"Status":"failed","Duration":1284,"stepName":"Test Step: click: val"}]',
    TestScreenShotUrl: "",
  };
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
              <source src={videoLink} type="video/webm" />
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
      <Grid item xs={12} md={7}>
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
                {executionDetail?executionDetail.map((row) => (
                  <TableRow
                    key={row.TestCase}
                    className={`${classes.tableRow} ${
                      selectedRunId === row.TestCase ? classes.activeRow : ""
                    }`}
                    spacing="3"
                    onClick={() => setSelectedRunId(row.TestCase)}
                  >
                    <StyledTableCell
                      sx={{
                        color: selectedRunId === row.TestCase ? "white" : "black",
                      }}
                    >
                      {row.TestCase}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        color: selectedRunId === row.TestCase ? "white" : "black",
                      }}
                    >
                      {formatTime(row.StartDateTime)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        color: selectedRunId === row.TestCase ? "white" : "black",
                      }}
                    >
                      {formatTime(row.EndDateTime)}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        color: selectedRunId === row.TestCase ? "white" : "black",
                      }}
                    >
                      <Box
                        className={classes.statusBox}
                        sx={{
                          display: "inline-block",
                          backgroundColor:
                            selectedRunId === row.TestCase
                              ? ""
                              : row.status === "failed"
                              ? "#48fab9"
                              : "#fa3737",
                        }}
                      >
                        {row.Status}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        color:
                          selectedRunId === row.TestCase ? "white" : "#654DF7",
                      }}
                      onClick={() => {}}
                    >
                      <VideocamIcon onClick={() =>handleVideoPlay(row.TestVideoUrl)} />
                    </StyledTableCell>
                  </TableRow>
                )):<TableRow>
                  <StyledTableCell colSpan={5} align="center">No execution history</StyledTableCell>
                </TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

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
                    <StyledTableCell>Duration</StyledTableCell>
                    <StyledTableCell>Detail</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stepDetail &&
                    stepDetail.map((item) => {
                      const testSteps = JSON.parse(item.TestStepJson);
                       return testSteps.map((row, index) => (
                        <TableRow
                          key={index}
                          className={`${classes.tableRow}`}
                          style={{ height: "10px" }}
                          spacing="3"
                        >
                          <StyledTableCell>
                            {row.Status === "failed" ? (
                              <CancelIcon color="error" />
                              ) : (
                              <CheckCircleIcon color="success" />
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.Duration}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.stepName}
                          </StyledTableCell>
                        </TableRow>
                      ));
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Grid>
    </>
  );
}
