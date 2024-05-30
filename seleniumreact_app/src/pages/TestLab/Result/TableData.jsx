import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomStatusCell from "./CustomStatusCell";
import { useStyles, StyledTableCell } from "./style";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getExecutionHistory } from "../../../redux/actions/testlab/ResultAction";

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
export function TableData({ rows }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRowClick = (row) => {
    dispatch(getExecutionHistory(1234));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Run Id</StyledTableCell>
            <StyledTableCell>Last Run On</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell>Passed</StyledTableCell>
            <StyledTableCell>Failed</StyledTableCell>
            <StyledTableCell>Run by</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.TestRunId}
              className={`${classes.tableRow}`}
            >
              <StyledTableCell component="th" scope="row">
                <Link
                  to={`/testLab-detail/${row?.TestSuiteName}/${row.TestRunId}`}
                  style={{ textDecoration: "none",cursor:"pointer" }}
                  onClick={() => handleRowClick(row)}
                >
                {row.TestRunId}
                </Link>
              </StyledTableCell>
              <StyledTableCell>
                {formatDate(row.LastRunOn)}
              </StyledTableCell>
              <StyledTableCell>

              <CustomStatusCell status={row.TestRunStatus} />
              </StyledTableCell>
              <StyledTableCell className="p-4" sx={{}}>
                {row.TotalTestCases}
              </StyledTableCell>
              <StyledTableCell className="p-4">
                {row.PassedTestCases}
              </StyledTableCell>
              <StyledTableCell className="p-4">
                {row.FailedTestCases}
              </StyledTableCell>
              <StyledTableCell className="p-4">{row.RunBy}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
