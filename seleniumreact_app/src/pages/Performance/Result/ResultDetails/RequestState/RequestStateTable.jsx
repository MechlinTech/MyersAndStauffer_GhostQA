import * as React from "react";
import Table from "@mui/material/Table";
import { TableBody, TableCell } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStyles, StyledTableCell } from "./styles";

export function RequestStateTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead style={{ height: "34px" }}>
          <TableRow>
            <StyledTableCell first colSpan={2}>Transactions</StyledTableCell>
            <StyledTableCell colSpan={2}>Sample</StyledTableCell>
            <StyledTableCell>Avg. Response Time (ms)</StyledTableCell>
            <StyledTableCell>Avg. Hit’s</StyledTableCell>
            <StyledTableCell>904 line (ms)</StyledTableCell>
            <StyledTableCell>954 line (ms)</StyledTableCell>
            <StyledTableCell>994 line (ms)</StyledTableCell>
            <StyledTableCell>Min. Response Time (ms)</StyledTableCell>
            <StyledTableCell>Max. Response Time (ms)</StyledTableCell>
            <StyledTableCell>Average Bandwidth Key/s</StyledTableCell>
            <StyledTableCell last>Error Percentage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell first colSpan={2}>{row.transactions}</StyledTableCell>
              <StyledTableCell colSpan={2}>{row.sample}</StyledTableCell>
              <StyledTableCell>{row.avgResponseTime}</StyledTableCell>
              <StyledTableCell>{row.avgHits}</StyledTableCell>
              <StyledTableCell>{row.line904}</StyledTableCell>
              <StyledTableCell>{row.line954}</StyledTableCell>
              <StyledTableCell>{row.line994}</StyledTableCell>
              <StyledTableCell>{row.minResponseTime}</StyledTableCell>
              <StyledTableCell>{row.maxResponseTime}</StyledTableCell>
              <StyledTableCell>{row.avgBandwidth}</StyledTableCell>
              <StyledTableCell last>{row.errorPercentage}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
