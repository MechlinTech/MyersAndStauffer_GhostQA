import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  main: {
    margin: "20px",
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
  },
  paperActive: {
    border: "2px solid rgb(101, 77, 247)",
    borderRadius: "10px",
    marginTop: "10px",
    marginRight: "20px",
    marginLeft: "20px",
    cursor: "pointer",
    color: "rgb(101, 77, 247)",
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
  infoGrid: {
    height: "345px",
    width: "100%",
    overflowY: " scroll",
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
    color: "#000000",
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
});
