import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { useNavigate } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import axios from "axios";
import { headerCypres, headerForm } from "../../utils/authheader";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { StyledTypography } from "./styles";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TableTestCase({ testCase, rootId }) {
  const navigate = useNavigate();
  const [executingTest, setexecutingTest] = React.useState({});

  const handleExecution = async (testCaseName) => {
    console.log("test case name ", testCaseName);
    setexecutingTest((prev) => ({
      ...prev,
      [testCaseName]: true,
    }));
    try {
      const jsonData = await axios.get(
        `${BASE_URL}/AddTestLab/GetExcutedByRootId?RootId=${rootId}&TestName=${testCaseName}`
      );
      // const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      //   type: "application/json",
      // });
      // const formData = new FormData();
      // formData.append("scenarios_file", blob, "data.json");
      // formData.append("name", "testing");
      let payload = {
        name: "name",
        request_json: jsonData.data,
      };
      const executedDetail = await axios.post(
        "http://65.1.188.67:8010/api/test-suitesV2/execute3/",
        payload,
        headerCypres()
      );

      const runId = executedDetail.data.container_runs[0].id;
      console.log("execution detail", executedDetail);
      getRunDetail(runId, 5000, testCaseName);
    } catch (error) {
      console.log("error fetching execution data", error);
      toast.error("network error");
      setexecutingTest((prev) => ({
        ...prev,
        [testCaseName]: false,
      }));
    }
  };

  const getRunDetail = async (runId, delay, name) => {
    try {
      const res = await axios.get(
        `http://65.1.188.67:8010/api/test-suitesV2/${runId}/monitor_container_run/`
      );

      if (res.data.container_status === "exited") {
        setexecutingTest((prev) => ({
          ...prev,
          [name]: false,
        }));
        const rundetails = res.data;
        try {
          const res = await axios.post('https://192.168.1.55:3006/api/AddTestLab/AddExecuteResult',rundetails)
        } catch (error) {
          toast.error("NETWORK ERROR adding execute result")
        }
        console.log("rundetails : ", rundetails);
      } else {
        setTimeout(() => {
          getRunDetail(runId, delay, name);
        }, delay);
      }
    } catch (error) {
      console.error("Error getting run details:", error);
      toast.error("Network error");
      setexecutingTest((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#dedede" }}>
          <TableRow>
            <TableCell>
              <StyledTypography> Testcase Title</StyledTypography>
            </TableCell>
            <TableCell align="center">
              <StyledTypography>Status</StyledTypography>
            </TableCell>
            <TableCell align="center">
              <StyledTypography>Video</StyledTypography>
            </TableCell>
            <TableCell align="center">
              <StyledTypography>Last run on</StyledTypography>
            </TableCell>
            <TableCell align="center">
              <StyledTypography>Run Now</StyledTypography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCase?.map((row) => (
            <TableRow
              key={row.TestCaseDetailsId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => {
                  navigate(`/testLab/editTestcase/${row.TestCaseName}/${row.TestCaseDetailsId}`);
                }}
                sx={{ cursor: "pointer" }}
              >
                <StyledTypography> {row.TestCaseName}</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>{"running"}</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <span
                  style={{
                    border: "2px solid #1E1E1E",
                    color: "#1E1E1E",
                    padding: "8px 6px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: " center",
                    width: "50px",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <PlayArrowOutlinedIcon />
                </span>
              </TableCell>
              <TableCell align="center">
                <StyledTypography> {"yymmddhhmmss"}</StyledTypography>
              </TableCell>
              <TableCell align="center">
                {!executingTest[row.TestCaseName] ? (
                  <PlayCircleIcon
                    style={{ color: "rgb(101, 77, 247)", cursor: "pointer" }}
                    onClick={(e) => {
                      handleExecution(row.TestCaseName);
                    }}
                  />
                ) : (
                  <CircularProgress
                    style={{ color: "rgb(101, 77, 247)" }}
                    size={25}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
