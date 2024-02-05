import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTableStyles, StyledTableCell } from "./styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import DeleteModal from "../Modal/DeleteModal";

export function CustomTable({ rows,handleEditApplication}) {
  const classes = useTableStyles();

  const [openDelModal, setopenDelModal] = useState(false)
  const [itemId, setitemId] = useState(null)
  const [AppOrBrow, setAppOrBrow] = useState('application')


  const handleDelete = (row) => {
    setopenDelModal(true)
    setitemId(row.ApplicationId)
  };

  const handleEdit = (row) => {
    handleEditApplication(row)
    console.log(`Editing ApplicationName: ${row.ApplicationName}`);
  };
  return (
    <>
    <DeleteModal
    open={openDelModal}
    onClose={()=>setopenDelModal(false)}
    itemId={itemId}
    AppOrBrow={AppOrBrow}
    />
    <TableContainer sx={{ marginBottom: "8vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Project Name</StyledTableCell> */}
            <StyledTableCell>Application Name</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ApplicationName}
              className={`${classes.tableRow}`}
              style={{ height: "10px"}}
              spacing='3'
            >
              {/* <StyledTableCell component="th" scope="row">
                {row.projectName}
              </StyledTableCell> */}
              <StyledTableCell>{row.ApplicationName}</StyledTableCell>
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