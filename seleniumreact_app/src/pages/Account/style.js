import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Typography,OutlinedInput, TableCell, tableCellClasses, Switch } from "@mui/material";

export const useStyles = makeStyles((theme) => ({
    papercontainer: {
        marginTop:'20px',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
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

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px',
    height:'40px',
    backgroundColor: "rgb(242, 242, 242)"
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

export const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#654DF7',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));