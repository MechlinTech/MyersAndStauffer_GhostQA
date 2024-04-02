import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {FormControl, OutlinedInput} from "@mui/material";
export const useStylesTree = makeStyles({
    rootNodeFolder: {
        listStyle: 'none',
        padding:'0 2px'

    },
    child: {
        listStyle: 'none',
    },
    crud: {
        listStyle: 'none',
        alignItems: 'center'
    },
    crud: {
        display: 'none', // Hide crud by default
    },
    cardListHolderList: {
        overflow:'auto',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px',
        boxShadow:'-4px 0px 7px 0px rgba(101, 77, 247,0.2), -6px -1px 6px 0px rgba(101, 77, 247,0.14), 7px 0px 6px 0px rgba(101, 77, 247,0.12)',
        borderRadius: '10px',
        border: "solid 2px #fff",
        margin: '5px 0px',
       '&:hover': {
        border: "solid 2px rgba(101, 77, 247,0.9)",
        '& $crud': { // Target the immediate child with class 'crud' when hovering over cardListHolderList
            display: 'flex', // Display crud elements when cardListHolderList is hovered
        },
    },
},
    cardListHolder: {
    display: 'flex',
    flexDirection: 'column',
},

    editTheFolder: {
    border: '1px solid #654df7',
    padding: '4px 10px',
    fontSize: '18px',
    fontWeight: '400',
    borderRadius: '10px',
    width:'90%',
    outline:'none'
},
updateEdit:{
    display: "flex",
    alignItems: 'center',
    // marginLeft: '36px',
   
},
orgTree:{
    overflow:"visible",
    // height: '64vh',
}
    
});

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    fontFamily: "Lexend Deca",
    fontSize: "14px",
    height: "40px",
  }));

  export const StyledFormControl = styled(FormControl)(({theme})=>({
    width:'100%',
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
  }))