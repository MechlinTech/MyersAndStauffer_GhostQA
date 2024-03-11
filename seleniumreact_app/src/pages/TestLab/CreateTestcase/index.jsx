import { Box, Button, Grid, Paper, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import {
  StyledFormControl,
  StyledOutlinedInput,
  StyledTypography,
} from "./styleTestCase";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { userActionsOptions,selectorTypeList } from "../DropDownOptions";
import { AddTestCaseDetails } from "./Api";
import { useStyles } from "../styles";
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
      type: null,
      stepDescription: "",
      isOptional: false,
      selectorType: "",
      selectorValue: "",
      clickType: "",
      elementSelector: "",
      selectedDragDroptype: "",
      assignInputValue: "",
      keyPressValue: "",
      selectedModifierKey: "",
      executeJavaScript:"",
      pauseTime: "",
      exitTestStatus: "",
      navigateTo: "",
      javaScriptCode:"",
      accessibility: "",
      accessibilityModifier: "",
      variableName: "",
      extractVariable: "",
      javascriptVariable: "",
      importingStepFrom: "",
    },
  ]);
  const [Errors, setErrors] = useState([]);
  const [testCaseTitleError, settestCaseTitleError] = useState("");
  const [startUrlError, setstartUrlError] = useState("")
  const goBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log("final steps,", steps);
    let payload = {
      testCaseName: testCaseTitle,
      rootId:rootId,
      startUrl: startUrl,
    };
    let errors = steps?.map((step) => {
      let additionalErrors = {}
      let stepType = step?.type
      additionalErrors.selectorTypeError = !step.selectorType
      additionalErrors.selectorValueError = !step.selectorValue
      switch (stepType) {
        case 'click':
          additionalErrors.clickTypeError = !step.clickType
          break
        case "Mouse over":
          break;
        case "dragDrop":
          additionalErrors.elementSelectorError = !step.elementSelector
          additionalErrors.selectedDragDroptype = !step.selectedDragDroptype
          break
        case "keyPress":
          additionalErrors.keyPressValueError = !step.keyPressValue
          additionalErrors.selectedModifierKeyError = !step.selectedModifierKey
          break
        case "Assign":
          additionalErrors.assignInputValueError = !step.assignInputValue
          break;
        case "Execute Javascript":
          additionalErrors.executeJavaScriptError = !step.executeJavaScript
          break;

        case "Pause (Time in ms)":
          additionalErrors.pauseTimeError = !step.pauseTime
          break;
        case "ExitTest":
          additionalErrors.exitTestStatusError = !step.exitTestStatus
          break;
        case "Go To URL":
          additionalErrors.navigatToError = !step.navigateTo
          break
        case "Element is present":
          additionalErrors.assignInputValueError = !step.assignInputValue
          break
        // case "Element is not Present":
        // case "Element is visible":
        // case "Element is not visible":
        // case "Element text equal":
        // case "Element text does not equal":
        // case "Element text contains":
        // case "Element text does not contains":
        case "JavaScript returns true":
          additionalErrors.javaScriptCodeError = !step.javaScriptCode

        case "Check accessibility":
          additionalErrors.accessibilityError = !step.accessibility
          break;
        case "Set variable":
          additionalErrors.variableNameError = !step.variableName
          additionalErrors.variableInputError = !step.variableInput
          break;
        case "Extract from element":
          additionalErrors.extractVariableError = !step.extractVariable
          break;
        case "Extract from javaScript":
          additionalErrors.extractJavaScriptError = !step.extractJavaScript
          additionalErrors.javascriptVariableError = !step.javascriptVariable
          break;
        case "Import steps from test":
          additionalErrors.importingStepFromError = !step.importingStepFrom
          break;
        default:
         break
          
      }
      if(selectorNoOptionList.includes(stepType)){
        additionalErrors.selectorTypeError = false
      additionalErrors.selectorValueError = false
      }
      return {
        typeError: !step?.type,
        descriptionError: !step?.stepDescription,
        ...additionalErrors
      }
    });
    setErrors(errors);
    let titleError = "";
    let urlError = ""
    if (!testCaseTitle.trim()) {
      settestCaseTitleError("test case title required");
      titleError = "test case title required";
    }else{settestCaseTitleError("")}
    if (!startUrl.trim()) {
      setstartUrlError("url is  required");
      urlError = "url is  required";
    }else{setstartUrlError("")}

    const hasError = errors.some((error) => Object.values(error).some((value) => value));

    if(!hasError && !titleError && !urlError){
      AddTestCaseDetails(payload, steps, goBack);
      console.log('steps ',steps)
    }else{
      toast.error("Some field are empty")
    }

  };

  const handleAddMoreSteps = () => {
    setSteps([
      ...steps,
        {
          type: null,
          stepDescription: "",
          isOptional: false,
          selectorType: "",
          selectorValue: "",
          clickType: "",
          elementSelector: "",
          selectedDragDroptype: "",
          assignInputValue: "",
          keyPressValue: "",
          selectedModifierKey: "",
          executeJavaScript:"",
          pauseTime: "",
          exitTestStatus: "",
          navigateTo: "",
          javaScriptCode:"",
          accessibility: "",
          accessibilityModifier: "",
          variableInput:"",
          variableName: "",
          extractVariable: "",
          javascriptVariable: "",
          importingStepFrom: "",
        },
    ]);
  };

  const handleRemoveStep = (curr) => {
    const updatedSteps = steps.filter((step) => step !== curr);
    setSteps(updatedSteps);
  };

  const handleInputChange = (inputValue, index, inputType) => {
    let updatedSteps = steps.map((step, i) => {
      switch (inputType) {
        case "type":
          return i === index ? { ...step, type: inputValue?.value } : step;
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
        // case "radioType":
        //   return i === index
        //     ? { ...step, radioType: inputValue.target.value }
        //     : step;
        // case "inputField":
        //   return i === index
        //     ? {
        //         ...step,
        //         inputField: inputValue?.target?.value || inputValue?.value,
        //       }
        //     : step;
        case "clickType":
          return i === index
            ? { ...step, clickType: inputValue.target.value }
            : step;
        case "elementSelector":
          return i === index
            ? { ...step, elementSelector: inputValue.target.value }
            : step;
        case "selectedDragDroptype":
          return i === index
            ? { ...step, selectedDragDroptype: inputValue.target.value }
            : step;
        case "assignInputValue":
          return i === index
            ? { ...step, assignInputValue: inputValue.target.value }
            : step;
        case "keyPressValue":
          return i === index
            ? { ...step, keyPressValue: inputValue.value }
            : step;
        case "selectedModifierKey":
          return i === index
            ? { ...step, selectedModifierKey: inputValue.target.value }
            : step;
        case 'executeJavaScript':
          return i === index
            ?{...step, executeJavaScript:inputValue.target.value}
            : step
        case "pauseTime":
          return i === index
            ? { ...step, pauseTime: inputValue.target.value }
            : step;
        case "exitTestStatus":
          return i === index
            ? { ...step, exitTestStatus: inputValue.target.value }
            : step;
        case "navigateTo":
          return i === index
            ? { ...step, navigateTo: inputValue.target.value }
            : step;
        case 'javaScriptCode':
          return i===index
            ? {...step, javaScriptCode:inputValue.target.value}
            : step
        case "accessibility":
          return i === index
            ? { ...step, accessibility: inputValue?.value }
            : step;
        case "accessibilityModifier":
          return i === index
            ? { ...step, accessibilityModifier: inputValue.target.value }
            : step;
        case "variableInput":
          return i === index
          ?{...step, variableInput:inputValue.target.value}
          : step
        case "variableName":
          return i === index
            ? { ...step, variableName: inputValue.target.value }
            : step;
        case "extractVariable":
          return i === index
            ? { ...step, extractVariable: inputValue.target.value }
            : step;
        case 'extractJavaScript':
          return i === index
            ? {...step, extractJavaScript:inputValue.target.value}
            : step
        case "javascriptVariable":
          return i === index
            ? { ...step, javascriptVariable: inputValue.target.value }
            : step;
        case "importingStepFrom":
          return i === index
            ? { ...step, importingStepFrom: inputValue?.value }
            : step;

        default:
          return step;
      }
    });
    setSteps(updatedSteps);
  };

  const selectorNoOptionList = [
    "Execute Javascript",
    "Pause (Time in ms)",
    "ExitTest",
    "Go To URL",
    "goBack",
    "refresh",
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
        <StyledTypography>Step {index + 1}</StyledTypography>
        <DeleteIcon
          onClick={() => handleRemoveStep(step)}
          sx={{ cursor: "pointer", color: "red" }}
        />
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
                error={Errors[index]?.descriptionError}
                onChange={(event) => {
                  handleInputChange(event, index, "stepDescription");
                }}
              />
            </StyledFormControl>
          </Grid>
          <Grid item xs={6}>
            <Select
              isClearable={true}
              placeholder="type"
              options={userActionsOptions}
              value={
                step
                  ? step.type
                    ? { label: step.type, value: step.type }
                    : null
                  : null
              }
              onChange={(act) => handleInputChange(act, index, "type")}
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
                  borderColor: Errors[index]?.typeError
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
          </Grid>
          {/* bellow compenent will render field according to type */}
          <RenderActionFields
            action={step?.type}
            step={step}
            index={index}
            Errors={Errors}
            setSteps={setSteps}
            handleInputChange={handleInputChange}
          />
          {step.type && !selectorNoOptionList.includes(step.type) && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <Select
              isClearable={true}
              placeholder="type"
              options={selectorTypeList}
              value={
                step
                  ? step.selectorType
                    ? { label: step.selectorType, value: step.selectorType }
                    : null
                  : null
              }
              onChange={(act) => handleInputChange(act, index, "selectorType")}
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
                  borderColor: Errors[index]?.selectorTypeError
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
                </Grid>
                <Grid item xs={6}>
                  <StyledFormControl>
                    <StyledOutlinedInput
                      type="text"
                      placeholder="Selector value"
                      error={Errors[index]?.selectorValueError}
                      value={step?.selectorValue}
                      onChange={(event) => {
                        handleInputChange(event, index, "selectorValue");
                      }}
                    />
                  </StyledFormControl>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            {step?.type !== "ExitTest" &&
              step?.type !== "Import steps from test" && (
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
              )}
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
                  Add New Testcase
                </StyledTypography>
              </Grid>
              <Grid item sx={6}>
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
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
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
                    color: "#fff",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
          >
            <Grid container spacing={1} mb={1} mt={1}>
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <StyledTypography mr={1} minWidth={"105px"}>
                  Testcase Title :
                </StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    placeholder="Enter title name"
                    value={testCaseTitle}
                    error={testCaseTitleError ? true : false}
                    onChange={(e) => settestCaseTitle(e.target.value)}
                  />
                </StyledFormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                alignItems="center"
              >
                <StyledTypography minWidth="80px">Start Url :</StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    placeholder="Enter URL"
                    value={startUrl}
                    error={startUrlError ? true : false}
                    onChange={(e) => setstartUrl(e.target.value)}
                  />
                </StyledFormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              <ul>
                {/* <li style={{ listStyle: "none", margin: "10px 0" }}>
                  <StyledTypography>step 1</StyledTypography>
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
                      <Grid item xs={6}>
                        <Select
                          isClearable={true}
                          placeholder="Navigate to"
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
                              borderColor: false
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
                      </Grid>
                      <Grid item xs={12}>
                        <StyledFormControl>
                          <StyledOutlinedInput
                            type="text"
                            placeholder="www.google.com"
                          />
                        </StyledFormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </li> */}
                {/* step 2  starts from here */}
                {listOfSteps}
                <Button
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
                    color: "#fff",
                  }}
                >
                  + Add More Steps
                </Button>
              </ul>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
