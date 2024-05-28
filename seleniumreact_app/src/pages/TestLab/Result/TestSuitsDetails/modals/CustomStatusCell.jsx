import React from "react";
import { TableCell, Chip } from "@mui/material";

const CustomStatusCell = ({ status, selected }) => {
  console.log("selected", selected);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusStyle = () => {
    let style = {
      backgroundColor: selected ? "transparent" : "",
      color: "rgb(253, 253, 253)",
      borderRadius: "3px",
    };

    switch (status) {
      case "passed":
        style.backgroundColor = selected ? "transparent" : "rgb(7, 217, 176)";
        break;
      case "failed":
        style.backgroundColor = selected ? "transparent" : "rgb(247, 77, 77)";
        break;
      default:
        style.backgroundColor = selected ? "transparent" : "rgb(247, 169, 77)";
        break;
    }

    return style;
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
