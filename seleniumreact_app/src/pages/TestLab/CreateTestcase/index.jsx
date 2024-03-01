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
import userActionsOptions from "../UserActionList";

export default function CreateTestCase() {
  const classes = useStyles();
  const [selectedAct, setselectedAct] = useState(null)
  const handleSave = () => {
    console.log("clicked on save btn");
  };
  const handleCancle = () => {
    console.log("clicked on cancle btn");
  };
  const handleAddMoreSteps = () => {
    console.log("clicked on add more steps btn");
  };
  const selectStyle = {
    container: (provided) => ({
      ...provided,
      width:'50%',
      backgroundColor: "rgb(242, 242, 242)",
      // zIndex: 1, // Adjust the zIndex value
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
  console.log("sele",selectedAct)
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
                  />
                </FormControl>
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
                <li style={{ listStyle: "none", margin: "10px 0" }}>
                  <StyledTypography>step1</StyledTypography>
                  <Paper elevation={1} sx={{ width: "50%", padding: "10px" }}>
                    <Box mb={1} >
                      <Select
                        isClearable={true}
                        options={userActionsOptions}
                        value={selectedAct}
                        onChange={(act)=>{setselectedAct(act);console.log(act)}}
                        styles={selectStyle}
                        menuPosition={"fixed"} // Set menuPosition to fixed
                      />
                    </Box>
                    <Box
                      className={classes.textContainer}
                      sx={{ width: "70%" }}
                    >
                      <StyledTypography>{selectedAct?.value}</StyledTypography>
                    </Box>
                  </Paper>
                </li>
                <li style={{ listStyle: "none", margin: "10px 0" }}>
                  <StyledTypography>step2</StyledTypography>
                  <Paper elevation={1} sx={{ width: "50%", padding: "10px" }}>
                  <Box mb={1} >
                      <Select
                        isClearable={true}
                        options={userActionsOptions}
                        value='click'
                        
                        styles={selectStyle}
                        menuPosition={"fixed"} // Set menuPosition to fixed
                      />
                    </Box>
                    <Box
                      className={classes.textContainer}
                      sx={{ width: "70%" }}
                    >
                      <StyledTypography>Xpath locator</StyledTypography>
                    </Box>
                  </Paper>
                </li>
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
