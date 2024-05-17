import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStyles, StyledTableCell, IOSSwitch } from "./style";
import axios from "axios";
import { header } from "../../../../utils/authheader";
import { getBaseUrl } from "../../../../utils/configService";
import { DisableEnableUser, fetchUsers } from "../../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export function CustomTable({ users }) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const handleSwitch = (e, row) => {
    let payload = {
      userId: row.Id,
      isDisabled: !e.target.checked,
    };
  dispatch(DisableEnableUser(payload))
  }
  const getName = (email) => {
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return (
    <>
      <TableContainer sx={{ marginBottom: "8vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Project Name</StyledTableCell> */}
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Enable</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.Email}
                className={`${classes.tableRow}`}
                style={{ height: "10px" }}
                spacing="3"
              >
                <StyledTableCell sx={{ opacity: row.IsDisabled ? 0.5 : 1 }}>
                  {getName(row.Email)}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ opacity: row.IsDisabled ? 0.5 : 1 }}
                >
                  {row.Email}
                </StyledTableCell>
                <StyledTableCell>
                  <IOSSwitch
                    defaultChecked={!row.IsDisabled}
                    onChange={(e) => handleSwitch(e, row)}
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
