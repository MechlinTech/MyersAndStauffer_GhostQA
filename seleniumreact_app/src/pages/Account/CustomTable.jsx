import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStyles, StyledTableCell,IOSSwitch } from "./style";
import axios from "axios";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export function CustomTable({ users}) {

  const classes = useStyles();
 const [userList, setuserList] = useState(users)
 const [isCkecked, setisCkecked] = useState(false)


  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get(
        `${BASE_URL}/Selenium/GetUserDetails`,
        header()
      );
      setuserList(res.data)
      console.log("user list : ", res);
    };

    getUserList();
  }, [isCkecked]); // userlist will rerender when checked switch button

  const handleSwitch = (e,row) => {
    setisCkecked(!isCkecked)
    let payload = {
      "userId": row.Id,
      "isDisabled": e.target.checked
    }
    const EnableDisableUser = async () => {
      const res = await axios.post(
        `${BASE_URL}/Selenium/DisableEnableUser`,payload,
        header()
      );
      console.log("response : ", res);
    };
    
    EnableDisableUser()
    
  };

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
            <StyledTableCell>Eamil</StyledTableCell>
            <StyledTableCell>Enable</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((row) => (
            <TableRow
              key={row.Email}
              className={`${classes.tableRow}`}
              style={{ height: "10px"}}
              spacing='3'
            >
              <StyledTableCell sx={{opacity:row.IsDisabled?.5:1}}>
              {getName(row.Email)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" sx={{opacity:row.IsDisabled?.5:1}}>
                {row.Email}
              </StyledTableCell>
              <StyledTableCell>
              <IOSSwitch defaultChecked={row.IsDisabled} onChange={(e)=>handleSwitch(e,row)}/>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}