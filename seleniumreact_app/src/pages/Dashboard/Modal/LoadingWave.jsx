import React from "react";
import  useStyles  from "./styles";
import Modal from "@material-ui/core/Modal";
import { Box, Typography } from "@mui/material";
import ghostLogo from "./ghost.gif"
const LoadingWave = ({ open, onClose, suiteName }) => {
  const classes = useStyles()
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className={classes.body}>
      <Box className={classes.center}>
        <Box className={classes.text}>
          <h3 className={classes.header}>executing</h3>
          <span>{suiteName}</span>
        </Box>
        <Box>
        <img src={ghostLogo} alt="" height='200px' width='500px'/>
        </Box> 
      </Box>
    </Box>
    </Modal>
  );
};

export default LoadingWave;