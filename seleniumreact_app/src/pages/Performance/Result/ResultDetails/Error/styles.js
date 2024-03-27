import { makeStyles } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    overflowX: "hidden",
    padding: "20px 20px",
  },
  headerRow: {
    border: "2px solid #DADADA",
    marginBottom: "5px",
    height: "45px",
    justifyContent: "left",
    alignItems: "center",
    paddingLeft: "20px",
  },
  headerContent: {
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "17.5px",
    textAlign: "left",
    color: "#646464",
    flexBasis: "20%", 
    
  },
  accordionContainer: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    overflowX: "auto",
  },
  accordion: {
    flexShrink: 0,
    width: "100%",
    boxShadow: "none",
    border: "1px solid rgb(217, 217, 217)",
    marginBottom: "5px",
  },
  accordianSummary: {
    flexBasis: "22%", 
    textAlign: "left",
    color: "#646464",
    fontFamily: "Lexend Deca",
    fontSize: "14px",
  },
  ErrorHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeading: {
        fontFamily: "Lexend Deca",
        fontSize: "16px",
        fontWeight: "500",
        color: "#646464",
  }
});

export const StyledTableCell = styled(TableCell)(({ theme, first, last }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: "#5c5c5c",
      padding: "0px 10px",
      fontFamily: "Lexend Deca",
      fontSize: "14px",
      borderTop: "1px solid rgb(217, 217, 217)",
      borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none", 
      borderRight: last ? "1px solid rgb(217, 217, 217)" : "none", 
    },
    [`&.${tableCellClasses.body}`]: {
      padding: "0px 10px",
      fontSize: "14px",
      color:"#646464",
      fontFamily: `"Lexend Deca"`,
      borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none", 
      borderRight: last ? "1px solid rgb(217, 217, 217)" : "none", 
    },
  }));
