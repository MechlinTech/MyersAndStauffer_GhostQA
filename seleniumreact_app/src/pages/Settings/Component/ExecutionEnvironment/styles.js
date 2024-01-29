import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const useStyles = makeStyles((theme) => ({
  main: {
    margin: "20px",
    padding: "10px 22px",
  },
  header: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    padding: "10px 22px",
  },
  button: {
    height: "40px",
    minWidth: "110px",
    display: "flex",
    textTransform: "none !important",
    backgroundColor: "rgb(101, 77, 247)",
    color: "#fff",
  },
  inputError: {
    color: "red",
    textAlign: "left",
    fontSize: "14px !important",
    // paddingLeft: '10px',
  },
  input: {
    display: "flex",
    flexDirection: "row",
  },
  customBackgroung: {
    backgroundColor: "rgb(242, 242, 242)",
    border: "none",
  },
  customheight: {
    height: "40px",
  },
  customFontSize: {
    fontSize: "14px !important",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderColor: "transparent !important",
      "&:hover fieldset": {
        borderColor: "#654DF7",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#654DF7",
      },
    },
  },
  label: {
    alignSelf: "center",
    padding: "10px 10px",
  },
  ButtonContainer: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    padding: "10px",
    // borderTop: "1px solid #ccc",
    gap: "8px",
  },
  button: {
    height: "40px",
    minWidth: "110px",
    display: "flex",
    textTransform: "none !important",
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
