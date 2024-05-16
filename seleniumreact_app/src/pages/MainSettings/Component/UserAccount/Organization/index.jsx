import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTextBox, useStyles } from "./style";
import { Avatar } from "@material-ui/core";
import { StyledTypography, StyledOutlinedInput } from "./style";
import { useDispatch } from "react-redux";
import axios from "axios";
import { UpdateUserProfile } from "../../../../../redux/actions/authActions";
import TextField from '@mui/material/TextField';

import { getBaseUrl } from "../../../../../utils/configService";
import { header } from "../../../../../utils/authheader";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function Organization() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [description, setDescription] = useState("");
  const [isEditable, setisEditable] = useState(false);
  const [Error, setError] = useState({
    nameError: "",
    emailError: "",
    organizationNameError: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
//   useEffect(() => {
//     const emailFromSession = sessionStorage.getItem("email");
//     const updateUserByEmail = async () => {
//       try {
//         const BASE_URL = await getBaseUrl();
//         const res = await axios.post(
//           `${BASE_URL}/Selenium/GetProfilByEmail?Email=${emailFromSession}`,
//           emailFromSession,
//           header()
//         );
//         setuser(res.data);
//         setEmail(res.data?.Email || "");
//         setfullName(res.data?.FullName || "");
//         setorganizationName(res.data?.OrganizationName || "");
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     updateUserByEmail();
//   }, []);
  // Extracting the name of user
  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleCancel = (err) => {
    console.log("res.data", user);

    // setEmail(user?.Email || "");
    setisEditable(false);
  };
  const handleSave = () => {
    const payload = {
      id: user?.Id,
      description
    };
    let error = {};
    setError(error);
    if (Object.keys(error).length === 0) {
      dispatch(UpdateUserProfile(payload));
      setisEditable(false);
    } else {
      console.log("some field are empty or not valid");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <Paper elevation={0} className={classes.papercontainer}>
          {true && (
            <Box sx={{ width: "70%" }}>
              <Box
                m={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{ marginRight: "10px", backgroundColor: "#654DF7" }}
                  src=""
                />
                <Typography fontSize="18px" fontFamily="Lexend Deca">
                  {getName()}
                </Typography>
              </Box>
              <Paper
                variant="outlined"
                sx={{ padding: "20px", marginBottom: "20px" }}
              >
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={12}>
                    <StyledTypography>About</StyledTypography>
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
                      <TextField
                        id="outlined-adornment-name"
                        type="text"
                        placeholder="Enter description"
                        disabled={!isEditable}
                        error={Error.nameError ? true : false}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setError((prev) => ({ ...prev, ["nameError"]: "" }));
                        }}

                        // sx={{ backgroundColor: "rgb(242, 242, 242)",fontFamily:'Lexend Deca',fontWeight:'400', height:'40px'}}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
                    <StyledTypography variant="subtitle1">
                      {selectedFile?selectedFile.name:'Choose logo'}
                    </StyledTypography>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      disabled={!isEditable}
                      style={{ display: "none" }}
                      id="logoupload"
                    />
                    {/* Button to trigger the file input */}
                    <label
                      htmlFor="logoupload"
                      style={{
                        borderRadius: "3px",
                        padding: "0px 2px",
                        fontSize: 25,
                        // backgroundColor: "rgb(101, 77, 247)",
                        color: "rgb(101, 77, 247)",
                        cursor: isEditable?"pointer":"not-allowed",
                        display: "inline-block",
                      }}
                    >
                      +
                    </label>
                  </Grid>
                </Grid>
                <Box
                  mt={8}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  {isEditable ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={() => setisEditable(false)}
                        onClick={handleCancel}
                        sx={{
                          backgroundColor: "rgb(108, 117, 125)",
                          color: "#f1f1f1",
                          "&:hover": {
                            backgroundColor: "rgb(101, 77, 247)",
                          },
                          marginRight: "10px",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{
                          backgroundColor: "rgb(101, 77, 247)",
                          "&:hover": {
                            backgroundColor: "rgb(101, 77, 247)",
                            borderColor: "#654DF7",
                          },
                        }}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)}
                        sx={{
                          backgroundColor: "rgb(108, 117, 125)",
                          color: "#f1f1f1",
                          "&:hover": {
                            backgroundColor: "rgb(101, 77, 247)",
                          },
                          marginRight: "10px",
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setisEditable(true)}
                        sx={{
                          backgroundColor: "rgb(101, 77, 247)",
                          "&:hover": {
                            backgroundColor: "rgb(101, 77, 247)",
                            borderColor: "#654DF7",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Box>
              </Paper>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
