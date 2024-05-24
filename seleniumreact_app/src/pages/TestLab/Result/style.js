import { Typography, makeStyles } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
 
export const useStyles = makeStyles((theme) => ({
    tableRow: {
        "&:hover": {
            border: "2px solid #654DF7",
            backgroundColor: theme.palette.action.hover,
            cursor:"default"
        },
    },
    activeRow: {
        border: "2px solid #654DF7",
    },
}));
 
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(242, 242, 242)",
        color: "#5c5c5c",
        padding: "0px 20px",
        fontFamily: "Lexend Deca",
        fontSize: "12px",
        borderTop: "1px solid rgb(217, 217, 217)",
        lineHeight: "18px",
    },
    [`&.${tableCellClasses.body}`]: {
        // backgroundColor: "#fdfdfd",
        padding: "0px 20px",
        fontSize: "12px",
        lineHeight: "18px",
        letterSpacing: "normal",
        fontFamily: `"Lexend Deca", sans-serif, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));
