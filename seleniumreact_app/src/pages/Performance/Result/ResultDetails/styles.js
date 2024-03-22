import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    theadFont: {
        fontSize: '14px'
    },
    tbodyFont: {
        fontSize: '12px'
    },
    mainContainer: {
        margin: "5px 20px",
    },
    hederStyle: {
        background: "#f1f1f1",
        height: "30%",
        display: "flex",
        alignItems: "center",
    },
    headrRightSite: {
        background: "#f1f1f1",
        height: "14%",
        display: "flex",
        alignItems: "center",
    },
    cardfontSize: {
        fontSize: "14px",
        lineHeight: "1rem",
    },
    chipLabelStyle: {
        fontSize: "12px",
        fontWeight: "400",
        fontFamily: "Lexend Deca",
    },
    centeredVideo: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        outline: "none",
        padding: "10px 10px 10px 20px",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
    },
    hoverPointer: {
        cursor: "pointer",
        "&:hover": {
            border: "2px solid #654DF7",
            cursor: "pointer",
        },
    },
    activeRow: {
        border: "2px solid #654DF7",
    },
    breadCrumbHead: {
        background: "#f1f1f1",
        padding: "10px",
        borderRadius: '5px',
        marginBottom: '10px'
    },
    breadCrumbStyle: {
        textDecoration: 'none',
        color: 'black',
        fontSize: '14px',
        position: 'relative',
        '&:hover': {
            cursor: 'pointer'
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '4px',
            background: 'rgb(101, 77, 247)',
            bottom: -3,
            left: 0,
            transform: 'scaleX(0)',
            transformOrigin: 'bottom left',
            transition: 'transform 0.3s ease',
        },
        '&:hover::after': {
            transform: 'scaleX(1)',
        },
    },
    backBtn: {
        background: 'rgb(101, 77, 247)',
        padding: '10px 15px',
        color: 'white',
        textTransform: 'none',
        fontSize: '14px !important',
        '&:hover': {
            background: 'rgb(101, 77, 247)',
        }
    },
    CustomfontSize: {
        fontSize: '18px !important',
    },
    fontSize50: {
        fontSize: '50px !important',
    }

});