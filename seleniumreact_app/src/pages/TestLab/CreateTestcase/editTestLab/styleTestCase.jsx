import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { OutlinedInput, TableCell, Typography, tableCellClasses } from "@mui/material";

export const useStyles = makeStyles((theme)=>({
  main: {
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    display: "flex", 
    // height: "75vh",
    margin:'0 20px'
  },
  textContainer: {
    border: "1px solid rgb(219, 217, 217)",
    padding: "5px",
    marginBottom: "5px",
    width: "50%",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  },

  //table style
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

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  height: "40px",
  backgroundColor: "rgb(242, 242, 242)",
  // Add other styles as needed
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
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
        fontFamily: `"Lexend Deca", sans-serif, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    },
}));