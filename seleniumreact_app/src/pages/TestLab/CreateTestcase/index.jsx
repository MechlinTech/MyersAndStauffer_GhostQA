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
import { userActionsOptions } from "../DropDownOptions";
import { AddTestCaseDetails } from "./Api";
import { useStyles } from "../styles";
import { toast } from "react-toastify";
import RenderActionFields from "./RenderActionFields";

export default function CreateTestCase() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { rootId } = useParams();
  const [testCaseTitle, settestCaseTitle] = useState("");
  const [steps, setSteps] = useState([
    { type: null, stepDescripton: "", isOptional: false },
  ]);
  const [Errors, setErrors] = useState([]);
  const [testCaseTitleError, settestCaseTitleError] = useState("");
  const goBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log("final steps,", steps);
    // let errors = steps?.map((step) => ({
    //   actionError: !step?.type,
    //   textError: !step?.separator,
    // }));
    // setErrors(errors);
    // let titleError = "";
    // if (!testCaseTitle.trim()) {
    //   settestCaseTitleError("test case title required");
    //   titleError = "test case title required";
    // }
    // const hasError = errors.some(
    //   (error) => error.actionError || error.textError
    // );

    // AddTestCaseDetails(payload, steps, goBack);
  };

  const handleAddMoreSteps = () => {
    setSteps([...steps, { type: null, stepDescripton: "", isOptional: false }]);
  };

  const handleRemoveStep = (curr) => {
    const updatedSteps = steps.filter((step) => step !== curr);
    setSteps(updatedSteps);
  };

  // const handleInputChange = (inputValue, index, inputType) => {
  //   let updatedSteps = [];
  //   switch (inputType) {
  //     case "type":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index ? { ...step, type: inputValue?.value } : step
  //       );
  //       break;
  //     case "separatorType":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index
  //           ? { ...step, separatorType: inputValue.target.value }
  //           : step
  //       );
  //       break;
  //     case "separatorValue":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index
  //           ? { ...step, separatorValue: inputValue.target.value }
  //           : step
  //       );
  //       break;
  //     case "clickType":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index ? { ...step, clickType: inputValue.target.value } : step
  //       );
  //       break;
  //     case "elementSelector":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index
  //           ? { ...step, elementSelector: inputValue.target.value }
  //           : step
  //       );
  //       break;
  //     case "selectedDragDroptype":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index
  //           ? { ...step, selectedDragDroptype: inputValue.target.value }
  //           : step
  //       );
  //       break;
  //     case "assignInputValue":
  //       updatedSteps = steps.map((step, i) =>
  //         i === index
  //           ? { ...step, assignInputValue: inputValue.target.value }
  //           : step
  //       );
  //       break;
  //     case "keyPressValue":

  //       updatedSteps = steps.map(
  //         (step, i) =>
  //           i === index ? { ...step, keyPressValue: inputValue.value } : step //obj value
  //       );
  //       break;
  //       case "selectedModifierKey":
  //         updatedSteps = steps.map(
  //           (step, i) =>
  //             i === index ? { ...step, selectedModifierKey: inputValue.target.value } : step //obj value
  //         );
  //         break;
  //     default:
  //       console.log("steps : ", steps);
  //   }
  //   setSteps(updatedSteps);
  // };

  const handleInputChange = (inputValue, index, inputType) => {
    let updatedSteps = steps.map((step, i) => {
      switch (inputType) {
        case "type":
          return i === index ? { ...step, type: inputValue?.value } : step;
        case "stepDescripton":
          return i === index
            ? { ...step, stepDescripton: inputValue?.target.value }
            : step;
        case "separatorType":
          return i === index
            ? { ...step, separatorType: inputValue.target.value }
            : step;
        case "separatorValue":
          return i === index
            ? { ...step, separatorValue: inputValue.target.value }
            : step;
        case "isOptional":
          return i === index
            ? { ...step, isOptional: inputValue.target.checked }
            : step;
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
        case "pauseTime":
          return i === index
            ? { ...step, selectedModifierKey: inputValue.target.value }
            : step;
        case "exitTestStatus":
          return i === index
            ? { ...step, exitTestStatus: inputValue.target.value }
            : step;
        case "navigatTo":
          return i === index
            ? { ...step, navigatTo: inputValue.target.value }
            : step;
        case "accessibility":
          return i === index
            ? { ...step, accessibility: inputValue?.value }
            : step;
        case "accessibilityModifier":
          return i === index
            ? { ...step, accessibilityModifier: inputValue.target.value }
            : step;
        case "variableName":
          return i === index
            ? { ...step, variableName: inputValue.target.value }
            : step;
        case "extractVariable":
          return i === index
            ? { ...step, extractVariable: inputValue.target.value }
            : step;
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
                value={step?.stepDescripton}
                onChange={(event) => {
                  handleInputChange(event, index, "stepDescripton");
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
                  borderColor: Errors[index]?.actionError
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
            steps={steps}
            setSteps={setSteps}
            handleInputChange={handleInputChange}
          />
          {step.type && !selectorNoOptionList.includes(step.type) && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <StyledFormControl>
                    <StyledOutlinedInput
                      type="text"
                      placeholder="Selector type"
                      value={step?.separatorType}
                      onChange={(event) => {
                        handleInputChange(event, index, "separatorType");
                      }}
                    />
                  </StyledFormControl>
                </Grid>
                <Grid item xs={6}>
                  <StyledFormControl>
                    <StyledOutlinedInput
                      type="text"
                      placeholder="Selector value"
                      value={step?.separatorValue}
                      onChange={(event) => {
                        handleInputChange(event, index, "separatorValue");
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
          <StyledTypography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Add New Testcase
          </StyledTypography>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{ padding: "10px 0" }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={3} display="flex" alignItems="center">
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
              <Grid item xs={12} md={2} display="flex" justifyContent="end">
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

// const renderActionFields = (action) => {
//   switch (action) {
//     case "click":
//       return (
//         <Grid item xs={6}>
//           <FormControl component="fieldset">
//             <RadioGroup
//               row
//               aria-label="radio-buttons"
//               name="radio-buttons-group"
//               // value={selectedValue}
//               // onChange={handleChange}
//               sx={{ gap: 0 }}
//             >
//               <FormControlLabel
//                 value="option1"
//                 control={<Radio style={{ color: "#654DF7" }} />}
//                 label={
//                   <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
//                     Left Click
//                   </span>
//                 }
//               />
//               <FormControlLabel
//                 value="option2"
//                 control={<Radio style={{ color: "#654DF7" }} />}
//                 label={
//                   <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
//                     Right Click
//                   </span>
//                 }
//               />
//               <FormControlLabel
//                 value="option3"
//                 control={<Radio style={{ color: "#654DF7" }} />}
//                 label={
//                   <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
//                     Double Click
//                   </span>
//                 }
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//       );
//     case "dragDrop":
//       return (
//         <>
//           <Grid item xs={6}>
//             <StyledFormControl>
//               <StyledOutlinedInput
//                 type="text"
//                 placeholder="Element Selector (Drop area)"
//               />
//             </StyledFormControl>
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 row
//                 aria-label="radio-buttons"
//                 name="radio-buttons-group"
//                 // value={selectedValue}
//                 // onChange={handleChange}
//                 sx={{ gap: 0 }}
//               >
//                 <FormControlLabel
//                   value="option1"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Native
//                     </span>
//                   }
//                 />
//                 <FormControlLabel
//                   value="option2"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Simulated
//                     </span>
//                   }
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//         </>
//       );
//     case "Assign":
//       return (
//         <Grid item xs={6}>
//           <StyledFormControl>
//             <StyledOutlinedInput type="text" placeholder="Input value" />
//           </StyledFormControl>
//         </Grid>
//       );
//     case "keyPress":
//       return (
//         <>
//           <Grid item xs={6}>
//             <Select
//               isClearable={true}
//               placeholder="type"
//               options={keyList}
//               styles={{
//                 container: (provided) => ({
//                   ...provided,
//                   backgroundColor: "rgb(242, 242, 242)",
//                   width: "100%",
//                 }),
//                 control: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: "rgb(242, 242, 242)",
//                   "&:hover": {
//                     borderColor: "#654DF7",
//                   },
//                   borderColor: false
//                     ? "red"
//                     : state.isFocused
//                     ? "#654DF7"
//                     : "rgb(242, 242, 242)",
//                 }),
//                 option: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: state.isSelected ? "#654DF7" : "transparent",
//                 }),
//                 clearIndicator: (provided) => ({
//                   ...provided,
//                   cursor: "pointer",
//                   ":hover": {
//                     color: "#654DF7",
//                   },
//                 }),
//                 dropdownIndicator: (provided) => ({
//                   ...provided,
//                   cursor: "pointer",
//                   ":hover": {
//                     color: "#654DF7",
//                   },
//                 }),
//               }}
//               menuPosition={"fixed"}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 row
//                 aria-label="radio-buttons"
//                 name="radio-buttons-group"
//                 // value={selectedValue}
//                 // onChange={handleChange}
//                 sx={{ gap: 0 }}
//               >
//                 <FormControlLabel
//                   value="option1"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Shift
//                     </span>
//                   }
//                 />
//                 <FormControlLabel
//                   value="option2"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Control
//                     </span>
//                   }
//                 />
//                 <FormControlLabel
//                   value="option3"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Alt
//                     </span>
//                   }
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//         </>
//       );
//     case "Execute Javascript":
//       return (
//         <Grid item xs={6}>
//           <TextField label="JavaScript Code" multiline rows={1} fullWidth />
//         </Grid>
//       );
//     case "Pause (Time in ms)":
//       return (
//         <Grid item xs={6}>
//           <StyledFormControl>
//             <StyledOutlinedInput type="text" placeholder="Input value" />
//           </StyledFormControl>
//         </Grid>
//       );
//     case "ExitTest":
//       return (
//         <Grid item xs={12}>
//           <FormControl component="fieldset">
//             <RadioGroup
//               row
//               aria-label="radio-buttons"
//               name="radio-buttons-group"
//               // value={selectedValue}
//               // onChange={handleChange}
//               sx={{ gap: 0 }}
//             >
//               <FormControlLabel
//                 value="option2"
//                 control={<Radio style={{ color: "#654DF7" }} />}
//                 label={
//                   <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
//                     Passing
//                   </span>
//                 }
//               />
//               <FormControlLabel
//                 value="option3"
//                 control={<Radio style={{ color: "#654DF7" }} />}
//                 label={
//                   <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
//                     Failing
//                   </span>
//                 }
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//       );
//     case "Go To URL":
//       return (
//         <Grid item xs={6}>
//           <StyledFormControl>
//             <StyledOutlinedInput
//               type="text"
//               placeholder="Input value"
//               value="Passing"
//             />
//           </StyledFormControl>
//         </Grid>
//       );
//     case "JavaScript returns true":
//       return (
//         <Grid item xs={6}>
//           <TextField label="JavaScript Code" multiline rows={1} fullWidth />
//         </Grid>
//       );
//     case "Check accessibility":
//       return (
//         <>
//           <Grid item xs={6}>
//             <Select
//               isClearable={true}
//               placeholder="type"
//               options={accessibilityList}
//               styles={{
//                 container: (provided) => ({
//                   ...provided,
//                   backgroundColor: "rgb(242, 242, 242)",
//                   width: "100%",
//                 }),
//                 control: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: "rgb(242, 242, 242)",
//                   "&:hover": {
//                     borderColor: "#654DF7",
//                   },
//                   borderColor: false
//                     ? "red"
//                     : state.isFocused
//                     ? "#654DF7"
//                     : "rgb(242, 242, 242)",
//                 }),
//                 option: (provided, state) => ({
//                   ...provided,
//                   backgroundColor: state.isSelected ? "#654DF7" : "transparent",
//                 }),
//                 clearIndicator: (provided) => ({
//                   ...provided,
//                   cursor: "pointer",
//                   ":hover": {
//                     color: "#654DF7",
//                   },
//                 }),
//                 dropdownIndicator: (provided) => ({
//                   ...provided,
//                   cursor: "pointer",
//                   ":hover": {
//                     color: "#654DF7",
//                   },
//                 }),
//               }}
//               menuPosition={"fixed"}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 row
//                 aria-label="radio-buttons"
//                 name="radio-buttons-group"
//                 // value={selectedValue}
//                 // onChange={handleChange}
//                 sx={{ gap: 0 }}
//               >
//                 <FormControlLabel
//                   value="option1"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Shift
//                     </span>
//                   }
//                 />
//                 <FormControlLabel
//                   value="option2"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Control
//                     </span>
//                   }
//                 />
//                 <FormControlLabel
//                   value="option3"
//                   control={<Radio style={{ color: "#654DF7" }} />}
//                   label={
//                     <span
//                       style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
//                     >
//                       Alt
//                     </span>
//                   }
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Grid>
//         </>
//       );
//     case "Set variable":
//       return (
//         <Grid item xs={6}>
//           <StyledFormControl>
//             <StyledOutlinedInput type="text" placeholder="Variale name" />
//           </StyledFormControl>
//         </Grid>
//       );
//     case "Extract from element":
//       return (
//         <Grid item xs={6}>
//           <StyledFormControl>
//             <StyledOutlinedInput type="text" placeholder="Variale name" />
//           </StyledFormControl>
//         </Grid>
//       );
//     case "Extract from javaScript":
//       return (
//         <>
//           <Grid item xs={6}>
//             Javascript field
//           </Grid>
//           <Grid item xs={6}>
//             <StyledFormControl>
//               <StyledOutlinedInput type="text" placeholder="Variale name" />
//             </StyledFormControl>
//           </Grid>
//         </>
//       );
//     case "Import steps from test":
//       return (
//         <Grid item xs={6}>
//           <Select
//             isClearable={true}
//             placeholder="type"
//             styles={{
//               container: (provided) => ({
//                 ...provided,
//                 backgroundColor: "rgb(242, 242, 242)",
//                 width: "100%",
//               }),
//               control: (provided, state) => ({
//                 ...provided,
//                 backgroundColor: "rgb(242, 242, 242)",
//                 "&:hover": {
//                   borderColor: "#654DF7",
//                 },
//                 borderColor: false
//                   ? "red"
//                   : state.isFocused
//                   ? "#654DF7"
//                   : "rgb(242, 242, 242)",
//               }),
//               option: (provided, state) => ({
//                 ...provided,
//                 backgroundColor: state.isSelected ? "#654DF7" : "transparent",
//               }),
//               clearIndicator: (provided) => ({
//                 ...provided,
//                 cursor: "pointer",
//                 ":hover": {
//                   color: "#654DF7",
//                 },
//               }),
//               dropdownIndicator: (provided) => ({
//                 ...provided,
//                 cursor: "pointer",
//                 ":hover": {
//                   color: "#654DF7",
//                 },
//               }),
//             }}
//             menuPosition={"fixed"}
//           />
//         </Grid>
//       );
//     default:
//       return null;
//   }
// };
