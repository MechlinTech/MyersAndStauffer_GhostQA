import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { useNavigate, useParams } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import axios from "axios";
import { header, headerCypres, headerForm } from "../../utils/authheader";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { StyledTypography } from "./styles";
import { Delete } from "@material-ui/icons";
import { getBaseUrl, getCoreEngineBaseUrl } from "../../utils/configService";
import DeleteModal from "./Comman/DeleteModal";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TableTestCase({ testCase, rootId }) {
  const navigate = useNavigate();
  const { nodeId } = useParams();
  const [executingTest, setexecutingTest] = React.useState({});
  const [testCaseList, setTestCaseList] = React.useState(testCase);
  const [openDelModal, setopenDelModal] = useState(false);
  const [deleteItem, setsDeleteItem] = useState("");

  const fetchData = async () => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/AddTestLab/GetTestCaseDetailsByRootId?RootId=${rootId}`,
        header()
      );

      // Assuming response.data is the array of data you want to set as listData
      // setTestCaseList(
      //   response.data.status === "fail" || response.data == ""
      //     ? []
      //     : response.data
      // );
      if (response.data.status === "fail" || response.data === "") {
        setTestCaseList([]);
      } else {
        const reversedTestCaseList = response.data.reverse();
        setTestCaseList(reversedTestCaseList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestCaseList([]);
    }
  };
  const handleExecution = async (row) => {
    console.log("test case name ", row);
    setexecutingTest((prev) => ({
      ...prev,
      [row.TestCaseName]: true,
    }));

    try {
      const BASE_URL = await getBaseUrl();
      const CORE_BASE_URL = await getCoreEngineBaseUrl();
      const jsonData = await axios.get(
        `${BASE_URL}/AddTestLab/GetExcutedByRootId?RootId=${rootId}&TestName=${row.TestCaseName}`
      );
      const currentDate = new Date();
      const formattedStartDateTime = currentDate.toISOString();
      let payload = {
        name: "name",
        request_json: jsonData.data,
      };
      const executedDetail = await axios.post(
        `${CORE_BASE_URL}/codeengine/api/test-suitesV2/execute3/`,
        payload,
        headerCypres()
      );

      const runId = executedDetail.data.container_runs[0].id;
      console.log("execution detail", executedDetail);
      getRunDetail(runId, 1000, row, formattedStartDateTime);
    } catch (error) {
      console.log("error fetching execution data", error);
      toast.error("network error");
      setexecutingTest((prev) => ({
        ...prev,
        [row.TestCaseName]: false,
      }));
    }
  };

  const getRunDetail = async (runId, delay, row, formattedStartDateTime) => {
    function capitalizeFirstLetter(str) {
      return str
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" "); // Join the array of words back into a string
    }

    
    try {
      const CORE_BASE_URL = await getCoreEngineBaseUrl();
      const res = await axios.get(
        `${CORE_BASE_URL}/codeengine/api/test-suitesV2/${runId}/monitor_container_run/`
      );

      if (res.data.container_status === "exited") {
        if (Object.keys(res.data.json).length === 0) {
          // toast.error("No data in json");
          toast.error("Selector is not valid");
          setexecutingTest((prev) => ({
            ...prev,
            [row.TestCaseName]: false,
          }));
          return;
        }
        setexecutingTest((prev) => ({
          ...prev,
          [row.TestCaseName]: false,
        }));
        const rundetails = res.data;
        const currentDate = new Date();
        const formattedEndDateTime = currentDate.toISOString();
        let endDate = formattedEndDateTime;
        try {
          const BASE_URL = await getBaseUrl();
          const res = await axios.post(
            `${BASE_URL}/AddTestLab/AddExecuteResult`,
            {
              testCaseDetailId: row.TestCaseDetailsId,
              data: rundetails,
              startDate: formattedStartDateTime,
              endDate: endDate,
            },
            header()
          );
          if (res.data.status === "success") {
            const testCaseName = capitalizeFirstLetter(row.TestCaseName);
            toast.info(`${testCaseName} Successfully executed`, {
              style: {
                background: "rgb(101, 77, 247)",
                color: "rgb(255, 255, 255)",
              },
            });
          }
          fetchData();
        } catch (error) {
          console.log("error", error);
          toast.error(`${row.TestCaseName} Error AddExecuteResult`);
        }
      } else {
        setTimeout(() => {
          getRunDetail(runId, delay, row, formattedStartDateTime);
        }, delay);
      }
    } catch (error) {
      console.error("Error getting run details:", error);
      toast.error(`${row.TestCaseName} Failed`);
      setexecutingTest((prev) => ({
        ...prev,
        [row.TestCaseName]: false,
      }));
    }
  };

  const handleDeleTeModal = (item) => {
    console.log("item", item);
    let data = {
      id: item?.TestCaseDetailsId,
      name: item?.TestCaseName,
    };
    setsDeleteItem(data);
    setopenDelModal(true);
  };

  const handleDelete = async (testId) => {
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddTestLab/DeleteTestCaseDetailsByTestCaseDetailsId?TestCaseDetailsId=${testId}`
      );
      console.log("res", res);
      if (res.data.status === "success") {
        setopenDelModal(false);
        toast.info("successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        fetchData();
      }
    } catch (error) {
      toast.error("NETWORK ERROR");
    }
    setopenDelModal(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Check if the date is invalid
    if (isNaN(date.getTime())) {
      return ""; // Return empty string for invalid dates
    }

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

  function capitalizeFirstLetter(str) {
    // Check if the input string is not empty
    if (str?.length > 0) {
      // Capitalize the first letter and concatenate with the rest of the string
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      // Return an empty string if input is empty
      return "";
    }
  }
  return (
    <>
      <DeleteModal
        open={openDelModal}
        onClose={() => setopenDelModal(false)}
        deleteItem={deleteItem}
        handleDelete={handleDelete}
      />

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
              {/* <TableCell align="center">
              <StyledTypography>Video</StyledTypography>
            </TableCell> */}
              <TableCell align="center">
                <StyledTypography>Last run on</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Run Now</StyledTypography>
              </TableCell>
              <TableCell align="center">
                <StyledTypography>Action</StyledTypography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testCaseList?.map((row) => (
              <TableRow
                key={row.TestCaseDetailsId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    navigate(
                      // `/testLab/editTestcase/${row.TestCaseName}/${row.TestCaseDetailsId}`
                      `/testLab/editTestcase/${row.TestCaseDetailsId}`
                    );
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <StyledTypography> {row.TestCaseName}</StyledTypography>
                </TableCell>
                <TableCell align="center">
                  <StyledTypography>
                    {executingTest[row.TestCaseName]
                      ? "Running"
                      : capitalizeFirstLetter(row.Status)}
                  </StyledTypography>
                </TableCell>
                {/* <TableCell align="center">
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
              </TableCell> */}
                <TableCell align="center">
                  <StyledTypography>
                    {formatDate(row.StartDateTime)}
                  </StyledTypography>
                </TableCell>
                <TableCell align="center">
                  {!executingTest[row.TestCaseName] ? (
                    <PlayCircleIcon
                      style={{ color: "rgb(101, 77, 247)", cursor: "pointer" }}
                      onClick={(e) => {
                        handleExecution(row);
                      }}
                    />
                  ) : (
                    <CircularProgress
                      style={{ color: "rgb(101, 77, 247)" }}
                      size={25}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Delete
                    style={{ color: "red", cursor: "pointer" }}
                    // onClick={() => handleDelete(row.TestCaseDetailsId)}
                    onClick={() => handleDeleTeModal(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
