import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTableStyles, StyledTableCell } from "./styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import DeleteModal from "../Modal/DeleteModal";

export function CustomTable({ rows,handleEditBrowser }) {
  const classes = useTableStyles();

  const [openDelModal, setopenDelModal] = useState(false)
  const [item, setitem] = useState(null)
  const [AppOrBrow, setAppOrBrow] = useState('browser')

  const handleDelete = (row) => {
    setopenDelModal(true)
    setitem(row)
  };

  const handleEdit = (row) => {
    handleEditBrowser(row)
    console.log(`Editing Browser `,row);
  };
  return (
    <>
    <DeleteModal
    open={openDelModal}
    onClose={()=>setopenDelModal(false)}
    item={item}
    AppOrBrow={AppOrBrow}
    />
    <TableContainer sx={{ marginBottom: "8vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Browser Name</StyledTableCell>
            {/* <StyledTableCell>Application Name</StyledTableCell> */}
            {/* <StyledTableCell>E-Mail</StyledTableCell>
            <StyledTableCell>Runner Path</StyledTableCell> */}
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.BrowserId}
              className={`${classes.tableRow}`}
              style={{ height: "10px" }}
            >
              <StyledTableCell component="th" scope="row">
                {row.BrowserName}
              </StyledTableCell>
              {/* <StyledTableCell>{row.applicationName}</StyledTableCell> */}
              {/* <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.runnerPath}
              </StyledTableCell> */}
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
    </>
  );
}