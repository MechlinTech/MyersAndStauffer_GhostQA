import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VideocamIcon from '@mui/icons-material/Videocam';
import { useStyles, StyledTableCell } from "./styleTestCase";

export function CustomTable({ rows}) {

  const classes = useStyles();
  return (
    <>
    <TableContainer sx={{ marginBottom: "8vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Project Name</StyledTableCell> */}
            <StyledTableCell>Run Id </StyledTableCell>
            <StyledTableCell>Start Time</StyledTableCell>
            <StyledTableCell>End Time</StyledTableCell>
            <StyledTableCell>Satus</StyledTableCell>
            <StyledTableCell>Video</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.Email}
              className={`${classes.tableRow}`}
              style={{ height: "10px"}}
              spacing='3'
            >
              <StyledTableCell >
              {row.runid}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.startTime}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.endTime}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.status}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <VideocamIcon/>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}