import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  OutlinedInput,
  FormControl,
  IconButton,
  Button,
  Typography,
  FormControlLabel,
  Grid,
  Box,
  Card,
  Checkbox,
  TextField,
} from "@mui/material";
import useStyles from "./styles";
import clsx from "clsx";
import Select from "react-select";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { TestCaseTable } from "./TestCaseTable";
import SearchField from "../../comman/SearchField";
import { useDispatch } from "react-redux";
import {
  GetApplication,
  GetEnvironment,
  GetTestCases,
  AddUpdateTestSuites,
} from "../../redux/actions/seleniumAction";


export default function AddTestSuite() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetApplication());
    dispatch(GetEnvironment());
    // dispatch(GetBrowser());
    dispatch(GetTestCases());
  }, []);
  const classes = useStyles();
  const navigate = useNavigate()
  const [selectedSuiteValue, setSelectedSuiteValue] = useState("custom-Suites");
  const [selectedRecepentValue, setSelectedRecepentValue] =
    useState("only-for-me");
  const [name, setName] = useState("");
  const { applicationList, environementList, browserList, testCasesList } =
    useSelector((state) => state.selenium);

  // console.log("environment",environementList)
  // console.log("browser",browserList)
  // console.log("testcases",testCasesList)
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [selectedBrowser, setSelectedBrowser] = useState(null);
  const [description, setDescription] = useState("");
  const [Error, setError] = useState({
    name: "",
    application: "",
    environment: "",
    browser: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleRadioChange = (event) => {
    setSelectedSuiteValue(event.target.value);
  };

  const handleRadioChangeRecepent = (event) => {
    setSelectedRecepentValue(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleApplication = (env)=>{
   const app =  {
    ApplicationId:env.ApplicationId,
    ApplicationName:env.ApplicationName
  }
  console.log('app ',app)
  setSelectedApplication(app)
  }
  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const testCaseNameExtract = (testcases)=>{
  //   const arr = []
  //   for(obj test : testcases){
  //       arr.push(test.TestCaseName)
  //   }
  // }

  const getTestcaseNameOnly = ()=>{
    let testCaseArrName = []
    selectedRows.map((testCase) => testCaseArrName.push(testCase.TestCaseName))
    // .join(",");

    return testCaseArrName
  }

  const handleSubmit = (action) => {
    const testCaseNames= getTestcaseNameOnly()
    let payload = {
      TestSuiteName: name,
      Description: description,
      TestSuiteId: 0,
      TestSuiteType: selectedSuiteValue,
      ApplicationId: selectedApplication?.ApplicationId,
      SendEmail: selectedRecepentValue === "only-for-me" ? true : false,
      EnvironmentId: selectedEnvironment?.EnvironmentId,
      // browser: selectedBrowser.BrowserId,
      SelectedTestCases: testCaseNames,
      AllTestCases:[
        {
          "disabled": true,
          "group": {
            "disabled": true,
            "name": "string"
          },
          "selected": true,
          "text": "string",
          "value": "string"
        }
      ]
    };
    let error = {};
    if (!name.trim()) {
      error.name = "Name is required";
    }
    if (!selectedApplication) {
      error.application = "Application is required";
    }
    if (!selectedEnvironment) {
      error.environment = "Environment is required";
    }
    // if (!selectedBrowser) {
    //   error.browser = "Browser is required";
    // }
    if (!description) {
      error.description = "Description is required";
    }
    // Update error state
    setError(error);

    // Check if there are any errors
    if (Object.keys(error).length === 0) {
      // Proceed with form submission
      console.log("no error ", payload);
      dispatch(AddUpdateTestSuites(payload,action))
      navigate('/')
    }else
    console.log("handleSubmit error", error, payload);
  };

  const handleCheckboxChange = (event, row) => {
    const checked = event.target.checked;
    console.log("checked : ",checked)
    console.log("rows : ",selectedRows)
    setSelectedRows((prevSelectedRows) =>
      checked
        ? [...prevSelectedRows, row]
        : prevSelectedRows.filter((selectedRow) => selectedRow !== row)
    );
  };

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setSelectedRows(checked ? testCasesList : []);
  };

  const filteredTestCaseData = testCasesList.filter((data) =>
    data?.TestCaseName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <>
      <div className={classes.main}>
        <Grid container style={{ height: "100vh" }}>
          {/* First Section */}
          <Grid item xs={12} sm={4}>
            {/* Left Section Part 1 */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card style={{ height: "38vh" }}>
                  <Box className={classes.sideBar}>New Suite</Box>
                  <div
                    style={{
                      // overflow: "auto",
                      // maxHeight: "calc(35vh - 50px)",
                      padding: "0px 12px",
                    }}
                  >
                    <Grid container className={classes.body}>
                      {/* Row 1: Name Input Field */}
                      <Grid item>
                        <div className={classes.input}>
                          <Typography
                            variant="subtitle1"
                            className={clsx(classes.customFontSize)}
                          >
                            Name:
                          </Typography>
                          <FormControl
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
                                  borderColor: "transparent ",
                                },
                              },
                              height: "40px",
                            }}
                          >
                            <OutlinedInput
                              id="outlined-adornment-name"
                              type="text"
                              placeholder="Enter your name"
                              value={name}
                              error={Error.name ? true : false}
                              onChange={handleNameChange}
                              className={clsx(
                                classes.customheight,
                                classes.customFontSize,
                                classes.customBackgroung
                              )}
                            />
                          </FormControl>
                          {Error.name && (
                            <Typography className={classes.inputError}>
                              {Error.name}
                            </Typography>
                          )}
                        </div>
                      </Grid>

                      {/* Row 2: Test Description Input Field */}
                      <Grid item>
                        <div className={classes.input}>
                          <Typography
                            variant="subtitle1"
                            className={clsx(classes.customFontSize)}
                          >
                            Description:
                          </Typography>
                          <FormControl
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
                                  borderColor: "transparent ",
                                },
                              },
                            }}
                          >
                            <OutlinedInput
                              id="outlined-adornment-name"
                              variant="outlined"
                              multiline
                              rows={2}
                              className={clsx(
                                classes.customFontSize,
                                classes.customBackgroung
                              )}
                              error={Error.description ? true : false}
                              placeholder="Enter description.."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              InputProps={{
                                sx: {
                                  "&:hover fieldset": {
                                    borderColor: "#654DF7",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#654DF7 !important",
                                  },
                                },
                              }}
                            />
                          </FormControl>
                          {Error.description && (
                            <Typography className={classes.inputError}>
                              {Error.description}
                            </Typography>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Card>
              </Grid>
            </Grid>
            {/* Left Section Part 2 */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card style={{ minHeight: "42vh" }}>
                  <Box className={classes.sideBar}>Run Settings</Box>

                  <div
                    // style={{ overflow: "auto", maxHeight: "calc(42vh - 50px)" }}
                    style={{ padding: "10px 0px" }}
                  >
                    {/* Your existing content */}
                    <Grid container className={classes.body}>
                      <Grid container className={classes.body}>
                        {/* Row 1: Radio Buttons */}
                        <Grid item>
                          <FormControl
                            component="fieldset"
                            className={classes.radioGroup}
                          >
                            <RadioGroup
                              aria-label="options"
                              name="options"
                              value={selectedSuiteValue}
                              onChange={handleRadioChange}
                              row
                            >
                              <FormControlLabel
                                value="custom-Suites"
                                control={<Radio />}
                                label={
                                  <Typography
                                    variant="body1"
                                    className={classes.radioButtonLabel}
                                  >
                                    Custom Suites
                                  </Typography>
                                }
                                className={clsx(
                                  classes.radioLabel,
                                  classes.customFontSize
                                )}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>

                        {/* Row 3: Additional Name Dropdown */}
                        <Grid item>
                          <div className={classes.input}>
                            <Typography
                              variant="subtitle1"
                              className={clsx(classes.customFontSize)}
                            >
                              Environment
                            </Typography>
                            <Select
                              getOptionLabel={(option) =>
                                option.EnvironmentName
                              }
                              getOptionValue={(option) => option.EnvironmentId}
                              options={environementList}
                              value={selectedEnvironment}
                              onChange={(newValue) =>{
                                setSelectedEnvironment(newValue)
                                handleApplication(newValue)}
                              }
                              styles={{
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
                                  borderColor: Error.environment
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
                              }}
                              menuPosition={"fixed"} // Set menuPosition to fixed
                            />
                            {Error.environment && (
                              <Typography className={classes.inputError}>
                                {Error.environment}
                              </Typography>
                            )}
                          </div>
                        </Grid>
                        {/* Row 4: Radio Buttons */}
                        <Grid
                          container
                          alignItems="center"
                          sx={{ display: "grid" }}
                        >
                          <Grid item>
                            <Typography className={classes.customFontSize}>
                              Email Recipient
                            </Typography>
                          </Grid>
                          <Grid item>
                            <FormControl
                              component="fieldset"
                              className={classes.radioGroup}
                            >
                              <RadioGroup
                                aria-label="options"
                                name="options"
                                value={selectedRecepentValue}
                                onChange={handleRadioChangeRecepent}
                                row
                              >
                                <FormControlLabel
                                  value="only-for-me"
                                  control={<Radio />}
                                  label={
                                    <Typography
                                      variant="body1"
                                      className={classes.radioButtonLabel}
                                    >
                                      Only for me
                                    </Typography>
                                  }
                                  className={clsx(
                                    classes.radioLabel,
                                    classes.customFontSize
                                  )}
                                />
                                <FormControlLabel
                                  value="all-users"
                                  control={<Radio />}
                                  label={
                                    <Typography
                                      variant="body1"
                                      className={classes.radioButtonLabel}
                                    >
                                      All users
                                    </Typography>
                                  }
                                  className={classes.radioLabel}
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </Grid>

                        {/* Row 5: Environment Dropdown */}
                        <Grid item>
                          <div className={classes.input}>
                            <Typography
                              variant="subtitle1"
                              className={clsx(classes.customFontSize)}
                            >
                              Application
                            </Typography>
                            <Select
                              getOptionLabel={(option) =>
                                option.ApplicationName
                              }
                              getOptionValue={(option) => option.ApplicationId}
                              options={applicationList}
                              value={selectedApplication}
                              // onChange={(newValue) => {
                              //   setSelectedApplication(newValue);
                              // }}
                              onChange={selectedApplication}
                              styles={{
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
                                  borderColor: Error.application
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
                              }}
                              menuPosition={"fixed"} // Set menuPosition to fixed
                            />
                            {Error.application && (
                              <Typography className={classes.inputError}>
                                {Error.application}
                              </Typography>
                            )}
                          </div>
                        </Grid>

                        

                        {/* Row 6: Browser Dropdown */}
                        {/* <Grid item>
                          <div className={classes.input}>
                            <Typography
                              variant="subtitle1"
                              className={clsx(classes.customFontSize)}
                            >
                              Browser
                            </Typography>
                            <Select
                              getOptionLabel={(option) => option.BrowserName}
                              getOptionValue={(option) => option.BrowserId}
                              options={browserList}
                              value={selectedBrowser}
                              onChange={(newValue) =>
                                setSelectedBrowser(newValue)
                              }
                              styles={{
                                container: (provided) => ({
                                  ...provided,
                                  backgroundColor: "rgb(242, 242, 242)",
                                  zIndex: 999,
                                }),
                                control: (provided, state) => ({
                                  ...provided,
                                  backgroundColor: "rgb(242, 242, 242)",
                                  "&:hover": {
                                    borderColor: "#654DF7",
                                  },
                                  borderColor: Error.browser
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
                              }}
                              menuPortalTarget={document.body}
                            />
                            {Error.browser && (
                              <Typography className={classes.inputError}>
                                {Error.browser}
                              </Typography>
                            )}
                          </div>
                        </Grid> */}
                      </Grid>
                    </Grid>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Grid item xs={12}>
                <Card
                  style={{
                    // paddingBottom: "30px",
                    height: "92vh",
                  }}
                >
                  <Box
                    className={classes.sideBar}
                    style={{ paddingLeft: "5vh" }}
                  >
                    Test Cases{" "}
                  </Box>
                  <Grid
                    container
                    // spacing={2}
                    alignItems="center"
                    style={{ marginBottom: "5px", paddingLeft: "5vh" }}
                  >
                    {/* Search Box */}
                    <Grid item xs={12} sm={4}>
                      <SearchField
                        placeholder="Search Test Cases..."
                        onChange={(value) => setSearchTerm(value)}
                      />
                    </Grid>
                  </Grid>

                  {/* Table with some space */}
                  <div
                    style={{
                      overflow: "auto",
                      maxHeight: "calc(100vh - 50px)",
                      marginBottom: "20px",
                    }}
                  >
                    <TestCaseTable
                      rows={filteredTestCaseData}
                      selectedRows={selectedRows}
                      handleSelectAllChange={handleSelectAllChange}
                      handleCheckboxChange={handleCheckboxChange}
                      selectAll={selectAll}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item xs={12}>
                <Card
                  style={{
                    // paddingBottom: "30px",
                    height: "8vh",
                  }}
                  className={classes.buttonContainer}
                >
                  {/* <Box > */}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>handleSubmit('Save')}
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

                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={()=>handleSubmit('SaveAndExecute')}
                    sx={{
                      backgroundColor: "rgb(101, 77, 247)",
                      "&:hover": {
                        backgroundColor: "rgb(101, 77, 247)",
                        borderColor: "#654DF7",
                      },
                    }}
                  >
                    Save & Execute
                  </Button>

                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={()=> navigate('/')}
                    sx={{
                      backgroundColor: "rgb(108, 117, 125)",
                      color: "#f1f1f1",
                      '&:hover':{
                        backgroundColor:'rgb(101, 77, 247)'
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  {/* </Box> */}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}