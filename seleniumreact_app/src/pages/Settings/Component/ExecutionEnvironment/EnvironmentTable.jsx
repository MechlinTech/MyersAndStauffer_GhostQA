import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTableStyles, StyledTableCell } from "./styles";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import EditNewEnvironment from "./EditNewEnvironment";
import DeleteModal from "../Modal/DeleteModal";
export function EnvironmentTable({ rows,handleEditEnvironment}) {
  const classes = useTableStyles();
  const [showAddNewEnvironment, setShowAddNewEnvironment] = useState(false);

  const [openDelModal, setopenDelModal] = useState(false)
  const [item, setitem] = useState(null)
  const [AppOrBrow, setAppOrBrow] = useState('environment');

  const handleDelete = (row) => {
    console.log(`Deleting environment: ${row.EnvironmentName}`);
    setopenDelModal(true)
    setitem(row)
  };

  const handleEdit = (row) => {
    console.log(`Editing environment: ${row.EnvironmentName}`);
    
      
    
  };
  
 
  

  return (
    <>
    <DeleteModal
    open={openDelModal}
    onClose={()=>setopenDelModal(false)}
    item={item}
    types={AppOrBrow}
    />
    <TableContainer sx={{ marginBottom: "8vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Environment Name</StyledTableCell>
            <StyledTableCell>Environment Description</StyledTableCell>
            <StyledTableCell>Application</StyledTableCell>
            <StyledTableCell>Browser</StyledTableCell>
            <StyledTableCell>Base Url</StyledTableCell>
            <StyledTableCell>Driver path</StyledTableCell>
            <StyledTableCell>Base path</StyledTableCell>
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
              <StyledTableCell component="th" scope="row" >
                {row.Description}
                </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.ApplicationName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.BrowserName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Tooltip title={row.DriverPath}>
                    {row.Baseurl}
                  </Tooltip>
                </StyledTableCell>
              <StyledTableCell component="th" scope="row" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Tooltip title={row.DriverPath}>
                    {row.DriverPath}
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Tooltip title={row.DriverPath}>
                    {row.BasePath}
                  </Tooltip>
                </StyledTableCell>
              <StyledTableCell className="d-flex">
                <EditIcon
                  onClick={() => handleEditEnvironment(row)}
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