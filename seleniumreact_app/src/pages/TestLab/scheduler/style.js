import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

export const useStyles = makeStyles({});

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#654DF7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#654DF7",
    },
    "& fieldset": {
      borderColor: "#DADADA",
    },
  },
}));
export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  height: "40px",
  backgroundColor: "rgb(242, 242, 242)",
  // Add other styles as needed
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Lexend Deca",
  fontSize: "14px",
  // Add other styles as needed
}));

export const StyledButton = styled(Button)(
  ({ theme, bgcolor, hoverbg, color }) => ({
    backgroundColor: bgcolor || "rgb(108, 117, 125)",
    textTransform: "none",
    color: color || "#f1f1f1",
    "&:hover": {
      backgroundColor: hoverbg || "rgb(101, 77, 247)",
    },
    fontFamily: "Lexend Deca",
  })
);
