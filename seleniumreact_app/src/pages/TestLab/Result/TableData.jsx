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
  const [loading ,setLoading] = useState(false);

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
        </TableBody>
      </Table>
    </TableContainer>
  );
}