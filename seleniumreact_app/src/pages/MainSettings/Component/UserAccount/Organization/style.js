import { TextField, makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Typography,FormControl } from "@mui/material";

export const useStyles = makeStyles((theme) => ({
    papercontainer: {
        marginTop:'20px',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    imgStyle:{
      display:'inline-block',
      height:"40px",
      width:'40px',
      borderRadius:'50%',
      border:'2px solid green'
    }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));


  export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#654DF7",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#654DF7",
      },
      "& fieldset": {
        borderColor: "transparent",
      },
    },
  }));