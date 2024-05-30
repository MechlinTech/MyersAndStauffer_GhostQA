import { makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
    modalContainer:{
        height: "100vh",
        width:'50vw',
        backgroundColor: "white",
        position:'relative',
        borderWidth:'0px'
    },
    headingDisplay:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // background: "#f1f1f1",
        padding:'10px',
        marginBottom:'10px'
      },
    btnDisplay:{
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        // background: "#f1f1f1",
    }
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));