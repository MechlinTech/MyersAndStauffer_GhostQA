import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledFormControl, useStyles } from "./style";
import { Avatar } from "@material-ui/core";
import { StyledTypography } from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserId,
} from "../../../../../redux/actions/authActions";
import TextField from "@mui/material/TextField";
import {
  fetchOrganizationDetail,
  updateOrganizationDetails,
} from "../../../../../redux/actions/userActions";
import CustomeImgView from "./CustomeImgView";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function Organization() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const { organizationDetails, loading } = useSelector((state) => state.user);
  const [description, setDescription] = useState("");
  const [isEditable, setisEditable] = useState(false);
  const [Error, setError] = useState({
    descriptionError: "",
    imageError: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  useEffect(() => {
    if (userId) dispatch(fetchOrganizationDetail(userId));
    else dispatch(getUserId());
  }, [userId]);

  useEffect(() => {
    setDescription(organizationDetails?.Description);
  }, [organizationDetails]);
  // Extracting the name of user
  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleCancel = (err) => {
    setDescription(organizationDetails?.Description);
    setisEditable(false);
  };
  const handleSave = () => {
    const formData = new FormData();
    formData.append("Id", organizationDetails?organizationDetails.Id:0);
    formData.append("UserId", userId);
    formData.append("Description", description);
    formData.append("BinaryData", selectedImage);
    const error = {};
    if (!description.trim()) {
      error.descriptionError = "Description required";
    }
    if (!selectedImage) error.imageError = "Required logo";

    setError(error);
    if (Object.keys(error).length === 0) {
      dispatch(updateOrganizationDetails(formData,userId));
      setisEditable(false);
    } else {
      console.log("some field are empty or not valid");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <Paper elevation={0} className={classes.papercontainer}>
          {loading ? (
            <Box style={{ textAlign: "center" }}>
              <CircularProgress
                style={{ color: "rgb(101, 77, 247)" }}
                size={25}
              />
            </Box>
          ) : (
            <Box sx={{ width: "70%" }}>
              {/* <Box
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
              </Box> */}
              <Paper
                variant="outlined"
                sx={{ padding: "20px", marginBottom: "20px" }}
              >
                <Grid container justifyContent="center" spacing={1}>
                
                  <Grid item xs={12} style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom:'10px'
                }}>
                  <CustomeImgView ScreenshotUrl={organizationDetails?.LogoPath}/>
                  {/* <Avatar
                  style={{ marginRight: "10px", backgroundColor: "#654DF7" }}
                  src="http://65.1.188.67:8010/codeengine/api/test-suitesV2/29/get_file/"
                /> */}
                {/* <Box>
                  <img
                  src="http://65.1.188.67:8010/codeengine/api/test-suitesV2/29/get_file/"
                  className={classes.imgStyle}/>
                </Box> */}
                <Typography fontSize="18px" fontFamily="Lexend Deca">
                  {getName()}
                </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTypography>About</StyledTypography>
                    <StyledFormControl fullWidth>
                      <TextField
                        id="outlined-adornment-name"
                        type="text"
                        multiline={true}
                        rows={3}
                        placeholder="Enter description"
                        disabled={!isEditable}
                        error={Error.descriptionError ? true : false}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setError((prev) => ({
                            ...prev,
                            ["descriptionError"]: "",
                          }));
                        }}
                      />
                    </StyledFormControl>
                    {Error.descriptionError && (
                      <StyledTypography
                        style={{ color: "red", textAlign: "left" }}
                      >
                        Description required
                      </StyledTypography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: isEditable?"flex":'none',
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <StyledTypography variant="subtitle1">
                      {selectedImage ? selectedImage.name : "Choose logo"}
                    </StyledTypography>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      disabled={!isEditable}
                      style={{ display: "none" }}
                      accept="image/jpeg, image/png, image/gif, image/bmp, image/tiff, image/webp, image/x-raw"
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
                        cursor: isEditable ? "pointer" : "not-allowed",
                        display: "inline-block",
                      }}
                    >
                      +
                    </label>
                  </Grid>
                  {Error.imageError  && isEditable && (
                    <Grid item xs={12}>
                      <StyledTypography
                        style={{ color: "red", textAlign: "left" }}
                      >
                        Please select logo
                      </StyledTypography>
                    </Grid>
                  )}
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
