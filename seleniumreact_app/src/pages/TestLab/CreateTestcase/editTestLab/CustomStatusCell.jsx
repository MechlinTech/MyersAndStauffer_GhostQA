import React from "react";
import { TableCell, Chip } from "@mui/material";

const CustomStatusCell = ({ status }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusStyle = () => {
    switch (status) {
      case "passed":
        return {
          backgroundColor: "rgb(7, 217, 176)",
          color: "rgb(253, 253, 253)",
          borderRadius: "0",
        };
      case "failed":
        return {
          backgroundColor: "rgb(247, 77, 77)",
          color: "rgb(253, 253, 253)",
          borderRadius: "0",
        };
      default:
        return {
          backgroundColor: "rgb(247, 169, 77)",
          color: "rgb(253, 253, 253)",
          borderRadius: "0",
        };
    }
  };

  return (
    <TableCell>
      <Chip
        label={capitalizeFirstLetter(status)} 
        style={{ ...getStatusStyle(), height: "24px" }}
      />
    </TableCell>
  );
};

export default CustomStatusCell;
