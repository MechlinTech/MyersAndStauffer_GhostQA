import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import { Typography,OutlinedInput } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
  }));

  export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px',
    height:'40px',
    backgroundColor: "rgb(242, 242, 242)"
  }));

  export const useStyles = makeStyles((theme) => ({
    papercontainer: {
        marginTop:'20px',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    inputError: {
      color: "red",
      textAlign: 'left',
      fontSize: '14px !important',
      // paddingLeft: '10px',
  },
    btnStyle:{
        // backgroundColor: "rgb(101, 77, 247)",
        // height:'38px',
        // "&:hover": {
        // backgroundColor: "rgb(101, 77, 247)",
        // borderColor: "#654DF7",
        // },
        backgroundColor:'red'
    },
    paper: {
        border: "1px solid #DCD9D9",
        borderRadius: "10px",
        marginTop: "10px",
        marginRight: "5px",
        marginLeft: "5px",
        cursor: "pointer",
        padding:'10px',
        "&:hover": {
            border: "2px solid #654DF7",
            cursor: "pointer",
        },
    },
    paperActive: {
        border: "2px solid rgb(101, 77, 247)",
        borderRadius: "10px",
        marginTop: "10px",
        marginRight: "5px",
        marginLeft: "5px",
        cursor: "pointer",
        // color: "rgb(101, 77, 247)",
        backgroundColor: 'rgb(101, 77, 247)',
        color:'#fff'
    },

    //user part styling
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