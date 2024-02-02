import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
linkStyle:{
    textDecoration: 'none',
    color: 'black',
    fontWeight: '400',
    fontSize:'1.1rem',
    position: 'relative',
    background:'#fafafa',
    '&:hover':{
      background:'#fafafa',
      color:'rgb(101, 77, 247)'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '4px',
      background: 'rgb(101, 77, 247)',
      bottom: -10,
      left: 0,
      transform: 'scaleX(0)',
      transformOrigin: 'bottom left',
      transition: 'transform 0.3s ease',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
  },
  activeLink: {
    // color: 'rgb(101, 77, 247)',
    '&::after': {
      transform: 'scaleX(1)', // Scale to show the line for active link
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "20px",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("sm")]: {
      //    paddingLeft: "10px",
      justifyContent: "center",
      minHeight: "70px",
    },
  },
}))