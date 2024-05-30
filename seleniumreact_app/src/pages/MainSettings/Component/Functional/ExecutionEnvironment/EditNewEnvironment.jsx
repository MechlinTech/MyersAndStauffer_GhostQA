import React, { useState ,useEffect} from "react";
import { useStyles } from "./styles";
import clsx from "clsx";
import Select from "react-select";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  OutlinedInput,
  Box,
  Card,
} from "@mui/material";
import { useDispatch ,useSelector} from "react-redux";
// import { AddUpdateEnvironment } from "../../../../redux/actions/settingAction";
// import { GetApplication, GetBrowser } from "../../../../redux/actions/seleniumAction";
import { useNavigate } from "react-router-dom";
import { AddUpdateEnvironment } from "../../../../../redux/actions/settingAction";
import { GetApplication,GetBrowser } from "../../../../../redux/actions/seleniumAction";

export default function EditNewEnvironment({ onBack ,rowData}) {
   
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [selectedApplication, setSelectedApplication] = useState(() => {
    return rowData
      ? { value: rowData.ApplicationId, label: rowData.ApplicationName }
      : null;
  });
  const [selectedBrowser, setSelectedBrowser] = useState(() => {
    return rowData
      ? { value: rowData.BrowserId, label: rowData.BrowserName }
      : null;
  });
  
  const { applicationList,  browserList,  } =useSelector((state) => state.selenium);

  useEffect(() => {
    dispatch(GetApplication());
    dispatch(GetBrowser());
   
  }, []);
  useEffect(() => {
    if (rowData) {
      setSelectedApplication({
        value: rowData.ApplicationId,
        label: rowData.ApplicationName,
      });
    }
  }, [rowData]);
  const classes = useStyles();
  
  const [formData, setFormData] = useState({
    environmentName: rowData ? rowData.EnvironmentName : "",
    Description: rowData ? rowData.Description : "",
    selectedApplication: rowData ? rowData.ApplicationName : null,
    Baseurl: rowData ? rowData.Baseurl : "",
    DriverPath: rowData ? rowData.DriverPath : "",
    BasePath: rowData ? rowData.BasePath : "",
    selectedBrowser: rowData ? rowData.BrowserName : null,
    ApplicationId:rowData?rowData.ApplicationId:0,
    BrowserId:rowData?rowData.BroswerId:0
  });
  const [Error, setError] = useState({
    name: "",
    description: "",
    application: "",
    baseUrl: "",
    driverPath: "",
    basePath: "",
    browser:"",
  });
  const applicationOptions = applicationList.map((app) => ({
    value: app.ApplicationId,
    label: app.ApplicationName,
  }));
  const browserOptions = browserList.map((app) => ({
    value: app.BrowserId,
    label: app.BrowserName,
  }));
  const handleSubmit = () => {
    let payload = {
      environmentId:rowData.EnvironmentId,
      applicationId:formData.ApplicationId,
      broswerId:formData.BrowserId,
      environmentName: formData.environmentName,
      description: formData.Description,
      applicationName:formData.selectedApplication,
      browserName:formData.selectedBrowser,
      driverPath:formData.DriverPath,
      basePath:formData.BasePath,
      baseurl:formData.Baseurl
    }
    // Check if there are any errors
    
    let error = {};
    if (!formData.environmentName.trim()) {
      error.name = "Environment Name is required";
    }
    if (!formData.selectedApplication) {
      error.application = "Application is required";
    }
    if (!formData.selectedBrowser) {
      error.browser = "Browser is required";
    }
    if (!formData.Description) {
      error.description = "Description is required";
    }
    if (!formData.Baseurl) {
      error.baseUrl = "Base Url is required";
    }
    if (!formData.DriverPath) {
      error.driverPath = "Driver Path is required";
    }
    if (!formData.BasePath) {
      error.basePath = "Base Path is required";
    }
    // Update error state
    setError(error);
      // Check if there are any errors
    if (Object.keys(error).length === 0) {
      // Proceed with form submission
      dispatch(AddUpdateEnvironment(payload,navigate,onBack));
      // navigate('/settings/environment')
    }

    
  };
  

  const handleFieldChange = (fieldName, value) => {
    // If changing selectedApplication, update both selectedApplication state and ApplicationId in formData
    if (fieldName === "selectedApplication") {
      const selectedApp = applicationOptions.find(app => app.label === value);
      setFormData({
        ...formData,
        selectedApplication: value,
        ApplicationId: selectedApp ? selectedApp.value : 0 // Update ApplicationId based on selected label
      });
    } 
    // If changing selectedBrowser, update both selectedBrowser state and BrowserId in formData
    else if (fieldName === "selectedBrowser") {
      const selectedBrw = browserOptions.find(brw => brw.label === value);
      setFormData({
        ...formData,
        selectedBrowser: value,
        BrowserId: selectedBrw ? selectedBrw.value : 0 // Update BrowserId based on selected label
      });
    }
    else {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };
  
  const selectStyle={
    container: (provided) => ({
      ...provided,
      backgroundColor: "rgb(242, 242, 242)",
      zIndex: 999, // Adjust the zIndex value
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(242, 242, 242)",
      "&:hover": {
        borderColor: "#654DF7",
      },
      borderColor: Error.application || Error.browser
        ? "red"
        : state.isFocused
        ? "#654DF7"
        : "rgb(242, 242, 242)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#654DF7"
        : "transparent",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      cursor: 'pointer',
      ':hover': {
        color: '#654DF7', // Change the color on hover if desired
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: 'pointer',
      ':hover': {
        color: '#654DF7', // Change the color on hover if desired
      },
    }),
  } 
  return (
    <>
      <Grid
        container
        className={classes.main}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6} className={classes.header}>
        <div className={classes.highlight}>Edit Environment</div>
        </Grid>
       
      </Grid>

      {/* Body */}
      <Grid container style={{ padding: "10px" }}>
        <Card style={{ width: "100%", padding: "10px" }}>
          <Grid container>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Environment Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl
                  fullWidth
                  className={clsx(classes.textField)}
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
                    height: "40px",
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    fullWidth
                    error={Error.name ? true : false}
                    value={formData.environmentName} // Update this line
                     onChange={(e) =>
                    handleFieldChange("environmentName", e.target.value)
                     }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Environment Description
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl
                  fullWidth
                  className={clsx(classes.textField)}
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
                    height: "40px",
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    fullWidth
                    error={Error.description ? true : false}
                    value={formData.Description}
                    onChange={(e) =>
                      handleFieldChange("Description", e.target.value)
                    }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Application
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Select
               options={applicationOptions}
               value={selectedApplication}
               isClearable={true}
               onChange={(newValue) => {
                setSelectedApplication(newValue); // Update selectedApplication state
                handleFieldChange("selectedApplication", newValue?.label);
                
              }}
                  styles={selectStyle}
                  menuPosition={"fixed"}
                />
              </Grid>
            </Grid>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Browser
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Select
                  options={browserOptions}
                  value={selectedBrowser}
                  isClearable={true}
                  onChange={(newValue) => {
                    setSelectedBrowser(newValue); 
                    handleFieldChange("selectedBrowser", newValue?.label);
                  }}
                  styles={selectStyle}
                  menuPosition={"fixed"}
                />
              </Grid>
            </Grid>
            
          </Grid>
          <Grid container>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Driver Path
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl
                  fullWidth
                  className={clsx(classes.textField)}
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
                    height: "40px",
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    fullWidth
                    error={Error.driverPath ? true : false}
                    value={formData.DriverPath} // Update this line
                    onChange={(e) =>
                      handleFieldChange("DriverPath", e.target.value) // Update this line
                    }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Base Path
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl
                  fullWidth
                  className={clsx(classes.textField)}
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
                    height: "40px",
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    fullWidth
                    value={formData.BasePath} // Update this line
                    error={Error.basePath ? true : false}
                    onChange={(e) =>
                      handleFieldChange("BasePath", e.target.value) // Update this line
                    }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
          <Grid container xs={6}>
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className={clsx(classes.customFontSize, classes.label)}
                >
                  Base Url
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl
                  fullWidth
                  className={clsx(classes.textField)}
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
                    height: "40px",
                  }}
                >
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    fullWidth
                    value={formData.Baseurl} 
                    error={Error.baseUrl ? true : false}
                    onChange={(e) =>
                    handleFieldChange("Baseurl", e.target.value) 
                      }
                    className={clsx(
                      classes.customheight,
                      classes.customFontSize,
                      classes.customBackgroung
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
           
            
           
          </Grid>
        </Card>
      </Grid>

      {/* Footer */}
      <Grid container>
        <Grid item xs={12}>
          <Box style={{}} className={classes.ButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={()=> onBack()}
              sx={{
                backgroundColor: "rgb(101, 77, 247)",
                "&:hover": {
                  backgroundColor: "rgb(101, 77, 247)",
                  borderColor: "#654DF7",
                },
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
}