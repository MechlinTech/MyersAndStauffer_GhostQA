// TestCaseTable.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useTableStyles, StyledTableCell } from "./styles";


export function TestCaseTable({
  rows,
  selectedRows,
  handleSelectAllChange,
  handleCheckboxChange,
  selectAll,
}) {
  const classes = useTableStyles();

  return (
    <TableContainer sx={{ marginBottom: "8vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {" "}
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAllChange}
                color="primary"
                style={{
                  color: selectAll && "rgb(101, 77, 247)",
                }}
              />
              Test Case Name
            </StyledTableCell>
            {/* <StyledTableCell>Start Time</StyledTableCell>
            <StyledTableCell>End Time</StyledTableCell> */}
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
                <Checkbox
                  onChange={(event) => handleCheckboxChange(event, row)}
                  // checked={selectedRows.includes(row)}
                  checked={selectedRows.some(
                    (selectedRow) =>
                      selectedRow.TestCaseName === row.TestCaseName
                  )}
                  style={{
                    color:
                      selectedRows.some(
                        (selectedRow) =>
                          selectedRow.TestCaseName === row.TestCaseName
                      ) && "rgb(101, 77, 247)",
                  }}
                />
                {row.TestCaseName}
              </StyledTableCell>
              {/* <StyledTableCell>
                {formatTime(row.TestRunStartDateTime)}
              </StyledTableCell>
              <StyledTableCell>
                {formatTime(row.TestRunEndDateTime)}
              </StyledTableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
