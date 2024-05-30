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
import Tooltip from "@mui/material/Tooltip";
import { deleteLocationOnSettings } from "../../../../../redux/actions/locationAction";
import AddAgent from "./AddAgent";
import { useNavigate } from "react-router-dom";

export function LocationTable({ rows }) {
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDelModal, setopenDelModal] = useState(false);
  const [item, setitem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [agentLocation, setAgentLocation] = useState(null);
  const [itemDel, setDelItem] = useState(null);

  const handleModalOpen = (row) => {
    setopenDelModal(true);
    setDelItem(row);
  };

  const handleDelete = (refId) => {
    dispatch(deleteLocationOnSettings(refId, setopenDelModal));
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddAgent = (row) => {
    setOpenModal(true);
    setAgentLocation(row);
  };

  const handleEditAgent = (row) => {
    setOpenModal(true);
    setAgentLocation(row);
  };

  const handleViewAgent = (row) => {
    navigate(`/main-settings/view-agent/${row.ref}`);
  };

  return (
    <>
      <AddAgent open={openModal} onClose={handleClose} row={agentLocation} />
      <DeleteModal
        open={openDelModal}
        onClose={() => setopenDelModal(false)}
        deleteItem={itemDel}
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
          <TableBody style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ marginLeft: "25px" }}
                >
                  {row.parallel_engine_runs}
                </StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Delete Location">
                    <DeleteIcon
                      onClick={() => handleModalOpen(row)}
                      style={{
                        cursor: "pointer",
                        // marginLeft: "10px",
                        color: "#F64E4E",
                      }}
                    />
                  </Tooltip>
                  {row?.agents?.length === 0 && (
                    <Tooltip title="Add Agent">
                      <AddCircleIcon
                        onClick={() => handleAddAgent(row)}
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          color: "rgb(101, 77, 247)",
                        }}
                      />
                    </Tooltip>
                  )}
                  {row?.agents?.length > 0 && (
                    <Tooltip title="Edit Agent">
                      <EditIcon
                        onClick={() => handleEditAgent(row)}
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          color: "rgb(101, 77, 247)",
                        }}
                      />
                    </Tooltip>
                  )}

                  {row?.agents?.length > 0 && (
                    <Tooltip title="View Agent">
                      <VisibilityIcon
                        onClick={() => handleViewAgent(row)}
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          color: "rgb(101, 77, 247)",
                        }}
                      />
                    </Tooltip>
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
