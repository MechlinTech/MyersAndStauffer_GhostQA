import React, { useState } from "react";
import { Box, Card, Grid } from "@mui/material";
import Select from "react-select";
import {
  StyledButton,
  StyledFormControl,
  StyledOutlinedInput,
  StyledTypography,
} from "./style";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetSchedule } from "../../../redux/actions/testlab/testlabAction";
export default function Scheduler() {
  const dispatch = useDispatch()
  const { selectedNode } = useSelector((state) => state.testlab);

  const [interval, setInterval] = useState(null);
  const [time, setTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeatEvery, setRepeatEvery] = useState("0");
  const [repeatUnit, setRepeatUnit] = useState(null);

  const scheduleOption = [
    { label: "Do Not Repeat", value: "Do Not Repeat" },
    { label: "Every Weekday (Mon - Fri)", value: "Every Weekday (Mon - Fri)" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Custom", value: "Custom" },
  ];

  const customOptions = [
    { label: "Day", value: "Day" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
  ];

  const handleCancle = ()=>{
    dispatch(SetSchedule(false))
  }
  const handleSchedule = () => {
    console.log({
      interval,
      time,
      startDate,
      endDate,
      repeatEvery,
      repeatUnit,
    });
  };

  const selectStyle = {
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
      borderColor: state.isFocused ? "#654DF7" : "#DADADA",
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
  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledTypography sx={{ fontSize: "24px",marginBottom:'10px' }}>
          {selectedNode?.name.length > 40
            ? selectedNode?.name.slice(0, 40) + "..."
            : selectedNode?.name}
        </StyledTypography>
      </Grid>

      <Grid item xs={12} lg={9}>
        <Card style={{ padding: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <StyledTypography>Interval</StyledTypography>
                <Select
                  isClearable={true}
                  fullWidth
                  placeholder="Interval"
                  options={scheduleOption}
                  styles={selectStyle}
                  menuPosition={"fixed"}
                  value={interval}
                  onChange={(option) => setInterval(option)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <StyledTypography>Time</StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    type="time"
                    placeholder="Enter Schedule Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </StyledFormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <StyledTypography>Start Date</StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    type="date"
                    placeholder="Enter Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </StyledFormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <StyledTypography>End Date</StyledTypography>
                <StyledFormControl>
                  <StyledOutlinedInput
                    type="date"
                    placeholder="Enter End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </StyledFormControl>
              </Box>
            </Grid>
            {interval && interval.label === "Custom" && interval.value === "Custom" && (
              <Grid item xs={6}>
                <Grid
                  container
                  display="flex"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Grid item xs={4} display="flex" alignItems="center">
                    <StyledTypography
                      sx={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Repeat Every
                    </StyledTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <StyledFormControl>
                      <StyledOutlinedInput
                        type="number"
                        value={repeatEvery}
                        onChange={(e) => setRepeatEvery(e.target.value)}
                        sx={{
                          "& input[type=number]": {
                            "-moz-appearance": "textfield",
                            "&::-webkit-outer-spin-button": {
                              "-webkit-appearance": "none",
                              margin: 0,
                            },
                            "&::-webkit-inner-spin-button": {
                              "-webkit-appearance": "none",
                              margin: 0,
                            },
                          },
                        }}
                      />
                    </StyledFormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <Select
                      isClearable={true}
                      fullWidth
                      options={customOptions}
                      styles={selectStyle}
                      menuPosition={"fixed"}
                      value={repeatUnit}
                      onChange={(option) => setRepeatUnit(option)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid item xs={12} display="flex" justifyContent="end">
              <Grid
                container
                display="flex"
                style={{ width: "50%" }}
                justifyContent="end"
              >
                <Grid item display="flex" justifyContent="end">
                  <StyledButton
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: "20px" }}
                    onClick={handleCancle}
                  >
                    Cancel
                  </StyledButton>
                </Grid>
                <Grid>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    bgcolor="rgb(101, 77, 247)"
                    hoverbg="rgb(101, 77, 247)"
                    onClick={handleSchedule}
                  >
                    Schedule Suite
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
