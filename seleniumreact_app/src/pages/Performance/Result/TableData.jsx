import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomStatusCell from "./CustomStatusCell";
import { Link } from "react-router-dom";
import { useStyles, StyledTableCell } from "./style";
import { GetTestCaseDetails } from "../../../redux/actions/seleniumAction";
import { useDispatch } from "react-redux";
import { GetResultsDetailsBysRunId } from "../../../redux/actions/ResultAction";

// function formatTime(dateTimeString) {
//   const options = {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: true,
//   };
//   const formattedTime = new Date(dateTimeString).toLocaleTimeString(
//     undefined,
//     options
//   );
//   return formattedTime;
// }

export function TableData({ rows,rootId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeRow, setActiveRow] = React.useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };
  const handleRowClick = (payload) => {
    dispatch(GetResultsDetailsBysRunId(payload.RunId))
    setActiveRow((prevSuite) => (prevSuite === payload ? null : payload));
  };
  return (
    <TableContainer>
      <Table>
        <TableHead style={{ height: "34px" }}>
          <TableRow>
            <StyledTableCell>Run Id</StyledTableCell>
            <StyledTableCell>Start Time</StyledTableCell>
            <StyledTableCell>End Time</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Run By</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.RunDetails?.map((row) => (
            <TableRow
              style={{ height: "34px !important" }}
              key={row.RunId}
              className={`${classes.tableRow} ${
                row === activeRow ? classes.activeRow : ""
              }`}
            >
              <StyledTableCell component="th" scope="row">
                <Link
                  to={`/result/${rootId}/Results/summary/${rows.RunDetails[0].RunId}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => handleRowClick(row)}
                >
                  {row.RunId}
                </Link>
              </StyledTableCell>
              <StyledTableCell>{formatDate(row.StartDateTime)}</StyledTableCell>
              <StyledTableCell>{formatDate(row.EndDateTime)}</StyledTableCell>
              <StyledTableCell className="p-4" sx={{}}>
                {/* {row.TestRunLoactaion} */}
                --
              </StyledTableCell>
              <StyledTableCell className="p-4">
                {row.TesterName}
              </StyledTableCell>
              <CustomStatusCell status={row.Status} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
