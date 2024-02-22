import { makeStyles } from "@material-ui/core";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
    main: {
        margin: "20px",
    },
    body: {
        display: "grid !important",
        gridTemplateRows: "auto",
        rowGap: "20px",
        padding: "0px 11px",
        gridTemplateColumns: "1fr",
    },
    input: {
        display: "flex",
        flexDirection: "column",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        padding: "10px",
        // borderTop: "1px solid #ccc",
        gap: "8px",
    },
    button: {
        height: "40px",
        minWidth: "110px",
        display: "flex",
        textTransform: "none !important",
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    radioLabel: {
        marginRight: theme.spacing(2),
        "& .Mui-checked": {
            color: "rgb(101, 77, 247)",
        },
        fontSize: "14px",
    },
    select: {
        "& .MuiOutlinedInput-input": {
            backgroundColor: "red", // Background color
        },
        "& .MuiSelect-outlined": {
            "&:hover": {
                borderColor: "red", // Hover border color
            },
            "&.Mui-focused": {
                borderColor: "green !important", // Active border color
            },
        },
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
    textarea: {
        border: '1px solid red',
        '&:hover, &:focus, &.Mui-focused': {
            border: '1px solid #654DF7',
        },
        minHeight: '14vh',
        padding: '10px',
        resize: 'none', // Optional: Disable textarea resizing
    },
    customheight: {
        height: "40px",
    },
    customFontSize: {
        fontSize: "14px !important",
    },
    customBackgroung: {
        backgroundColor: "rgb(242, 242, 242)",
        border: 'none',
    },
    radioButtonLabel: {
        fontSize: "14px !important",
        display: "inline-block",
    },
    sideBar: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "21px",
        padding: "10px 22px",
        // textAlign: 'center'
    },
    inputError: {
        color: "red",
        textAlign: 'left',
        fontSize: '14px !important',
        // paddingLeft: '10px',
    },
    testCaseErrorStyle:{
        color:'red',
        textAlign:'right',
        margin:'10px 30px 10px 0'
    },
}));
export default useStyles;

export const useTableStyles = makeStyles((theme) => ({
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(242, 242, 242)",
        color: "#5c5c5c",
        padding: "0px 20px",
        fontFamily: "Lexend Deca",
        fontSize: "12px",
        borderTop: "1px solid rgb(217, 217, 217)",
        lineHeight: "18px",
    },
    [`&.${tableCellClasses.body}`]: {
        // backgroundColor: "#fdfdfd",
        //  padding: "2rem 10px",
        // maxHeight: "20px",
        padding: "0px 20px",
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "normal",
        fontFamily: `"Lexend Deca", sans-serif, -apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    },
}));