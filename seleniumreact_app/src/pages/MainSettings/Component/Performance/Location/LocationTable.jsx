import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTableStyles, StyledTableCell } from "./styles";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteModal from "./DeleteModal";
import { useDispatch } from "react-redux";
import Tooltip from '@mui/material/Tooltip';
import { deleteLocationOnSettings } from "../../../../../redux/actions/locationAction";

export function LocationTable({ rows }) {
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const [openDelModal, setopenDelModal] = useState(false);
  const [item, setitem] = useState(null);

  const handleModalOpen = (row) => {
    setopenDelModal(true);
    setitem(row);
  };

  const handleDelete = (refId) => {
    dispatch(deleteLocationOnSettings(refId, setopenDelModal));
    console.log("refId", refId);
  };

  return (
    <>
      <DeleteModal
        open={openDelModal}
        onClose={() => setopenDelModal(false)}
        deleteItem={item}
        handleDelete={handleDelete}
      />
      <TableContainer sx={{ marginBottom: "8vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Engines Per Agent</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
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
                <StyledTableCell>{row.location_name}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.functionality}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.parallel_engine_runs}
                </StyledTableCell>
                <StyledTableCell>
                <Tooltip title="Add Agent">
                  <AddCircleIcon
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "rgb(101, 77, 247)",
                    }}
                  />
                  </Tooltip>
                  <Tooltip title="Edit Agent">
                  <EditIcon
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: "rgb(101, 77, 247)",
                    }}
                  />
                  </Tooltip>
                  <Tooltip title="View Agent">
                  <VisibilityIcon
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: "rgb(101, 77, 247)",
                    }}
                  />
                  </Tooltip>
                  <Tooltip title="Delete Location">
                  <DeleteIcon
                    onClick={() => handleModalOpen(row)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: "#F64E4E",
                    }}
                  />
                  </Tooltip>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
