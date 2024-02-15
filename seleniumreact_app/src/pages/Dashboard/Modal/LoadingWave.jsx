import React from "react";
import  useStyles  from "./styles";
import Modal from "@material-ui/core/Modal";
import { Box, Typography } from "@mui/material";
const LoadingWave = ({ open, onClose, suiteName }) => {
  const classes = useStyles()
  console.log(suiteName)
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
        <Box className={classes.waveContainer}>
        {[...Array(10)].map((_, index) => (
          <Box key={index} className={`${classes.wave} ${classes[`wave${index + 1}`]}`}></Box>
        ))}
      </Box>
      </Box>
    </Box>
    </Modal>
  );
};

export default LoadingWave;