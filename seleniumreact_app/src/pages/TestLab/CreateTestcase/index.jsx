import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { StyledOutlinedInput, StyledTypography } from "./styleTestCase";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStyles } from "./styleTestCase";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import userActionsOptions from "../UserActionList";
import { useDispatch } from "react-redux";
import { AddTestCaseDetails } from "../../../redux/actions/seleniumAction";
export default function CreateTestCase() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedAction, setselectedAct] = useState(null);
  const [testCaseTitle, settestCaseTitle] = useState("");
  const [steps, setSteps] = useState([{ id: 1, action: null }]);
  const [Errors, setErrors] = useState({
    testCaseTitleError: "",
    testCaseStepsError: "",
  });

  const handleSave = () => {
    let payload = {
      testCaseDetailsId: 0,
      rootId: 1,
      testCaseName: testCaseTitle,
    };
    let action = steps[0].action
    let errors = {};
    if (!testCaseTitle.trim()) {
      errors.testCaseTitleError = "Testcase title required";
    }
    if (!steps[0].action) {
      errors.testCaseStepsError = "Testcase steps required";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("payload ", payload, action);
      dispatch(AddTestCaseDetails(payload, action));
      navigate(-1)
    } else {
      console.log("error posting", errors);
    }
  };

  const handleAddMoreSteps = () => {
    const newStepId = steps.length + 1;
    setSteps([...steps, { id: newStepId, action: null }]);
  };
  const handleActionChange = (act, stepId) => {
    const updatedSteps = steps.map((step) =>
      step.id === stepId ? { ...step, action: act } : step
    );
    setSteps(updatedSteps);
  };
  const selectStyle = {
    container: (provided) => ({
      ...provided,
      width: "50%",
      backgroundColor: "rgb(242, 242, 242)",
      // zIndex: 1, // Adjust the zIndex value
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(242, 242, 242)",
      "&:hover": {
        borderColor: "#654DF7",
      },
      borderColor: Errors.testCaseStepsError
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
    <div className={classes.main}>
      <Grid
        container
        mt={3}
        justifyContent="center"
        sx={{ borderRadius: "5px" }}
      >
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
              <Grid item xs={12} md={3} display="flex" alignItems={"center"}>
                <StyledTypography mr={1}>Testcase Title :</StyledTypography>
                <FormControl
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
                  <StyledOutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    placeholder="Enter title name"
                    value={testCaseTitle}
                    error={Errors.testCaseTitleError ? true : false}
                    onChange={(e) => settestCaseTitle(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2} display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>navigate(-1)}
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
                  save
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ border: "1px solid rgb(219, 217, 217)" }}>
              <ul>
                {steps.map((step) => (
                  <li
                    key={step.id}
                    style={{ listStyle: "none", margin: "10px 0" }}
                  >
                    <StyledTypography>
                      Step {step.id}
                    </StyledTypography>
                    <Paper elevation={1} sx={{ width: "50%", padding: "10px" }}>
                      <Box mb={1}>
                        <Select
                          isClearable={true}
                          options={userActionsOptions}
                          value={step.action}
                          onChange={(act) => handleActionChange(act, step.id)}
                          styles={selectStyle}
                          menuPosition={"fixed"}
                        />
                      </Box>
                      {step.action && (
                        <Box
                          className={classes.textContainer}
                          sx={{ width: "70%" }}
                        >
                          <StyledTypography>
                            {step.action?.value}
                          </StyledTypography>
                        </Box>
                      )}
                    </Paper>
                  </li>
                ))}
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
