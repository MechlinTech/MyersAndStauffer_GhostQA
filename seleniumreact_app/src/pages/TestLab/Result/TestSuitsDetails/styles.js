import { TableCell, Typography, makeStyles } from "@material-ui/core";
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
    theadFont: {
        fontSize: '14px'
    },
    tbodyFont: {
        fontSize: '12px'
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
        borderRadius: '5px',
        marginBottom: '10px'
    },
    breadCrumbStyle: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '14px',
        position: 'relative',
        '&:hover': {
            cursor: 'pointer'
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '4px',
            background: 'rgb(101, 77, 247)',
            bottom: -3,
            left: 0,
            transform: 'scaleX(0)',
            transformOrigin: 'bottom left',
            transition: 'transform 0.3s ease',
        },
        '&:hover::after': {
            transform: 'scaleX(1)',
        },
    },
    backBtn: {
        background: 'rgb(101, 77, 247)',
        padding: '10px 15px',
        color: 'white',
        textTransform: 'none',
        fontSize: '14px !important',
        '&:hover': {
            background: 'rgb(101, 77, 247)',
        }
    },
   
      // for the execution history
      tableRow: {
        cursor: "pointer",
        "&:hover": {
            border: "2px solid #654DF7",
        },
        "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: 'gray',
        },
        // height: "40px",
    },
    activeRow: {
        border: "2px solid #654DF7",
        backgroundColor:'#654DF7',
        color:'white'
    },
    statusBox:{
      padding:'0 3px',
    },

});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(242, 242, 242)",
        color: "#5c5c5c",
        padding: "10px 20px",
        fontFamily: "Lexend Deca",
        fontSize: "12px",
        borderTop: "1px solid rgb(217, 217, 217)",
        lineHeight: "18px",
        maxWidth: "200px", // Set maximum width
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
        padding: "10px 20px",
        fontSize: "12px",
        lineHeight: "18px",
        letterSpacing: "normal",
        fontFamily: `"Lexend Deca", sans-serif, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
        maxWidth: "200px", // Set maximum width
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
  }));

  export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));