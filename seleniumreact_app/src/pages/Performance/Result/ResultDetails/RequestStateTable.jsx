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
            <StyledTableCell first>Transactions</StyledTableCell>
            <StyledTableCell>Sample</StyledTableCell>
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
              <StyledTableCell first>{row.transactions}</StyledTableCell>
              <TableCell>{row.sample}</TableCell>
              <TableCell>{row.avgResponseTime}</TableCell>
              <TableCell>{row.avgHits}</TableCell>
              <TableCell>{row.line904}</TableCell>
              <TableCell>{row.line954}</TableCell>
              <TableCell>{row.line994}</TableCell>
              <TableCell>{row.minResponseTime}</TableCell>
              <TableCell>{row.maxResponseTime}</TableCell>
              <TableCell>{row.avgBandwidth}</TableCell>
              <StyledTableCell last>{row.errorPercentage}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
