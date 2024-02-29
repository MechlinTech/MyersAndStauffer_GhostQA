import { Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { StyledOutlinedInput, StyledTypography, useStyles } from './style';
import { Button, FormControl } from '@mui/material';
import { useDispatch } from "react-redux";
import { InviteUser } from "../../redux/actions/authActions";
import { CustomTable } from './CustomTable';
import SearchField from '../../comman/SearchField';

export default function Users() {
    const classes = useStyles()
    const dispatch = useDispatch()
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("")
  const [Error, setError] = useState({
    emailError:""
  })
 
  const handleInvite = () => {
    let error = {}
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim())
            error.emailError = "email required"
        setIsEmailValid(emailRegex.test(email))
        if (!isEmailValid) 
        error.emailError="Enter a valid email"
        setError(error)
        if ((Object.keys(error).length === 0) ) {
            
            setEmail("");
            dispatch(InviteUser(email));
        }
      };

    //   xs: 0px (extra-small)
    //   sm: 600px (small)
    //   md: 960px (medium)
    //   lg: 1280px (large)
    //   xl: 1920px (extra-large)
      const users = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
        { name: 'Alice Smith', email: 'alice@example.com' },
        // Add more users as needed
      ];

      const userList = users?.filter((user) =>
    user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  return (
    <div>
        <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} lg={10}>
                <Grid container spacing={1} justifyContent='space-around' alignItems='center'>
                <Grid item xs={12} md={2}>
                  <StyledTypography variant="subtitle1">
                    Type E-mail to invite
                  </StyledTypography>
                </Grid>
                <Grid item xs={12} md={8}>
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
                    className={classes.btn}
                  >
                    <StyledOutlinedInput
                      id="outlined-adornment-name"
                      type="email"
                      placeholder="Enter your email to invite"
                      error={Error.emailError ? true : false}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError({ ...Error, ["emailError"]: "" });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4} md={1} style={{ alignSelf: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInvite}
                    sx={{
                      backgroundColor: "rgb(101, 77, 247)",
                      height: "38px",
                      "&:hover": {
                        backgroundColor: "rgb(101, 77, 247)",
                        borderColor: "#654DF7",
                      },
                    }}
                  >
                    Invite
                  </Button>
                </Grid>
                </Grid>
                <Paper style={{marginTop:'40px'}}>
                <Grid item style={{ margin: "8px 20px" }}>
                <SearchField
                  placeholder="Search application..."
                  onChange={(value) => setSearchTerm(value)}
                />
              </Grid>
                    <CustomTable users={userList}/>
                </Paper>
            </Grid>
        
        </Grid>
    </div>
  )
}
