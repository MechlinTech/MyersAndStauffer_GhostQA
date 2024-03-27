import { Box, Button, Checkbox, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledOutlinedInput, StyledTypography } from "./styleTestCase";
import { useStyles } from "./styleTestCase";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateTestCaseDetail, UpdateTestStepsDetails } from "../Api";
import { toast } from "react-toastify";
import { userActionsOptions, selectorTypeList } from "../../DropDownOptions";
import { StyledFormControl } from "../styleTestCase";
import RenderActionFields from "../RenderActionFields";
import ExecutionHistory from "./ExecutionHistory";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function EditTestCase() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { testCaseName,testId } = useParams();
  const [steps, setSteps] = useState([]);
  const [executionDetail, setexecutionDetail] = useState(null);
  const [testCaseTitle, settestCaseTitle] = useState("");
  const [startUrl, setstartUrl] = useState("");
  const [testCaseTitleError, settestCaseTitleError] = useState("");
  const [startUrlError, setstartUrlError] = useState("")
  const [isEditable, setIsEditable] = useState(false);
  const [Errors, setErrors] = useState([]);

  const getExecutionHistory = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/AddTestLab/GetTestDetailByTestName?TestName=${testCaseName}`
      );
      if (Array.isArray(res.data)) setexecutionDetail(res.data);
      else setexecutionDetail(null);
    } catch (error) {
      toast.error("NETWORK ERROR");
    }
  };
  useEffect(() => {
    const getSteps = async () => {
      const res = await axios.get(
        `${BASE_URL}/AddTestLab/GetTestStepsDetailsByTestStepsId?TestStepsId=${testId}` // change this uri
      );
      if(Array.isArray(res.data))
        setSteps(res.data)
      else
        setSteps([])
      console.log("steps list : ", res.data);
    };
    const getTestCaseDetail = async () => {
      const res = await axios.get(
        `${BASE_URL}/AddTestLab/GetTestCaseDetailsByTestDetailId?TestCaseId=${testId}` // change this uri
      );
    const testCase = res.data[0]
    settestCaseTitle(testCase.TestCaseName)
    setstartUrl(testCase.StartUrl)
    };
    //for execution history    
    getTestCaseDetail()
    getSteps();
    getExecutionHistory();
  }, []);

  const savetoEdit = () => {
    setIsEditable(false);
    navigate(-1);
  };

  const handleSave = () => {
    let payload = {
      testCaseID: testId,
      actions: steps,
    };
    console.log("payload ", payload);
    let errors = steps?.map((step) => {
      let additionalErrors = {};
      let stepType = step?.type;
      additionalErrors.selectorTypeError = !step.selectorType;
      additionalErrors.selectorValueError = !step.selectorValue;
      switch (stepType) {
        case "click":
          additionalErrors.clickTypeError = !step.clickType;
          break;
        case "Mouse over":
          break;
        case "drag and drop":
          additionalErrors.elementSelectorError = !step.elementSelector;
          additionalErrors.selectedDragDroptypeError = !step.selectedDragDropType;
          break;
        case "SendKeys":
          additionalErrors.keyPressValueError = !step.keyPressValue;
          additionalErrors.selectedModifierKeyError = !step.selectedModifierKey;
          break;
        case "Assign":
          additionalErrors.assignInputValueError = !step.assignInputValue;
          break;
        case "Execute Javascript":
          additionalErrors.executeJavaScriptError = !step.executeJavaScript;
          break;

        case "Pause (Time in ms)":
          additionalErrors.pauseTimeError = !step.pauseTime;
          break;
        case "ExitTest":
          additionalErrors.exitTestStatusError = !step.exitTestStatus;
          break;
        case "Go To URL":
          additionalErrors.navigatToError = !step.navigateTo;
          break;
        case "Element is present":
          additionalErrors.assignInputValueError = !step.assignInputValue;
          break;
        // case "Element is not Present":
        // case "Element is visible":
        // case "Element is not visible":
        // case "Element text equal":
        // case "Element text does not equal":
        // case "Element text contains":
        // case "Element text does not contains":
        case "JavaScript returns true":
          additionalErrors.javaScriptCodeError = !step.javaScriptCode;
          break;
        case "Check accessibility":
          additionalErrors.accessibilityError = !step.accessibility;
          break;
        case "Set variable":
          additionalErrors.variableNameError = !step.variableName;
          additionalErrors.variableInputError = !step.variableInput;
          break;
        case "Extract from element":
          additionalErrors.extractVariableError = !step.extractVariable;
          break;
        case "Extract from javaScript":
          additionalErrors.extractJavaScriptError = !step.extractJavaScript;
          additionalErrors.javascriptVariableError = !step.javaScriptVariable;
          break;
        case "Import steps from test":
          additionalErrors.importingStepFromError = !step.importingStepFrom;
          break;
        default:
          break;
      }
      if (selectorNoOptionList.includes(stepType)) {
        additionalErrors.selectorTypeError = false;
        additionalErrors.selectorValueError = false;
      }
      return {
        typeError: !step?.type,
        descriptionError: !step?.stepDescription,
        ...additionalErrors,
      };
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

    if (!hasError && !titleError && !urlError) {
      let data = {
        testCaseDetailsId: testId,
        rootId: 0,
        testCaseName: testCaseTitle,
        startUrl: startUrl
      }
    UpdateTestCaseDetail(data)
    UpdateTestStepsDetails(payload, savetoEdit);
    } else {
      console.log("There is an error in at least one element.",errors);
      toast.error('Some fields are empty')
     }
  };
  const handleCancle = () => {
    navigate(-1);
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
        selectedDragDropType: "",
        assignInputValue: "",
        keyPressValue: "",
        selectedModifierKey: "",
        executeJavaScript: "",
        pauseTime: "",
        exitTestStatus: "",
        navigateTo: "",
        javaScriptCode: "",
        accessibility: "",
        accessibilityModifier: "",
        variableInput: "",
        variableName: "",
        extractVariable: "",
        extractJavaScript:"",
        javaScriptVariable: "",
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
        case "selectedDragDropType":
          return i === index
            ? { ...step, selectedDragDropType: inputValue.target.value }
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
        case "executeJavaScript":
          return i === index
            ? { ...step, executeJavaScript: inputValue.target.value }
            : step;
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
        case "javaScriptCode":
          return i === index
            ? { ...step, javaScriptCode: inputValue.target.value }
            : step;
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
            ? { ...step, variableInput: inputValue.target.value }
            : step;
        case "variableName":
          return i === index
            ? { ...step, variableName: inputValue.target.value }
            : step;
        case "extractVariable":
          return i === index
            ? { ...step, extractVariable: inputValue.target.value }
            : step;
        case "extractJavaScript":
          return i === index
            ? { ...step, extractJavaScript: inputValue.target.value }
            : step;
        case "javaScriptVariable":
          return i === index
            ? { ...step, javaScriptVariable: inputValue.target.value }
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
  const listOfSteps = steps && steps?.map((step, index) => (
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
                disabled={!isEditable}
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
              placeholder="Actions"
              options={userActionsOptions}
              isDisabled={!isEditable}
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
            isEditable={isEditable}
          />
          {step.type && !selectorNoOptionList.includes(step.type) && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Select
                    isClearable={true}
                    placeholder="Selector type"
                    isDisabled={!isEditable}
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
                        borderColor: Errors[index]?.selectorTypeError
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
                <Grid item xs={6}>
                  <StyledFormControl>
                    <StyledOutlinedInput
                      type="text"
                      placeholder="Selector value"
                      error={Errors[index]?.selectorValueError}
                      disabled={!isEditable}
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
                    disabled={!isEditable}
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
    <div className={classes.main}>
      <Paper sx={{ width: "100%", p: 2 }}>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="start"
          sx={{ padding: "10px 0" }}
        >
          <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Grid item xs={12} md={3}>
              <StyledTypography sx={{ fontSize: "18px", fontWeight: "400" }}>
                Sample Testcase
              </StyledTypography>
            </Grid>
            <Grid item xs={12} md={2} display="flex" justifyContent="end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancle}
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
              {isEditable ? (
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
              ) : (
                <Button
                  onClick={() => setIsEditable(true)}
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
                  Edit
                </Button>
              )}
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
                    disabled={!(!executionDetail && isEditable)}
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
                    disabled={!isEditable}
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
                {listOfSteps}
                {isEditable && (
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
                )}
              </ul>
            </Box>
          </Grid>
          <ExecutionHistory executionDetail={executionDetail}/>
        </Grid>
      </Paper>
    </div>
  );
}
