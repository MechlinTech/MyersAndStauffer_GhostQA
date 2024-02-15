import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    modalContent: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
        outline: "none",
        width: "80%",
        maxWidth: "500px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc",
    },
    body: {
        display: "grid !important",
        gridTemplateRows: "auto",
        rowGap: "20px",
        padding: "20px",
        gridTemplateColumns: "1fr", // Use one column for each item
    },
    input: {
        display: "flex",
        flexDirection: "column",
    },
    footer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderTop: "1px solid #ccc",
        gap: "8px",
    },
    button: {
        height: "40px",
        minWidth: "110px",
        display: "flex",
        textTransform: "none !important",
    },
    form: {
        marginTop: theme.spacing(2),
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
        fontSize: '14px'
    },
    select: {
        control: (base, state) => ({
            ...base,
            boxShadow: 'red',
            borderColor: "rgb(101, 77, 247)",
        }),
        indicatorsContainer: (base) => ({
            ...base,
            borderRight: 0,
        }),
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
    customheight: {
        height: "40px",
    },
    customFontSize: {
        fontSize: '14px !important',
    },
    customBackgroung: {
        backgroundColor: 'rgb(242, 242, 242)',
        border: '0px !important'
    },
    radioButtonLabel: {
        fontSize: '14px',
        display: 'inline-block'
    }
}));

export default useStyles;