import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomStatusCell from "./CustomStatusCell";
import { Link } from "react-router-dom";
import { useStyles, StyledTableCell } from "./style";
import { GetTestCaseDetails } from "../../redux/actions/seleniumAction";
import { useDispatch } from "react-redux";

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
export function TableData({ rows }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeRow, setActiveRow] = React.useState(null);

  const handleRowClick = (payload) => {
    let data = {
      testSuitName: payload.TestSuiteName,
      runId: payload.TestRunName,
    };
    dispatch(GetTestCaseDetails(data));
    setActiveRow((prevSuite) => (prevSuite === payload ? null : payload));
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Run Id</StyledTableCell>
            <StyledTableCell>Start Time</StyledTableCell>
            <StyledTableCell>End Time</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Passed</StyledTableCell>
            <StyledTableCell>Failed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.TestRunName}
              className={`${classes.tableRow} ${
                row === activeRow ? classes.activeRow : ""
              }`}
            >
              <StyledTableCell component="th" scope="row">
                <Link
                  to={`/${row?.TestSuiteName}/${row.TestRunName}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => handleRowClick(row)}
                >
                  {row.TestRunName}
                </Link>
              </StyledTableCell>
              <StyledTableCell>
                {formatTime(row.TestRunStartDateTime)}
              </StyledTableCell>
              <StyledTableCell>
                {formatTime(row.TestRunEndDateTime)}
              </StyledTableCell>
              <CustomStatusCell status={row.TestRunStatus} />
              <StyledTableCell className="p-4" sx={{}}>
                {row.TotalTestCases}
              </StyledTableCell>
              <StyledTableCell className="p-4">
                {row.PassedTestCases}
              </StyledTableCell>
              <StyledTableCell className="p-4">
                {row.FailedTestCases}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}