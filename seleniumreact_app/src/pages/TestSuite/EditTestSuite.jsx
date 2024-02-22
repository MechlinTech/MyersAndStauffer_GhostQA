import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  OutlinedInput,
  FormControl,
  Button,
  Typography,
  FormControlLabel,
  Grid,
  Box,
  Card,
  CircularProgress,
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
  Getsuitebyname,
} from "../../redux/actions/seleniumAction";
import LoadingWave from "../Dashboard/Modal/LoadingWave";
import { useParams } from "react-router-dom";

export default function EditTestSuite() {
  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate();
  const {suiteName} = useParams()
  const [selectedSuiteValue, setSelectedSuiteValue] = useState("custom-Suites");
  const [selectedRecepentValue, setSelectedRecepentValue] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [name, setName] = useState("");

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
  const [openLoadingModal, setopenLoadingModal] = useState(false);
  const { applicationList, environementList, suiteToEdit, testCasesList } =
  useSelector((state) => state.selenium);

  useEffect(() => {
    dispatch(GetApplication());
    dispatch(GetEnvironment());
    dispatch(GetTestCases());
    if(!suiteToEdit){
      dispatch(Getsuitebyname(suiteName))
    }
    setName(suiteToEdit?.TestSuiteName);
    setSelectedApplication(() => {
      const x = applicationList?.find(
        (app) => app.ApplicationId === suiteToEdit?.ApplicationId
      );
      return x;
    });
    //work on all-user
    setSelectedRecepentValue(
      suiteToEdit?.SendEmail ? "only-for-me" : "all-users"
    );
    setSelectedEnvironment(() => {
      return environementList?.find(
        (env) => env.EnvironmentId === suiteToEdit?.EnvironmentId
      );
    });
    setDescription(suiteToEdit?.Description);
    setSelectedRows(() => {
      return testCasesList.filter((test) =>
        suiteToEdit?.SelectedTestCases?.includes(test.TestCaseName)
      );
    });
  }, [dispatch ,suiteToEdit]);
  const handleRadioChange = (event) => {
    setSelectedSuiteValue(event.target.value);
  };

  const handleRadioChangeRecepent = (event) => {
    setSelectedRecepentValue(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleApplication = (env) => {
    const app = env
      ? {
          ApplicationId: env.ApplicationId,
          ApplicationName: env.ApplicationName,
        }
      : null;
    setSelectedApplication(app);
  };

  const getTestcaseNameOnly = () => {
    let testCaseArrName = [];
    selectedRows.map((testCase) => testCaseArrName.push(testCase.TestCaseName));
    // .join(",");
    return testCaseArrName;
  };

  const handleLoading = (status)=>{
    setopenLoadingModal(false)
    if(status === 'pass')
    navigate('/')

  }
  const handleSubmit = (action) => {
    const testCaseNames = getTestcaseNameOnly();
    let payload = {
      TestSuiteName: name,
      Description: description,
      TestSuiteId: suiteToEdit.TestSuiteId,
      TestSuiteType: selectedSuiteValue,
      ApplicationId: selectedApplication?.ApplicationId,
      SendEmail: selectedRecepentValue === "only-for-me" ? true : false,
      EnvironmentId: selectedEnvironment?.EnvironmentId,
      // browser: selectedBrowser.BrowserId,
      SelectedTestCases: testCaseNames,
      AllTestCases: [
        {
          disabled: true,
          group: {
            disabled: true,
            name: "string",
          },
          selected: true,
          text: "string",
          value: "string",
        },
      ],
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
    if (testCaseNames.length === 0) {
      error.testCaseError = "1px solid red";
      error.testCaseErrorText = "Select atleast one test case";
    }
    // Update error state
    setError(error);
    
    // Check if there are any errors
    if (Object.keys(error).length === 0) {
      // Proceed with form submission
      if(action === 'SaveAndExecute'){
        setopenLoadingModal(true)}
      console.log("no error ", payload);
      dispatch(AddUpdateTestSuites(payload, action,handleLoading));
    } else console.log("handleSubmit error", error, payload);
  };

  const handleCheckboxChange = (event, row) => {
    const checked = event.target.checked;
    const checkedRows = checked
    ? [...selectedRows, row]
    : selectedRows.filter(
        (selectedRow) => selectedRow.TestCaseName !== row.TestCaseName
      )
    setSelectedRows(checkedRows);
    if(checkedRows.length === testCasesList.length)
     setSelectAll(true)
    else
      setSelectAll(false)
  };

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    console.log("checked in all selection ", checked);
    setSelectAll(checked);
    setSelectedRows(checked ? testCasesList : []);
  };
  // const filteredTestCaseData = testCasesList.filter((data) =>
  //   data?.TestCaseName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  // );

  const filteredTestCaseData = testCasesList
    .map((data) => ({
      ...data,
      isChecked:
        selectedRows.find(
          (selectedRow) => selectedRow.TestCaseName === data.TestCaseName
        ) !== undefined,
    }))
    .filter((data) =>
      data?.TestCaseName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  const selectStyle = {
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
      backgroundColor: state.isSelected ? "#654DF7" : "transparent",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        color: "#654DF7", // Change the color on hover if desired
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": {
        color: "#654DF7", // Change the color on hover if desired
      },
    }),
  };
  return (
    <Suspense
      fallback={
        <Box sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          height:'80vh'
        }}>
          <CircularProgress sx={{color:'#654DF7'}}/>
        </Box>
      }
    ><div className={classes.main}>
        <LoadingWave
        open={openLoadingModal}
        onClose={() => setopenLoadingModal(false)}
        suiteName={name}
        />
        <Grid container>
          {/* First Section */}
          <Grid item xs={12} sm={4}>
            {/* Left Section Part 1 */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <Box className={classes.sideBar}>
                    <b>New Suite</b>
                  </Box>
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
                              placeholder="Enter your test suite name"
                              value={name}
                              error={Error.name ? true : false}
                              disabled={false}
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
                      <Grid item mb={2}>
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
                  <Box className={classes.sideBar}>
                    <b>Run Settings</b>
                  </Box>

                  <div
                    // style={{ overflow: "auto", maxHeight: "calc(42vh - 50px)" }}
                    // style={{ padding: "10px 0px" }}
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
                                control={<Radio style={{ color: "#654DF7" }} />}
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

                        {/* Row 5: Environment Dropdown */}
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
                              isClearable={true}
                              options={environementList}
                              value={selectedEnvironment}
                              onChange={(newValue) => {
                                setSelectedEnvironment(newValue);
                                handleApplication(newValue);
                              }}
                              styles={selectStyle}
                              menuPosition={"fixed"} // Set menuPosition to fixed
                            />
                            {Error.environment && (
                              <Typography className={classes.inputError}>
                                {Error.environment}
                              </Typography>
                            )}
                          </div>
                        </Grid>
                        {/* Row 3: Additional Name Dropdown */}
                        <Grid item >
                          <div>
                            <Typography
                              variant="subtitle1"
                              className={clsx(classes.customFontSize)}
                            >
                              Application : {selectedApplication?selectedApplication.ApplicationName:""}
                            </Typography>
                            {/* <Select
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
                            )} */}
                          </div>
                        </Grid>
                        {/* Row 4: Radio Buttons */}
                        <Grid
                          container
                          alignItems="center"
                          mb={3}
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
                                  control={
                                    <Radio style={{ color: "#654DF7" }} />
                                  }
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
                                  control={
                                    <Radio style={{ color: "#654DF7" }} />
                                  }
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
                <Card>
                  <Box
                    className={classes.sideBar}
                    style={{ paddingLeft: "5vh" }}
                  >
                    <b>Test Cases </b>
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
                      // marginBottom: "20px",
                      border: Error.testCaseError,
                    }}
                  >
                    <TestCaseTable
                      rows={filteredTestCaseData}
                      selectedRows={selectedRows}
                      // selectedRows={testCasesList.filter((test)=> suiteToEdit.SelectedTestCases.includes(test.TestCaseName))}
                      handleSelectAllChange={handleSelectAllChange}
                      handleCheckboxChange={handleCheckboxChange}
                      selectAll={selectAll}
                    />
                    <Box className={classes.testCaseErrorStyle}>
                      {Error.testCaseErrorText}
                    </Box>
                  </div>
                </Card>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item xs={12}>
                {/* <Card
                  style={{
                    // paddingBottom: "30px",
                    height: "8vh",
                  }}
                  className={classes.buttonContainer}
                > */}
                <Box className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleSubmit("Save")}
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
                    onClick={() => handleSubmit("SaveAndExecute")}
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
                    onClick={() => navigate("/")}
                    sx={{
                      backgroundColor: "rgb(108, 117, 125)",
                      color: "#f1f1f1",
                      "&:hover": {
                        backgroundColor: "rgb(101, 77, 247)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                {/* </Card> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Suspense>
  );
}
