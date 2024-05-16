import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTableStyles, StyledTableCell } from "./styles";


export function AgentTable({ rows }) {
  const classes = useTableStyles();
  return (
    <>
      <TableContainer sx={{ marginBottom: "8vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Agent Status</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                className={`${classes.tableRow}`}
                style={{ height: "10px" }}
                spacing="3"
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.agent_address}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" style={{marginLeft: "25px"}}>
                  {row.agent_status}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" style={{marginLeft: "25px"}}>
                  {row.status}
                </StyledTableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
