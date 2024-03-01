import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { OutlinedInput, Typography } from "@mui/material";

export const useStyles = makeStyles({
  main: {
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    display: "flex", 
    height: "75vh",
    margin:'0 20px'
  },
  textContainer: {
    border: "1px solid rgb(219, 217, 217)",
    padding: "5px",
    marginBottom: "5px",
    width: "50%",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
});

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  height: "40px",
  backgroundColor: "rgb(242, 242, 242)",
  // Add other styles as needed
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));