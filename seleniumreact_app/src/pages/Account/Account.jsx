import React, {useState} from 'react'
import {  Button, Grid, Paper, Typography, FormControl, OutlinedInput, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Account() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = (e) => {
    // Implement your logic for sending the invitation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
    console.log('is valid ',isEmailValid)
    setEmail('');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="80vh">
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" align="left" gutterBottom>
          Invite new members
        </Typography>
        <FormControl
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#654DF7",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#654DF7",
                      },
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="email"
                    placeholder="Enter your email"
                    fullWidth
                    error={!isEmailValid}
                    value={email}
                    onChange={handleEmailChange}
                    sx={{backgroundColor: "rgb(242, 242, 242)",margin:'20px 0'}}
                  />
                </FormControl>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'end'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>navigate(-1)}
              sx={{
                backgroundColor: "rgb(108, 117, 125)",
                color: "#f1f1f1",
                '&:hover':{
                  backgroundColor:'rgb(101, 77, 247)'
                },
                marginRight:'10px'
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleInvite}
              sx={{
                backgroundColor: "rgb(101, 77, 247)",
                "&:hover": {
                  backgroundColor: "rgb(101, 77, 247)",
                  borderColor: "#654DF7",
                },
              }}
            >
              Invite
            </Button>
          </Box>
      </Paper>
    </Grid>
  </Grid>
  )
}
