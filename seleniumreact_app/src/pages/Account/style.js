import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Typography,OutlinedInput } from "@mui/material";

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
    }
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