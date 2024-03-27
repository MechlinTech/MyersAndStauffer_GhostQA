import { makeStyles } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
  theadFont: {
    fontSize: "14px",
  },
  tbodyFont: {
    fontSize: "12px",
  },
  mainContainer: {
    margin: "5px 20px",
  },
  hederStyle: {
    background: "#f1f1f1",
    height: "30%",
    display: "flex",
    alignItems: "center",
  },
  headrRightSite: {
    background: "#f1f1f1",
    height: "14%",
    display: "flex",
    alignItems: "center",
  },
  cardfontSize: {
    fontSize: "14px",
    lineHeight: "1rem",
  },
  chipLabelStyle: {
    fontSize: "12px",
    fontWeight: "400",
    fontFamily: "Lexend Deca",
  },
  centeredVideo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    padding: "10px 10px 10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
  hoverPointer: {
    cursor: "pointer",
    "&:hover": {
      border: "2px solid #654DF7",
      cursor: "pointer",
    },
  },
  activeRow: {
    border: "2px solid #654DF7",
  },
  breadCrumbHead: {
    background: "#f1f1f1",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  breadCrumbStyle: {
    textDecoration: "none",
    color: "black",
    fontSize: "14px",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "4px",
      background: "rgb(101, 77, 247)",
      bottom: -3,
      left: 0,
      transform: "scaleX(0)",
      transformOrigin: "bottom left",
      transition: "transform 0.3s ease",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
    },
  },
  backBtn: {
    background: "rgb(101, 77, 247)",
    padding: "10px 15px",
    color: "white",
    textTransform: "none",
    fontSize: "14px !important",
    "&:hover": {
      background: "rgb(101, 77, 247)",
    },
  },
  CustomfontSize: {
    fontSize: "18px !important",
  },
  fontSize50: {
    fontSize: "50px !important",
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
  initialSetupCardStyle : {
    fontFamily:'Lexend Deca',
    fontSize:'16px',
    fontWeight:'400',
    color:'#646464',
    lineHeight:"20px"
  },
  backBtn: {
    background: 'rgb(101, 77, 247)',
    padding: '5px 15px',
    color: 'white',
    textTransform: 'none',
    fontSize: '14px !important',
    '&:hover': {
        background: 'rgb(101, 77, 247)',
    }
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
      fontSize: "16px",
      color:"#646464",
      fontFamily: `"Lexend Deca", sans-serif, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
      borderLeft: first ? "1px solid rgb(217, 217, 217)" : "none", 
      borderRight: last ? "1px solid rgb(217, 217, 217)" : "none", 
    },
  }));

