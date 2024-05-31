import { Box, Button, Grid, Paper, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import {
  StyledFormControl,
  StyledOutlinedInput,
  StyledTypography,
  useStyles,
} from "./styleTestCase";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { userActionsOptions, selectorTypeList } from "../DropDownOptions";
import { AddTestCaseDetails } from "./Api";
// import { useStyles } from "../styles";
import { toast } from "react-toastify";
import RenderActionFields from "./RenderActionFields";

export default function CreateTestCase() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { rootId } = useParams();
  const [testCaseTitle, settestCaseTitle] = useState("");
  const [startUrl, setstartUrl] = useState("");
  const [steps, setSteps] = useState([
    {
      action: null,
      stepDescription: "",
      isOptional: false,
      // selectorType: "",
      // selectorValue: "",
      // sendKeyInput: "",
      // scrollPixel: "",
      // url: "",
      // selectedUser: "",
      // fileName: null,
      // elementValue: "",
      // cssValue: "",
      // cssProperty: "",
      // pageTitle: "",
      // currentUrl: "",
      // shouldNotEqualValue: "",
      // shouldIncludeValue: "",
      // shouldEqualValue: "",
      // shouldGreaterThanValue: "",
      // shouldLessValue: "",
      // containTextValue: "",
      // haveAttributeValue: "",
      // textValue: "",
    },
  ]);
  const [Errors, setErrors] = useState([]);
  const [testCaseTitleError, settestCaseTitleError] = useState("");
  const [startUrlError, setstartUrlError] = useState("");
  const goBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    console.log("final steps,", steps);
    let payload = {
      testCaseName: testCaseTitle,
      rootId: rootId,
      startUrl: startUrl,
    };
    let errors = steps?.map((step) => {
      let additionalErrors = {};
      let stepType = step?.action;
      additionalErrors.selectorTypeError = !step.selectorType;
      additionalErrors.selectorValueError = !step.selectorValue?.trim();
      switch (stepType) {
        case "type":
          additionalErrors.sendKeyInputError = !step.sendKeyInput.trim();
          break;
        case "scroll_to_window":
          additionalErrors.scrollPixelError = !step.scrollPixel.trim();
          break;
        case "go_to_url":
          const isValidUrl = !step.url.trim() || !urlPattern.test(step.url);
          additionalErrors.urlError = isValidUrl;
          if (isValidUrl) toast.error("Enter valid url");
          break;
        case "select_option":
          additionalErrors.selectedUserError = !step.selectedUser.trim();
          break;
        case "upload_file":
          additionalErrors.fileNameError = !step.fileName;
          break;
        case "element_has_value":
          additionalErrors.elementValueError = !step.elementValue.trim();
          break;
        case "element_has_css_property_with_value":
          additionalErrors.cssPropertyError = !step.cssProperty.trim();
          additionalErrors.cssValueError = !step.cssValue.trim();
          break;
        case "validate_page_title":
          additionalErrors.pageTitleError = !step.pageTitle.trim();
          break;
        case "validate_current_url":
          additionalErrors.currentUrlError = !step.currentUrl.trim();
          break;
        case "should_not_equal":
          additionalErrors.shouldNotEqualError =
            !step.shouldNotEqualValue.trim();
          break;
        case "should_include":
          additionalErrors.shouldIncludeError = !step.shouldIncludeValue.trim();
          break;
        case "should_equal":
          additionalErrors.shouldEqualError = !step.shouldEqualValue.trim();
          break;
        case "should_be_greater_than":
          additionalErrors.shouldGreaterThanError =
            !step.shouldGreaterThanValue.trim();
          break;
        case "should_be_less_than":
          additionalErrors.shouldLessError = !step.shouldLessValue.trim();
          break;
        case "contain_text":
          additionalErrors.containTextError = !step.containTextValue.trim();
          break;
        case "have_attribute":
          additionalErrors.haveAttributeError = !step.haveAttributeValue.trim();
          break;
        default:
          break;
      }
      if (selectorNoOptionList.includes(stepType)) {
        additionalErrors.selectorTypeError = false;
        additionalErrors.selectorValueError = false;
      }
      return {
        typeError: !step?.action,
        descriptionError: !step?.stepDescription.trim(),
        ...additionalErrors,
      };
    });
    setErrors(errors);
    let titleError = "";
    let urlError = "";
    if (!testCaseTitle.trim()) {
      settestCaseTitleError("test case title required");
      titleError = "test case title required";
      // toast.error("Enter valid title");
    } else {
      settestCaseTitleError("");
    }
    if (!startUrl.trim() || !urlPattern.test(startUrl.trim())) {
      setstartUrlError("url not valid");
      urlError = "url not valid";
      toast.error("Enter valid start url");
      return
    } else {
      setstartUrlError("");
    }

    const hasError = errors.some((error) =>
      Object.values(error).some((value) => value)
    );

    if (!hasError && !titleError && !urlError) {
      AddTestCaseDetails(payload, steps, goBack);
      console.log("steps ", steps);
    } else {
      if (errors[0].urlError === undefined || !errors[0].urlError)
        toast.error("Some field are empty");
    }
  };

  const handleAddMoreSteps = () => {
    const isEmptyField = steps.some((step) => {
      console.log("step", step);
      for (const key in step) {
        if (
          step.hasOwnProperty(key) &&
          (step[key] === "" || step[key] === null)
        ) {
          return true;
        }
      }
      return false;
    });

    if (isEmptyField) {
      toast.error("Cannot add a new step with empty fields.");
    } else {
      setSteps([
        ...steps,
        {
          action: null,
          stepDescription: "",
          isOptional: false,
          // selectorType: "",
          // selectorValue: "",
          // sendKeyInput: "",
          // scrollPixel: "",
          // url: "",
          // selectedUser: "",
          // fileName: null,
          // elementValue: "",
          // cssValue: "",
          // cssProperty: "",
          // pageTitle: "",
          // currentUrl: "",
          // shouldNotEqualValue: "",
          // shouldIncludeValue: "",
          // shouldEqualValue: "",
          // shouldGreaterThanValue: "",
          // shouldLessValue: "",
          // containTextValue: "",
          // haveAttributeValue: "",
          // textValue: ""
        },
      ]);
    }
  };

  const handleRemoveStep = (curr) => {
    const updatedSteps = steps.filter((step) => step !== curr);
    setSteps(updatedSteps);
  };

  const handleInputChange = (inputValue, index, inputType) => {
    const updateAdditionalFields = (step, action) => {
      const additionalField = {};
      switch (action) {
        case "type":
          additionalField.sendKeyInput = "";
          break;
        case "scroll_to_window":
          additionalField.scrollPixel = "";
          break;
        case "go_to_url":
          additionalField.url = "";
          break;
        case "select_option":
          additionalField.selectedUser = "";
          break;
        case "upload_file":
          additionalField.fileName = null;
          break;
        case "element_has_value":
          additionalField.elementValue = "";
          break;
        case "element_has_css_property_with_value":
          additionalField.cssProperty = "";
          additionalField.cssValue = "";
          break;
        case "validate_page_title":
          additionalField.pageTitle = "";
          break;
        case "validate_current_url":
          additionalField.currentUrl = "";
          break;
        case "should_not_equal":
          additionalField.shouldNotEqualValue = "";
          break;
        case "should_include":
          additionalField.shouldIncludeValue = "";
          break;
        case "should_equal":
          additionalField.shouldEqualValue = "";
          break;
        case "should_be_greater_than":
          additionalField.shouldGreaterThanValue = "";
          break;
        case "should_be_less_than":
          additionalField.shouldLessValue = "";
          break;
        case "contain_text":
          additionalField.containTextValue = "";
          break;
        case "have_attribute":
          additionalField.haveAttributeValue = "";
          break;
        case "click element using text":
          additionalField.textValue = "";
          break;
        default:
          break;
      }
      if (!selectorNoOptionList.includes(action)) {
        additionalField.selectorType = "";
        additionalField.selectorValue = "";
      }
      return {
        stepDescription: step?.stepDescription,
        isOptional: false,
        ...additionalField,
        action: action,
      };
    };

    setSteps((prevSteps) => {
      return prevSteps.map((step, i) => {
        if (i === index) {
          if (inputType === "action") {
            return updateAdditionalFields(step, inputValue?.value);
          } else {
            // Update other input types
            switch (inputType) {
              case "action":
                return i === index
                  ? { ...step, action: inputValue?.value }
                  : step;
              case "stepDescription":
                return i === index
                  ? { ...step, stepDescription: inputValue?.target.value }
                  : step;
              case "selectorType":
                return i === index
                  ? { ...step, selectorType: inputValue?.value }
                  : step;
              case "selectorValue":
                return i === index
                  ? { ...step, selectorValue: inputValue.target.value }
                  : step;
              case "isOptional":
                return i === index
                  ? { ...step, isOptional: inputValue.target.checked }
                  : step;
              case "sendKeyInput":
                return i === index
                  ? { ...step, sendKeyInput: inputValue.target.value }
                  : step;
              case "scrollPixel":
                return i === index
                  ? { ...step, scrollPixel: inputValue.target.value }
                  : step;
              case "url":
                return i === index
                  ? { ...step, url: inputValue.target.value }
                  : step;
              case "elementValue":
                return i === index
                  ? { ...step, elementValue: inputValue.target.value }
                  : step;
              case "selectedUser":
                return i === index
                  ? { ...step, selectedUser: inputValue?.target.value }
                  : step;
              case "fileName":
                return i === index
                  ? { ...step, fileName: inputValue.target.files[0] }
                  : step;

              case "cssProperty":
                return i === index
                  ? { ...step, cssProperty: inputValue.target.value }
                  : step;
              case "cssValue":
                return i === index
                  ? { ...step, cssValue: inputValue.target.value }
                  : step;

              case "pageTitle":
                return i === index
                  ? { ...step, pageTitle: inputValue.target.value }
                  : step;
              case "currentUrl":
                return i === index
                  ? { ...step, currentUrl: inputValue.target.value }
                  : step;
              case "shouldNotEqualValue":
                return i === index
                  ? { ...step, shouldNotEqualValue: inputValue.target.value }
                  : step;
              case "shouldIncludeValue":
                return i === index
                  ? { ...step, shouldIncludeValue: inputValue.target.value }
                  : step;
              case "shouldEqualValue":
                return i === index
                  ? { ...step, shouldEqualValue: inputValue.target.value }
                  : step;

              case "shouldGreaterThanValue":
                return i === index
                  ? { ...step, shouldGreaterThanValue: inputValue.target.value }
                  : step;
              case "shouldLessValue":
                return i === index
                  ? { ...step, shouldLessValue: inputValue.target.value }
                  : step;
              case "containTextValue":
                return i === index
                  ? { ...step, containTextValue: inputValue.target.value }
                  : step;
              case "haveAttributeValue":
                return i === index
                  ? { ...step, haveAttributeValue: inputValue.target.value }
                  : step;
              case "shouldEqualValue":
                return i === index
                  ? { ...step, shouldEqualValue: inputValue.target.value }
                  : step;
              case "textValue":
                return i === index
                  ? { ...step, textValue: inputValue.target.value }
                  : step;
              default:
                return step;
            }
          }
        } else {
          return step; // Keep other elements unchanged
        }
      });
    });
  };

  const findLabelByValue = (value) => {
    for (const pair of userActionsOptions) {
      if (pair.value === value) {
        return pair.label;
      }
    }
    return "not found"; // Return null if the value is not found
  };
  const selectorNoOptionList = [
    "visit",
    "scroll_to_window",
    "go_to_url",
    "go_back",
    "go_forward",
    "refresh_page",
    "validate_current_url",
    "click element using text",
    "wait",
  ];
  const listOfSteps = steps.map((step, index) => (
    <li key={index} style={{ listStyle: "none", margin: "10px 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
          "@media (max-width: 960px)": {
            width: "100%",
          },
        }}
      >
        <StyledTypography>Step {index + 1} *</StyledTypography>
        {index > 0 && (
          <DeleteIcon
            onClick={() => handleRemoveStep(step)}
            sx={{ cursor: "pointer", color: "red" }}
          />
        )}
      </Box>
      <Paper
        elevation={1}
        sx={{
          width: "70%",
          padding: "10px",
          "@media (max-width: 960px)": {
            width: "100%",
          },
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Step Description"
                value={step?.stepDescription}
                // error={Errors[index]?.descriptionError}
                onChange={(event) => {
                  handleInputChange(event, index, "stepDescription");
                }}
              />
              {Errors[index]?.descriptionError && (
                <span className={classes.errorAsterisk}>*</span>
              )}
            </StyledFormControl>
          </Grid>
          <Grid item xs={6} style={{position:'relative'}}>
            <Select
              isClearable={true}
              placeholder="Actions"
              options={userActionsOptions}
              value={
                step
                  ? step?.action
                    ? {
                        label: findLabelByValue(step?.action),
                        value: step?.action,
                      }
                    : null
                  : null
              }
              onChange={(act) => handleInputChange(act, index, "action")}
              styles={{
                container: (provided) => ({
                  ...provided,
                  backgroundColor: "rgb(242, 242, 242)",
                  width: "100%",
                }),
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "rgb(242, 242, 242)",
                  "&:hover": {
                    borderColor: "#654DF7",
                  },
                  // borderColor: Errors[index]?.typeError
                  //   ? "red"
                  //   : state.isFocused
                  //   ? "#654DF7"
                  //   : "rgb(242, 242, 242)",
                  borderColor: state.isFocused
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
                    color: "#654DF7",
                  },
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  cursor: "pointer",
                  ":hover": {
                    color: "#654DF7",
                  },
                }),
              }}
              menuPosition={"fixed"}
            />
            {Errors[index]?.typeError && (
                <span className={classes.errorAsteriskSelect}>*</span>
              )}
          </Grid>
          {/* bellow compenent will render field according to type */}
          <RenderActionFields
            action={step?.action}
            step={step}
            index={index}
            Errors={Errors}
            setSteps={setSteps}
            handleInputChange={handleInputChange}
            isEditable={true}
          />
          {step?.action && !selectorNoOptionList.includes(step.action) && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6} style={{position:'relative'}}>
                  <Select
                    isClearable={true}
                    placeholder="Selector type"
                    options={selectorTypeList}
                    value={
                      step
                        ? step.selectorType
                          ? {
                              label: step.selectorType,
                              value: step.selectorType,
                            }
                          : null
                        : null
                    }
                    onChange={(act) =>
                      handleInputChange(act, index, "selectorType")
                    }
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        backgroundColor: "rgb(242, 242, 242)",
                        width: "100%",
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "rgb(242, 242, 242)",
                        "&:hover": {
                          borderColor: "#654DF7",
                        },
                        // borderColor: Errors[index]?.selectorTypeError
                        //   ? "red"
                        //   : state.isFocused
                        //   ? "#654DF7"
                        //   : "rgb(242, 242, 242)",
                          borderColor: state.isFocused
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
                        cursor: "pointer",
                        ":hover": {
                          color: "#654DF7",
                        },
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        cursor: "pointer",
                        ":hover": {
                          color: "#654DF7",
                        },
                      }),
                    }}
                    menuPosition={"fixed"}
                  />
                  {Errors[index]?.selectorTypeError && (
                <span className={classes.errorAsteriskSelect}>*</span>
              )}
                </Grid>
                <Grid item xs={6}>
                  <StyledFormControl>
                    <StyledOutlinedInput
                      type="text"
                      placeholder="Selector value"
                      // error={Errors[index]?.selectorValueError}
                      value={step?.selectorValue}
                      onChange={(event) => {
                        handleInputChange(event, index, "selectorValue");
                      }}
                    />
                    {Errors[index]?.selectorValueError && (
                <span className={classes.errorAsterisk}>*</span>
              )}
                  </StyledFormControl>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Checkbox
                size="small"
                sx={{ "&.Mui-checked": { color: "#654DF7" } }}
                checked={step?.isOptional}
                onChange={(e) => {
                  handleInputChange(e, index, "isOptional");
                }}
              />
              <Typography fontSize="10px" fontFamily="Lexend Deca">
                Make this step optional (Continue on failure)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </li>
  ));
  return (
    <div>
      <Grid container mt={3} justifyContent="center">
        <Paper sx={{ width: "100%", p: 2 }}>
          <Grid item xs={12} display="flex" justifyContent="end">
            <Grid container justifyContent="space-between">
              <Grid item sx={6}>
                <StyledTypography sx={{ fontSize: "20px", fontWeight: "400" }}>
                  Add New Test Case
                </StyledTypography>
              </Grid>
              <Grid item sx={6}>
                {/* <Button
                  onClick={handleAddMoreSteps}
                  sx={{
                    backgroundColor: "rgb(101, 77, 247)",
                    "&:hover": {
                      backgroundColor: "rgb(101, 77, 247) !important",
                      borderColor: "#654DF7",
                      color: "#fff",
                      "&:before": {
                        backgroundColor: "rgb(101, 77, 247) !important",
                        color: "#fff",
                      },
                    },
                    marginRight: "10px",
                    color: "#fff",
                  }}
                >
                  + Add More Steps
                </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => goBack()}
                  sx={{
                    textTransform: "none",
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
                  onClick={handleSave}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "rgb(101, 77, 247)",
                    "&:hover": {
                      backgroundColor: "rgb(101, 77, 247) !important",
                      borderColor: "#654DF7",
                      color: "#fff",
                      "&:before": {
                        backgroundColor: "rgb(101, 77, 247) !important",
                        color: "#fff",
                      },
                    },
                    color: "#fff",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex">
            <Grid container spacing={1} mb={1} mt={1}>
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <StyledTypography mr={1} minWidth={"120px"}>
                  Test Case Title * :
                </StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    placeholder="Enter title name"
                    value={testCaseTitle}
                    // error={testCaseTitleError ? true : false}
                    onChange={(e) => settestCaseTitle(e.target.value)}
                  />
                  {testCaseTitleError && (
                    <span className={classes.errorAsterisk}>*</span>
                  )}
                </StyledFormControl>
              </Grid>
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <StyledTypography minWidth="80px">Start Url * :</StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    placeholder="Enter URL"
                    value={startUrl}
                    // error={startUrlError ? true : false}
                    onChange={(e) => setstartUrl(e.target.value)}
                  />
                  {startUrlError && (
                    <span className={classes.errorAsterisk}>*</span>
                  )}
                </StyledFormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              <ul>
                {/* step 2  starts from here */}
                {listOfSteps}
              </ul>
              <Button
                onClick={handleAddMoreSteps}
                sx={{
                  margin: "0 0 30px 30px",
                  textTransform: "none",
                  backgroundColor: "rgb(101, 77, 247)",
                  "&:hover": {
                    backgroundColor: "rgb(101, 77, 247) !important",
                    borderColor: "#654DF7",
                    color: "#fff",
                    "&:before": {
                      backgroundColor: "rgb(101, 77, 247) !important",
                      color: "#fff",
                    },
                  },
                  color: "#fff",
                }}
              >
                + Add More Steps
              </Button>
            </Box>
          </Grid>
          {/* <Grid xs={12}>
            <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              
            </Box>
          </Grid> */}
        </Paper>
      </Grid>
    </div>
  );
}
