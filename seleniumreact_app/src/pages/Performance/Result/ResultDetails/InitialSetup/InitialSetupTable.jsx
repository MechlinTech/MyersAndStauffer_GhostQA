import * as React from "react";
import Table from "@mui/material/Table";
import { TableBody, TableCell, Button } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStyles, StyledTableCell } from "./styles";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export function InitialSetupTable({ data }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClick = (row) => {
    const rootId = data.rootId;
    const testId = row.id;
    navigate(`/performance?rootId=${rootId}&testid=${testId}`);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead style={{ height: "34px" }}>
          <TableRow>
            <StyledTableCell first>Scenario Name</StyledTableCell>
            <StyledTableCell>Duration</StyledTableCell>
            {/* <StyledTableCell>Location</StyledTableCell> */}
            <StyledTableCell last></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.scenarios?.map((row, index) => (
            <TableRow key={index} style={{ height: "34px" }}>
              <StyledTableCell first>{row.scenarioName}</StyledTableCell>
              <StyledTableCell>{row.duration}</StyledTableCell>
              {/* <StyledTableCell>{row.location}</StyledTableCell> */}
              <StyledTableCell last>
                {" "}
                <Button
                  style={{
                    background: "rgb(101, 77, 247)",
                    padding: "5px 5px",
                    color: "white",
                    textTransform: "none",
                    height: "28px",
                    width: "62px",
                    borderRadius: "3px",
                    fontSize: "12px !important",
                    "&:hover": {
                      background: "rgb(101, 77, 247)",
                    },
                  }}
                  onClick={() => handleButtonClick(row)}
                >
                  <EditIcon
                    fontSize="small"
                    style={{ color: "white", marginRight: "4px" }}
                  />
                  Edit
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
