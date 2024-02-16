
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  customLoaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  customCircularProgress: {
    border: `3px solid #654DF7`, 
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    width: '50px', 
    height: '50px', 
    animation: '$spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const Load = () => {
  const classes = useStyles();

  return (
    <div className={classes.customLoaderContainer}>
      <div className={classes.customCircularProgress}></div>
    </div>
  );
};

export default Load;
