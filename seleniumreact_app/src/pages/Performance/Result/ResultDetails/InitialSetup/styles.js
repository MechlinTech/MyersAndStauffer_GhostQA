import { makeStyles } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
  tbodyFont: {
    fontSize: "12px",
  },
  mainContainer: {
    margin: "5px 20px",
  },

  InitialStateHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  initialSetupCardStyle: {
    fontFamily: "Lexend Deca",
    fontSize: "16px",
    fontWeight: "400",
    color: "#646464",
    lineHeight: "20px",
  },
});

export const StyledTableCell = styled(TableCell)(({ theme, first, last }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#646464",
    padding: "0px 10px",
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    borderTop: "1px solid rgb(217, 217, 217)",
    borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none",
    borderRight: last ? "1px solid rgb(217, 217, 217)" : "none",
    fontWeight: "400"
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "0px 10px",
    fontSize: "16px",
    color: "#646464",
    height:'50px',
    fontWeight:'500',
    fontFamily: "Lexend Deca",
    borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none",
    borderRight: last ? "1px solid rgb(217, 217, 217)" : "none",
  },
}));
