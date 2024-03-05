import {
  Box,
  Button,
  Grid,
  Paper,
  FormControl,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import { StyledOutlinedInput, StyledTypography } from "./styleTestCase";
import Select from "react-select";
import { useNavigate,useParams } from "react-router-dom";
import userActionsOptions from "../UserActionList";
import { useDispatch } from "react-redux";
import { AddTestCaseDetails } from "../../../redux/actions/seleniumAction";
import { useStyles } from "../styles";
import { toast } from "react-toastify";
export default function CreateTestCase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {rootId} = useParams()
  const [selectedAction, setselectedAct] = useState(null);
  const [testCaseTitle, settestCaseTitle] = useState("");
  const [steps, setSteps] = useState([null]);
  const [Errors, setErrors] = useState([]);
  const [testCaseTitleError, settestCaseTitleError] = useState("")
  const goBack =()=>{
    navigate(-1)
  }
  const handleSave = () => {
    let errors = steps.map((step)=> step?false:true)
    setErrors(errors)
    let titleError = ""
    if (!testCaseTitle.trim()) {
      settestCaseTitleError("Testcase title required")
      titleError="Testcase title required"
    }
    if(!titleError && !errors.includes(true)){
      let payload = {
        testCaseDetailsId: 0,
        rootId: rootId,
        testCaseName: testCaseTitle,
      };
      let actions = steps.map((step) => step?.value); 
      dispatch(AddTestCaseDetails(payload, actions,goBack));
    }else{
      console.log("error posting", errors);
      toast.error('Every field is required')
    }
  };

  const handleAddMoreSteps = () => {
    setSteps([...steps,null]);
  };

  const handleRemoveStep = (curr) => {
    const updatedSteps = steps.filter((step) => step!== curr);
    setSteps(updatedSteps);
  };

  const handleActionChange = (act, index) => {
    const updatedSteps = steps.map((step,i) =>
      i === index ? act : step
    );
    setSteps(updatedSteps);
  };

  const selectStyle = {
    container: (provided) => ({
      ...provided,
      width: "50%",
      backgroundColor: "rgb(242, 242, 242)",
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
  };

  const listOfSteps = steps.map((step,index) => (
    <li
      key={index}
      style={{ listStyle: "none", margin: "10px 0" }}
    >
      <Box sx={{display:'flex',justifyContent:'space-between',width:'50%'}}>
      <StyledTypography>
        Step {index+1}
      </StyledTypography>
      <DeleteIcon  onClick={() => handleRemoveStep(step)} sx={{cursor:'pointer',color:'red'}}/>
      </Box>
      <Paper elevation={1} sx={{ width: "50%", padding: "10px",'@media (max-width: 600px)': {
        width: '100%',  
      }, }}>
        <Box mb={1}>
          <Select
            isClearable={true}
            options={userActionsOptions}
            value={step}
            onChange={(act) => handleActionChange(act, index)}
            styles={{
              container: (provided) => ({
                ...provided,
                width: "50%",
                backgroundColor: "rgb(242, 242, 242)",
              }),
              control: (provided, state) => ({
                ...provided,
                backgroundColor: "rgb(242, 242, 242)",
                "&:hover": {
                  borderColor: "#654DF7",
                },
                borderColor: Errors[index]
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
        </Box>
        {step && (
          <Box
            className={classes.textContainer}
            sx={{ width: "70%" }}
          >
            <StyledTypography>
              {step?.value}
            </StyledTypography>
          </Box>
        )}
        {/* <Button
          onClick={() => handleRemoveStep(step.id)}
          sx={{
            backgroundColor: "rgb(220, 0, 78)",
            "&:hover": {
              backgroundColor: "rgb(220, 0, 78) !important",
            },
            color: "#fff",
            marginTop: "10px",
          }}
        >
          Remove
        </Button> */}
      </Paper>
    </li>
  ))
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
                    error={testCaseTitleError ? true : false}
                    onChange={(e) => settestCaseTitle(e.target.value)}
                  />
                </FormControl>
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
