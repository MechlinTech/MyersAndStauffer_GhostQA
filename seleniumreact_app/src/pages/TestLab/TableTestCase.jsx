import * as React from "react";
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
import { getBaseUrl } from "../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TableTestCase({ testCase, rootId }) {
    const navigate = useNavigate();
    const { nodeId } = useParams()
    const [executingTest, setexecutingTest] = React.useState({});
    const [testCaseList, setTestCaseList] = React.useState(testCase)
    const handleExecution = async (row) => {
        console.log("test case name ", row);
        setexecutingTest((prev) => ({
            ...prev,
            [row.TestCaseName]: true,
        }));
        try {
            const BASE_URL = await getBaseUrl();
            const jsonData = await axios.get(
                `${BASE_URL}/AddTestLab/GetExcutedByRootId?RootId=${rootId}&TestName=${row.TestCaseName}`
            );
            let payload = {
                name: "name",
                request_json: jsonData.data,
            };
            const executedDetail = await axios.post(
                `/codeengine/api/test-suitesV2/execute3/`,
                payload,
                headerCypres()
            );

            const runId = executedDetail.data.container_runs[0].id;
            console.log("execution detail", executedDetail);
            getRunDetail(runId, 1000, row);
        } catch (error) {
            console.log("error fetching execution data", error);
            toast.error("network error");
            setexecutingTest((prev) => ({
                ...prev,
                [row.TestCaseName]: false,
            }));
        }
    };

    const getRunDetail = async (runId, delay, row) => {
        try {
            const res = await axios.get(
                `/codeengine/api/test-suitesV2/${runId}/monitor_container_run/`
            );

            if (res.data.container_status === "exited") {
                if (Object.keys(res.data.json).length === 0) {
                    toast.error("No data in json")
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
                try {
                    const BASE_URL = await getBaseUrl();
                    const res = await axios.post(`${BASE_URL}/AddTestLab/AddExecuteResult?testCaseDetailId=${row.TestCaseDetailsId}`, rundetails, header())
                    if (res.data.status === "success") {
                        toast.info("Successfully executed", {
                            style: {
                                background: "rgb(101, 77, 247)",
                                color: "rgb(255, 255, 255)",
                            },
                        });
                    }
                } catch (error) {
                    console.log('error', error)
                    toast.error('Error AddExecuteResult')
                }
                console.log("rundetails : ", rundetails);
            } else {
                setTimeout(() => {
                    getRunDetail(runId, delay, row);
                }, delay);
            }
        } catch (error) {
            console.error("Error getting run details:", error);
            toast.error("Network error");
            setexecutingTest((prev) => ({
                ...prev,
                [row.TestCaseName]: false,
            }));
        }
    };

    const fetchData = async () => {
        try {
            const BASE_URL = await getBaseUrl();
            const response = await axios.post(
                `${BASE_URL}/AddTestLab/GetTestCaseDetailsByRootId?RootId=${rootId}`,
                header()
            );

            // Assuming response.data is the array of data you want to set as listData
            setTestCaseList((response.data.status === 'fail' || response.data == '' ? [] : response.data));
        } catch (error) {
            console.error("Error fetching data:", error);
            setTestCaseList([]);
        }
    };
    const handleDelete = async (testId) => {
        try {
            const BASE_URL = await getBaseUrl();
            const res = await axios.post(
                `${BASE_URL}/AddTestLab/DeleteTestCaseDetailsByTestCaseDetailsId?TestCaseDetailsId=${testId}`
            );
            console.log('res', res)
            if (res.data.status === "success") {
                toast.info("successfully deleted", {
                    style: {
                        background: "rgb(101, 77, 247)",
                        color: "rgb(255, 255, 255)",
                    },
                });
                fetchData()
            }

        } catch (error) {
            toast.error("NETWORK ERROR")
        }
    }
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
                                    navigate(`/testLab/editTestcase/${row.TestCaseName}/${row.TestCaseDetailsId}`);
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <StyledTypography> {row.TestCaseName}</StyledTypography>
                            </TableCell>
                            <TableCell align="center">
                                <StyledTypography>
                                    {executingTest[row.TestCaseName] ? 'Running' : ""}
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
                                <Delete style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(row.TestCaseDetailsId)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}