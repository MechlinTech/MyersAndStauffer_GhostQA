import { Typography, makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles({
    main: {
        margin: "20px",
    },
    bodyHeader:{
        borderBottom: "1px solid #DCD9D9",  
        padding: '20px 14px',
    },
    card:{  
        padding: '10px 20px',
    },
    filterButton: {
        margin: "35px 20px 10px",
        backgroundColor: "#40ACFB",
        color: "#FFFFFF",
        // fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "44px",
    },
    paper: {
        border: "1px solid #DCD9D9",
        borderRadius: "10px",
        marginTop: "10px",
        marginRight: "20px",
        marginLeft: "20px",
        cursor: "pointer",
        '&:hover':{
            border:'2px solid rgb(101, 77, 247)'
        }
    },
    paperActive: {
        border: "2px solid rgb(101, 77, 247)",
        borderRadius: "10px",
        marginTop: "10px",
        marginRight: "20px",
        marginLeft: "20px",
        cursor: "pointer",
        backgroundColor: 'rgb(101, 77, 247)'
    },
    activeColor:{
        color:'white',
    },
    infoContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    paperColumn: {
        width: "33.33%",
        marginTop: "20px",
        marginBottom: "20px",
    },
    paperGrid: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    infoGridHeader: {
        width: "100%",
        padding: "10px 10px",
    },
    header: {
        backgroundColor: "#c4c4c4",
        padding: "20px 0px 20px 30px",
    },
    infoHeader: {
        // fontSize:"1 rem",
        //lineHeight: "1.5rem",
        // fontFamily: "Poppins",
        // color: "#000000",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "21px",
        fontFamily: "Lexend Deca",
    },
    divider: {
        margin: "10px ​0 4px 0  !important",
        height: "4px !important",
    },
    searchHeading: {
        // fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "44px",
        color: "#727272",
        marginBottom: "5px",
    },
    savedSerchesClass: {
        backgroundColor: "transparent",
    },
    // remScrollbar:{
    //     '&::-webkit-scrollbar': {
    //         width: '0em'
    //       }
    // },
    infoGrid: {
        height: "345px",
        width: "100%",
        overflowY: "scroll",
        paddingTop: "20px",
        "&::-webkit-scrollbar-track": {
            width: "40px",
            backgroundColor: "rgba(245, 245, 245, 0.75)",
            margin: "15px 0",
            scrollMargin: "20px",
        },
        "&::-webkit-scrollbar": {
            width: "10px",
            margin: "0 20px",
            scrollMargin: "20px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E7E6E6",
            borderRadius: "10px",
            margin: "0 20px",
            scrollMargin: "20px",
        },
    },
    inputField: {
        width:'100%',
        textAlign:'center',
        borderRadius:"4px",
        border:'solid 2px #DADADA'
    },
});

export const useStylesTestCase = makeStyles((theme) => ({
    main: {
        margin: "20px",
        padding: "10px 22px",
    },
    header: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "21px",
        padding: "10px 22px",
        
    },
    button: {
        height: "40px",
        minWidth: "110px",
        display: "flex",
        textTransform: "none !important",
        backgroundColor: "rgb(101, 77, 247)",
        color: "#fff",
    },
    inputError: {
        color: "red",
        textAlign: "left",
        fontSize: "14px !important",
        // paddingLeft: '10px',
    },
    input: {
        display: "flex",
        flexDirection: "row",
    },
    customBackgroung: {
        backgroundColor: "rgb(242, 242, 242)",
        border: "none",
    },
    customheight: {
        height: "40px",
    },
    customFontSize: {
        fontSize: "14px !important",
    },
    textField: {
        "& .MuiOutlinedInput-root": {
            borderColor: "transparent !important",
            "&:hover fieldset": {
                borderColor: "#654DF7",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#654DF7",
            },
        },
    },
    label: {
        alignSelf: "center",
        padding: "10px 10px",
    },
    ButtonContainer: {
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        padding: "10px",
        // borderTop: "1px solid #ccc",
        gap: "8px",
    },
    highlight: {
        fontSize: "24px",
        fontWeight: "400",
        color: "rgb(56, 56, 56)"
    }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    fontFamily: 'Lexend Deca',
    fontSize:'14px'
    // Add other styles as needed
  }));
