import React, { useEffect, useState } from "react";
import { StyledTypography, StyledTableCell, useStyles } from "./styleTestCase";
import {
  Box,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
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
import CustomeTableChell from "./CustomeTableChell";
import { getBaseUrl } from "../../../../utils/configService";
import CustomStatusCell from "./CustomStatusCell";
import { TimesOneMobiledata } from "@mui/icons-material";
import Rundetail from "./rundetails";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function ExecutionHistory({ executionDetail }) {
  const classes = useStyles();
  const { testCaseName } = useParams();
  const [selectedRunId, setSelectedRunId] = useState(null);
  const [videoLink, setvideoLink] = useState("");
  const [runIdDetails, setrunIdDetails] = useState();
  const [openModal, setOpenModal] = useState(false);

  // const getStpeDetail = async () => {
  //   try {
  //     const BASE_URL = await getBaseUrl();
  //     const res = await axios.get(
  //       `${BASE_URL}/AddTestLab/GetTestStepsDetailByTestCaseId?TestCaseId=${selectedRunId}`
  //     );
  //     if (Array.isArray(res.data)) setrunIdDetails(res.data);
  //     else setrunIdDetails(null);
  //   } catch (error) {
  //     toast.error("NETWORK ERROR");
  //   }
  // };
  const getStpeDetail = async () => {
    try {
        if (selectedRunId === null || selectedRunId === undefined) {
            return;
        }
        const BASE_URL = await getBaseUrl();
        const res = await axios.get(
            `${BASE_URL}/AddTestLab/GetTestStepsDetailByTestCaseId?TestCaseId=${selectedRunId}`
        );
        if (Array.isArray(res.data)) {
            setrunIdDetails(res.data);
        } else {
            setrunIdDetails(null);
        }
    } catch (error) {
        toast.error("NETWORK ERROR");
    }
};

  useEffect(() => {
    if(selectedRunId)
    getStpeDetail();
  }, [selectedRunId]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleVideoPlay = (vdUrl) => {
    setvideoLink(vdUrl);
    setOpenModal(true);
  };

  // function formatTime(dateTimeString) {
  //   const options = {
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //     hour12: true,
  //   };
  //   const formattedTime = new Date(dateTimeString).toLocaleTimeString(
  //     undefined,
  //     options
  //   );
  //   return formattedTime;
  // }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };
  // const formattedStartDate = formatDate(dateTimeString);
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
                {executionDetail ? (
                  executionDetail.map((row) => (
                    <TableRow
                      key={row.TestCase}
                      className={`${classes.tableRow} ${
                        selectedRunId === row.TestCase ? classes.activeRow : ""
                      }`}
                      // spacing="1"
                      onClick={() => setSelectedRunId(row.TestCase)}
                    >
                      <StyledTableCell
                        sx={{
                          color:
                            selectedRunId === row.TestCase
                              ? "white"
                              : "#654DF7",
                        }}
                      >
                        {row.TestCase}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          color:
                            selectedRunId === row.TestCase ? "white" : "black",
                        }}
                      >
                        {formatDate(row.StartDateTime)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          color:
                            selectedRunId === row.TestCase ? "white" : "black",
                        }}
                      >
                        {formatDate(row.EndDateTime)}
                      </StyledTableCell>
                      <CustomStatusCell
                        status={row.Status}
                        selected={selectedRunId === row.TestCase}
                      />
                      <StyledTableCell
                        sx={{
                          color:
                            selectedRunId === row.TestCase
                              ? "white"
                              : "#654DF7",
                        }}
                        onClick={() => {}}
                      >
                        <VideocamIcon
                          onClick={() => handleVideoPlay(row.TestVideoUrl)}
                        />
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan={5} align="center">
                      No execution history
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>

      {/* <Grid item xs={12} md={5} justifySelf="start">
        {selectedRunId && (
          <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
            <TableContainer sx={{ marginBottom: "8vh" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell colSpan={4}>
                      <StyledTypography variant="h6" color="primary">
                        {selectedRunId}
                      </StyledTypography>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>Screenshot</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stepDetail &&
                   JSON.parse(stepDetail[0].TestScreenShotUrl)?.map((item,index) => 
                        <TableRow
                          key={index}
                          className={`${classes.tableRow}`}
                          style={{ height: "10px" }}
                          spacing="3"
                        >
                           {item.type === 'screenshot' &&<CustomeTableChell ScreenshotUrl={item.files}/>}
                        </TableRow>
                    )
                    }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Grid> */}
      <Grid item xs={12} md={5} justifySelf="start">
        {selectedRunId && (
          <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
            <TableContainer sx={{ marginBottom: "8vh" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell colSpan={4}>
                      <StyledTypography variant="h6" color="primary">
                        {selectedRunId}
                      </StyledTypography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Rundetail runIdDetails={runIdDetails}/>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Grid>
    </>
  );
}
