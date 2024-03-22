import React from "react";
import { TableCell, Chip } from "@mui/material";

const CustomStatusCell = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Complete":
        return { backgroundColor: "rgb(253, 253, 253)" };
      case "Running":
        return { backgroundColor: "rgb(253, 253, 253)" }; 
      case "Aborted":
        return { backgroundColor: "rgb(253, 253, 253)" }; 
      default:
        return {}; // Default background
    }
  };

  // Render dot with different colors for different statuses
  let dotColor;
  switch (status) {
    case "Complete":
      dotColor = "#00A879"; 
      break;
    case "Running":
      dotColor = "#654DF7"; 
      break;
    case "Aborted":
      dotColor = "#F64E4E";
      break;
    default:
      dotColor = "black"; 
  }

  const dotStyle = {
    backgroundColor: dotColor,
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "5px"
  };
  const dot = <span style={dotStyle}></span>;

  return (
    <TableCell>
      <Chip label={<span>{dot}{status}</span>} style={{ ...getStatusStyle(), height: "24px" }} />
    </TableCell>
  );
};

export default CustomStatusCell;
