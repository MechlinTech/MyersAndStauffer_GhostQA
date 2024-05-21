import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(2),
  },
  paper: {
    border: "1px solid #DCD9D9",
    borderRadius: "10px",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: "pointer",
    transition: "border 0.3s ease",
    "&:hover": {
      border: "2px solid #654DF7",
    },
  },
  paperActive: {
    border: "2px solid #654DF7",
    borderRadius: "10px",
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    backgroundColor: "#654DF7",
    color: theme.palette.common.white,
  },
  icon: {
    color: "#8a8fa7",
    marginRight: theme.spacing(1),
  },
  paperGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  infoHeader: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    fontFamily: "Lexend Deca",
    color: theme.palette.text.primary,
  },
  infoHeaderActive: {
    color: theme.palette.common.white,
  },
  expandButton: {
    cursor: "pointer",
  },
  subMenu: {
    width:'85%',
  },
  linkStyle: {
    textDecoration: "none",
  },
  subPaper: {
    padding: "5px",
  },
}));
