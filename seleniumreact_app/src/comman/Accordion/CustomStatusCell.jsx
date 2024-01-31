import React from "react";
import { TableCell, Chip } from "@mui/material";

const CustomStatusCell = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Passed":
        return { backgroundColor: "rgb(7, 217, 176)", color: "rgb(253, 253, 253)" };
      case "Failed":
        return { backgroundColor: "rgb(247, 77, 77)", color: "rgb(253, 253, 253)" };
      case "Partially Passed":
        return { backgroundColor: "rgb(247, 169, 77)", color: "rgb(253, 253, 253)" };
      default:
        return {}; // Default background
    }
  };

  return (
    <TableCell>
      <Chip label={status} style={{ ...getStatusStyle(), height: "24px" }} />
    </TableCell>
  );
};

export default CustomStatusCell;