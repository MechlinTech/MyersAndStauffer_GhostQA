import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const useStyles = makeStyles((theme) => ({
  button: {
    height: "40px",
    minWidth: "110px",
    display: "flex",
    textTransform: "none !important",
    backgroundColor: "rgb(101, 77, 247)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(101, 77, 247)",
      borderColor: "#654DF7",
    },
  },

  highlight: {
    fontSize: "24px",
    fontWeight: 400,
    color: "rgb(56, 56, 56)",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(242, 242, 242)",
    color: "#5c5c5c",
    padding: "10px 20px",
    fontFamily: "Lexend Deca",
    fontSize: "12px",
    borderTop: "1px solid rgb(217, 217, 217)",
    lineHeight: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    // backgroundColor: "#fdfdfd",
    padding: "10px 20px",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "normal",
    fontFamily: `"Lexend Deca"`,
  },
}));

export const useTableStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #654DF7",
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.action.selected,
    },
    height: "40px",
  },
  activeRow: {
    border: "2px solid #654DF7",
  },
}));
