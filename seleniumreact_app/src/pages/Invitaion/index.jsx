import React, { useState } from 'react';
import { Button, Container, Typography, Box, makeStyles } from '@material-ui/core';
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
  },
  text: {
    fontSize: '2rem',
    letterSpacing: '1px',
  },
  btnContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    cursor: 'pointer',
    padding: '8px 13px',
    backgroundColor: '#654df7',
    outline: 'none',
    border: '1px solid #654df7',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#654df7',
      border: '1px solid #654df7',
    },
  },
  reject: {
    backgroundColor: 'rgb(108, 117, 125)',
    border: '1px solid rgb(108, 117, 125)',
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: '#654df7',
      border: '1px solid #654df7',
    },
  },
  acceptMsgBox: {
    padding: '10px',
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    height: '300px',
    width: '230px',
  },
  rejectMsgBox: {
    display: 'none',
  },
}));

const Invitation = () => {
  const classes = useStyles();
  const {toEmail} = useParams()
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
  console.log("email id ", toEmail)
  setAccepted(true);
  };

  const handleReject = () => {
    // Handle reject logic if needed
  };

  return (
    <Container className={classes.container}>
        <Box style={{ display: !accepted ? 'block' : 'none' }}>
      <div className={classes.text}>You are invited</div>
      <Box className={classes.btnContainer}>
        <div className={classes.acceptBox}>
          <Button className={classes.btn} onClick={handleAccept}>
            Accept
          </Button>
        </div>
        <div className={classes.rejectBox} onClick={handleReject}>
          <Button className={`${classes.btn} ${classes.reject}`}>Reject</Button>
        </div>
      </Box>
      </Box>
      <div className={classes.acceptMsgBox} style={{ display: accepted ? 'flex' : 'none' }}>
        <Typography variant="h4">Congratulations! Welcome to Ghost QA</Typography>
        {/* <div className={classes.imgContainer}>
          <img
            src="https://e7.pngegg.com/pngimages/858/743/png-clipart-halloween-ghost-witch-cartoon-happy-ghost-cartoon-character-face-thumbnail.png"
            alt=""
            className={classes.imgContainer}
          />
        </div> */}
        <Typography>Your temporary password is sent on your emailId, Please check.</Typography>
        <Typography>Thank you</Typography>
        <Typography style={{marginTop:'50px'}}>To change password <Link to='/changepassword'>click here</Link></Typography>
      </div>
      <div className={classes.rejectMsgBox}>
        <Typography variant="h6">Thank You</Typography>
      </div>
    </Container>
  );
};

export default Invitation;
