import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStyles, StyledTableCell } from "./styles";

export function TableData({ rows }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Typography
        gutterBottom
        style={{
          fontFamily: "Lexend Deca",
          fontSize: "20px",
          fontWeight: "400",
          color: "#646464",
          paddingLeft: "10px",
        }}
      >
        Response Codes
      </Typography>
      <Table>
        <TableHead style={{ height: "34px" }}>
          <TableRow>
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Count</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              style={{ height: "34px !important" }}
              key={row.Code}
              className={`${classes.tableRow}`}
            >
              <StyledTableCell component="th" scope="row">
                {row.Code}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                <span>{row.description1}</span>
                <br />
                <span>{row.description2}</span>
              </StyledTableCell>
              <StyledTableCell>
                <span style={{ paddingLeft: "10px" }}>{row.Count}</span>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
