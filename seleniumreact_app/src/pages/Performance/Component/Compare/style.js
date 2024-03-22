import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  ListItem,
  OutlinedInput,
  TableCell,
  TextField,
  Typography,
  tableCellClasses,
} from "@mui/material";

export const useStyles = makeStyles({
  main: {
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    display: "flex",
    height: "75vh",
    margin: "0 20px",
  },
  tableRow: {
    padding: "5px",
    "&:hover": {
      border: "2px solid #654DF7",
    },
  },
  tableContainerStyle: {
    border: "1px solid #dadada",
    borderRadius: "3px",
    padding:'0'
  },
  
  testListContainer: {
    border: "1px solid #dadada",
    maxHeight: "70vh",
    padding: "0px",
    borderRadius: "3px",
  },
});

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  height: "40px",
  // backgroundColor: "rgb(242, 242, 242)",
  // Add other styles as needed
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  // Add other styles as needed
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  padding: "0px",

  // Add other styles as needed
}));
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: "10px",
    backgroundColor: "rgb(242, 242, 242)",
    color: "#5c5c5c",
    fontFamily: "Lexend Deca",
    fontSize: "12px",
    borderTop: "1px solid rgb(217, 217, 217)",
    lineHeight: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    // backgroundColor: "#fdfdfd",
    padding: "10px",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "normal",
    fontFamily: `"Lexend Deca", sans-serif, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
  },
}));
