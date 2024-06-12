import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const useStyles = makeStyles((theme) => ({
  main: {
    margin: "20px",
    padding: "10px 22px",
  },
  Outlined: {
    height: "40px",
    paddingLeft: "0 !important",
    fontSize: "14px !important",
    "& input": {
        borderRadius: "0!important",
    },
},
  header: {
    fontWeight: 400,
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
    "&:hover": {
      backgroundColor: "rgb(101, 77, 247)",
      borderColor: "#654DF7",
    },
  },
  inputError: {
    color: "red",
    textAlign: "left",
    fontSize: "14px !important",
  },
  input: {
    display: "flex",
    flexDirection: "row",
  },
  customBackground: {
    backgroundColor: "rgb(242, 242, 242)",
    border: "none",
  },
  customHeight: {
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
  buttonContainer: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    padding: "10px",
    gap: "8px",
  },
  highlight: {
    fontSize: "24px",
    fontWeight: 400,
    color: "rgb(56, 56, 56)",
  },

  modalContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: theme.spacing(2),
    width: "50%",
    outline: "none",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  modalBody: {
    paddingBottom: theme.spacing(2),
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
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
