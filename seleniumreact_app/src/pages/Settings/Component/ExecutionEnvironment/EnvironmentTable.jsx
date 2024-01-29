import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTableStyles, StyledTableCell } from "./styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

export function EnvironmentTable({ rows }) {
  const classes = useTableStyles();


  const handleDelete = (row) => {
    console.log(`Deleting environment: ${row.EnvironmentName}`);
  };

  const handleEdit = (row) => {
    console.log(`Editing environment: ${row.EnvironmentName}`);
  };
  return (
    <TableContainer sx={{ marginBottom: "8vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Environment Name</StyledTableCell>
            <StyledTableCell>Environment Description</StyledTableCell>
            <StyledTableCell>Application</StyledTableCell>
            <StyledTableCell>Base Url</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.TestCaseName}
              className={`${classes.tableRow}`}
              style={{ height: "10px" }}
            >
              <StyledTableCell component="th" scope="row">
                {row.EnvironmentName}
              </StyledTableCell>
              <StyledTableCell>{row.EnvironmentDescription}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.application}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.baseUrl}
              </StyledTableCell>
              <StyledTableCell>
                <EditIcon
                  onClick={() => handleEdit(row)}
                  style={{ cursor: "pointer", marginRight: "10px",  color: "rgb(101, 77, 247)", }}
                />
                <DeleteIcon
                  onClick={() => handleDelete(row)}
                  style={{ cursor: "pointer", marginRight: "10px", color: "#F64E4E"}}
                />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
