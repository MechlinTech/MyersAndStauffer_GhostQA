import React, { useState } from "react";
import {
  Modal,
  Grid,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  Box,
} from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import { FormControlLabel, Switch } from "@mui/material";
import clsx from "clsx";
import { useStyles } from "./styles"; // Import your styles
import { useDispatch } from "react-redux";
import { AddLocationSettings } from "../../../../../redux/actions/locationAction";

const steps = ["Setup", "Functionalities"];

const AddLocation = ({ open, onClose }) => {
  const classes = useStyles(); 
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    LocationName: "",
    ParallelEngineRuns: "",
  });

  const [switchState, setSwitchState] = useState({
    isLoading: false,
    performance: false,
    apiTesting: false,
    proxyRecorder: false,
    mockServices: false,
    guiFunctional: false,
    dataOrchestration: false,
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSwitchChange = (name) => {
    setSwitchState((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const resetFormAndState = () => {
    setFormData({
        LocationName: "",
        ParallelEngineRuns: "",
    });
    setSwitchState({
        isLoading: false,
        performance: false,
        apiTesting: false,
        proxyRecorder: false,
        mockServices: false,
        guiFunctional: false,
        dataOrchestration: false,
    });
    setActiveStep(0);
};


  const handleSave = () => {
    let functionality = "";
    if (switchState.performance) {
      functionality = "performance";
    } else if (switchState.apiTesting) {
      functionality = "apiTesting";
    } else if (switchState.proxyRecorder) {
      functionality = "proxyRecorder";
    } else if (switchState.mockServices) {
      functionality = "mockServices";
    } else if (switchState.guiFunctional) {
      functionality = "guiFunctional";
    } else if (switchState.dataOrchestration) {
      functionality = "dataOrchestration";
    }

    const data = {
      location_name: formData.LocationName,
      parallel_engine_runs: parseInt(formData.ParallelEngineRuns),
      functionality: functionality,
    };
    console.log("data", data);
    dispatch(AddLocationSettings(data, onClose, resetFormAndState))
  };

  const renderSwitch = (name, label) => (
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Switch
            checked={switchState[name]}
            onChange={() => handleSwitchChange(name)}
            name={name}
            color="primary"
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: switchState[name] ? "#654DF7" : "",
              },
              "& .MuiSwitch-track": {
                backgroundColor: switchState[name] ? "#654DF7" : "",
              },
            }}
          />
        }
        label={label}
      />
    </Grid>
  );

  const switchesConfig = [
    { name: "performance", label: "Performance" },
    { name: "apiTesting", label: "API Testing" },
    { name: "proxyRecorder", label: "Proxy Recorder" },
    { name: "mockServices", label: "Mock Services" },
    { name: "guiFunctional", label: "GUI Functional" },
    { name: "dataOrchestration", label: "Data Orchestration" },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={classes.modalContainer}>
        {/* Stepper */}
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={activeStep}
            sx={{
              "& .MuiStepIcon-root.Mui-completed": {
                color: "#654DF7",
              },
              // '& .MuiStepIcon-root.Mui-active': {
              //     color: 'red',
              // },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Body */}
        <div className={classes.modalBody}>
          <Grid container sx={{ padding: "10px" }}>
            {activeStep === 0 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Location Name</Typography>
                  <FormControl
                    fullWidth
                    className={clsx(classes.margin, classes.textField)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderColor: "transparent !important",
                        "&:hover fieldset": {
                          borderColor: "#654DF7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#654DF7",
                        },
                      },
                    }}
                  >
                    <OutlinedInput
                      className={classes.Outlined}
                      type="text"
                      placeholder="Enter location name"
                      value={formData.LocationName}
                      onChange={(e) =>
                        handleFieldChange("LocationName", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "10px" }}>
                  <Typography variant="subtitle1">
                    Parallel Engine Runs
                  </Typography>
                  <FormControl
                    fullWidth
                    className={clsx(classes.margin, classes.textField)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderColor: "transparent !important",
                        "&:hover fieldset": {
                          borderColor: "#654DF7",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#654DF7",
                        },
                      },
                    }}
                  >
                    <OutlinedInput
                      className={classes.Outlined}
                      type="number"
                      placeholder="Enter number of parallel engine runs"
                      value={formData.ParallelEngineRuns}
                      onChange={(e) =>
                        handleFieldChange("ParallelEngineRuns", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>

                {renderSwitch("isLoading", "Agent Log")}
              </>
            )}

            {activeStep === 1 && (
              <>
                {switchesConfig.map(({ name, label }) =>
                  renderSwitch(name, label)
                )}
              </>
            )}
          </Grid>
        </div>

        {/* Footer */}
        <div className={classes.modalFooter}>
          {activeStep > 0 && (
            <Button
              variant="contained"
              color="inherit"
              onClick={handleBack}
              className={classes.button}
              sx={{ marginRight: 1 }}
            >
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <>
              <Button
                variant="contained"
                style={{ backgroundColor: "#6c757d" }}
                onClick={onClose}
                className={classes.button}
                sx={{ marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                style={{ background: "#654DF7" }}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                style={{ backgroundColor: "#6c757d" }}
                onClick={onClose}
                className={classes.button}
                sx={{ marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                className={classes.button}
                style={{ background: "#654DF7" }}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddLocation;
