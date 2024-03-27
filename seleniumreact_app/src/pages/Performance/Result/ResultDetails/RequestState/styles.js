import { makeStyles } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
  mainContainer: {
    margin: "5px 20px",
  },
 
  requestCard: {
    width: "100%",
    marginTop: "20px",
    padding: "10px",
    height: "100vh",
  },
  RequestStateHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #654DF7",
      // backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
  },
  activeRow: {
    border: "2px solid #654DF7",
  },
});

export const StyledTableCell = styled(TableCell)(({ theme, first, last }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: "#5c5c5c",
      padding: "0px 10px",
      fontFamily: "Lexend Deca",
      fontSize: "12px",
      borderTop: "1px solid rgb(217, 217, 217)",
      borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none", 
      borderRight: last ? "1px solid rgb(217, 217, 217)" : "none", 
    },
    [`&.${tableCellClasses.body}`]: {
      padding: "10px 10px",
      fontSize: "12px",
      color:"#646464",
      fontFamily: `"Lexend Deca"`,
      borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none", 
      borderRight: last ? "1px solid rgb(217, 217, 217)" : "none", 
    },
  }));

