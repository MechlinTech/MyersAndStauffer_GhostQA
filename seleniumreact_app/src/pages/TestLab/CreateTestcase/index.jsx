import {
  Box,
  Button,
  Grid,
  Paper,
  FormControl,
  Checkbox,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import {
  StyledFormControl,
  StyledOutlinedInput,
  StyledTypography,
} from "./styleTestCase";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import userActionsOptions from "../UserActionList";
import { useDispatch } from "react-redux";
import { AddTestCaseDetails } from "./Api";
import { useStyles } from "../styles";
import { toast } from "react-toastify";
export default function CreateTestCase() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { rootId } = useParams();
  const [testCaseTitle, settestCaseTitle] = useState("");
  const [steps, setSteps] = useState([
    { type: null, separatorValue: "", separatorType: "" },
  ]);
  const [Errors, setErrors] = useState([]);
  const [testCaseTitleError, settestCaseTitleError] = useState("");
  const goBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    let errors = steps?.map((step) => ({
      actionError: !step?.type,
      textError: !step?.separator,
    }));
    setErrors(errors);
    let titleError = "";
    if (!testCaseTitle.trim()) {
      settestCaseTitleError("test case title required");
      titleError = "test case title required";
    }
    const hasError = errors.some(
      (error) => error.actionError || error.textError
    );

    if (!hasError && !titleError) {
      let payload = {
        testCaseDetailsId: 0,
        rootId: rootId,
        testCaseName: testCaseTitle,
      };
      AddTestCaseDetails(payload, steps, goBack);
    } else {
      console.log("error posting", errors);
      toast.error("Every field is required");
    }
  };

  const handleAddMoreSteps = () => {
    setSteps([...steps, { type: null, separator: "" }]);
  };

  const handleRemoveStep = (curr) => {
    const updatedSteps = steps.filter((step) => step !== curr);
    setSteps(updatedSteps);
  };

  const handleActionChange = (inputValue, index, inputType) => {
    let updatedSteps = [];
    switch (inputType) {
      case "type":
        updatedSteps = steps.map((step, i) =>
          i === index ? { ...step, type: inputValue?.value } : step
        );
        break;
      case "separatorType":
        updatedSteps = steps.map((step, i) =>
          i === index
            ? { ...step, separatorType: inputValue.target.value }
            : step
        );
        break;
      case "separatorValue":
        updatedSteps = steps.map((step, i) =>
          i === index
            ? { ...step, separatorValue: inputValue.target.value }
            : step
        );
        break;
      default:
        console.log("steps : ", updatedSteps);
    }
    setSteps(updatedSteps);
  };

  const listOfSteps = steps.map((step, index) => (
    <li key={index} style={{ listStyle: "none", margin: "10px 0" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "70%","@media (max-width: 960px)": {
          width: "100%",
        }, }}
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
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Selector type"
                value={step?.separatorType}
                onChange={(event) => {
                  handleActionChange(event, index, "separatorType");
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
                  handleActionChange(event, index, "separatorValue");
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
              onChange={(act) => handleActionChange(act, index, "type")}
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
            <Box display="flex" alignItems="center">
              <Checkbox
                size="small"
                sx={{ "&.Mui-checked": { color: "#654DF7" } }}
              />
              <Typography fontSize="10px" fontFamily="Lexend Deca">
                Make this step optional (Continue on failure)
              </Typography>
            </Box>
          </Grid>
          {renderActionFields(step?.type)}
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
                <StyledTypography mr={1}>Testcase Title :</StyledTypography>
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

const renderActionFields = (action) => {
  switch (action) {
    case "click":
      return (
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="radio-buttons"
              name="radio-buttons-group"
              // value={selectedValue}
              // onChange={handleChange}
              sx={{gap:0}}
            >
              <FormControlLabel
                value="option1"
                control={<Radio style={{ color: "#654DF7" }}/>}
                label={<span style={{ fontSize: '14px',fontFamily:'Lexend Deca' }}>Left Click</span>}
              />
              <FormControlLabel
                value="option2"
                control={<Radio style={{ color: "#654DF7" }}/>}
                label={<span style={{ fontSize: '14px',fontFamily:'Lexend Deca' }}>Right Click</span>}
              />
              <FormControlLabel
                value="option3"
                control={<Radio style={{ color: "#654DF7" }}/>}
                label={<span style={{ fontSize: '14px',fontFamily:'Lexend Deca' }}>Double Click</span>}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    case "hover":
      return <StyledOutlinedInput />;
    // Add other cases for each action type
    default:
      return null;
  }
};
