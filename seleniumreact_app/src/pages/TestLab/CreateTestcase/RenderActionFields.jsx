import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { StyledFormControl, StyledOutlinedInput } from "./styleTestCase";
import { keyList, accessibilityList } from "../DropDownOptions";
import Select from "react-select";
import {testCases} from '../DropDownOptions'
export default function RenderActionFields({
  action,
  step,
  index,
  steps,
  setSteps,
  handleInputChange,
}) {
  const [selectedClickType, setSelectedClickType] = useState(step?.clickType);
  const [elementSelector, setElementSelector] = useState(step?.elementSelector);
  const [selectedDragDroptype, setselectedDragDroptype] = useState(
    step?.selectedDragDroptype
  );
  const [assignInputValue, setassignInputValue] = useState(
    step?.assignInputValue
  );
  const [keyPressValue, setkeyPressValue] = useState({
    label: step?.keyPressValue,
    value: step?.keyPressValue,
  });
  const [selectedModifierKey, setselectedModifierKey] = useState(
    step?.selectedModifierKey
  );
  const [pauseTime, setpauseTime] = useState(step?.pauseTime);
  const [exitTestStatus, setExitTestStatus] = useState(step?.exitTestStatus);
  const [navigatTo, setnavigatTo] = useState(step?.navigatTo);

  const [accessibilityModifier, setaccessibilityModifier] = useState(
    step?.accessibilityModifier
  );
  const [variableName, setvariableName] = useState(step?.variableName);
  const [extractVariable, setextractVariable] = useState(step?.extractVariable)
  const [javascriptVariable, setjavascriptVariable] = useState(step?.javascriptVariable)
  switch (action) {
    case "click":
      return (
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="radio-buttons"
              name="radio-buttons-group"
              value={selectedClickType}
              onChange={(e) => {
                handleInputChange(e, index, "clickType");
              }}
              sx={{ gap: 0 }}
            >
              <FormControlLabel
                value="Left Click"
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Left Click
                  </span>
                }
              />
              <FormControlLabel
                value="Right Click"
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Right Click
                  </span>
                }
              />
              <FormControlLabel
                value="Double Click"
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Double Click
                  </span>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    case "dragDrop":
      return (
        <>
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Element Selector (Drop area)"
                value={elementSelector}
                onChange={(e) => {
                  handleInputChange(e, index, "elementSelector");
                }}
              />
            </StyledFormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="radio-buttons"
                name="radio-buttons-group"
                value={selectedDragDroptype}
                onChange={(e) => {
                  handleInputChange(e, index, "selectedDragDroptype");
                }}
                sx={{ gap: 0 }}
              >
                <FormControlLabel
                  value="Native"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Native
                    </span>
                  }
                />
                <FormControlLabel
                  value="Simulated"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Simulated
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </>
      );
    case "Assign":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Input value"
              value={assignInputValue}
              onChange={(e) => {
                handleInputChange(e, index, "assignInputValue");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "keyPress":
      return (
        <>
          <Grid item xs={6}>
            <Select
              isClearable={true}
              placeholder="type"
              options={keyList}
              value={{ label: step?.keyPressValue, value: step?.keyPressValue }}
              onChange={(val) => {
                handleInputChange(val, index, "keyPressValue");
              }}
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
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="radio-buttons-group"
                value={selectedModifierKey}
                onChange={(e) => {
                  handleInputChange(e, index, "selectedModifierKey");
                }}
                sx={{ gap: 0 }}
              >
                <FormControlLabel
                  value="Shift"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Shift
                    </span>
                  }
                />
                <FormControlLabel
                  value="Control"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Control
                    </span>
                  }
                />
                <FormControlLabel
                  value="Alt"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Alt
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </>
      );
    case "Execute Javascript":
      return (
        <Grid item xs={6}>
          <TextField
            label="JavaScript Code"
            multiline
            rows={5}
            fullWidth
            value={""}
          />
        </Grid>
      );
    case "Pause (Time in ms)":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Input value"
              value={pauseTime}
              onChange={(e) => {
                handleInputChange(e, index, "pauseTime");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "ExitTest":
      return (
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="radio-buttons"
              name="radio-buttons-group"
              value={exitTestStatus}
              onChange={(e) => {
                handleInputChange(e, index, "exitTestStatus");
              }}
              sx={{ gap: 0 }}
            >
              <FormControlLabel
                value="Passing"
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Passing
                  </span>
                }
              />
              <FormControlLabel
                value="Failing"
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Failing
                  </span>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    case "Go To URL":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Input value"
              value={navigatTo}
              onChange={(e) => {
                handleInputChange(e, index, "navigatTo");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "JavaScript returns true":
      return (
        <Grid item xs={6}>
          <TextField label="JavaScript Code" multiline rows={1} fullWidth />
        </Grid>
      );
    case "Check accessibility":
      return (
        <>
          <Grid item xs={6}>
            <Select
              isClearable={true}
              placeholder="type"
              options={accessibilityList}
              value={{ label: step?.accessibility, value: step?.accessibility }}
              onChange={(val) => {
                handleInputChange(val, index, "accessibility");
              }}
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
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="radio-buttons"
                name="radio-buttons-group"
                value={accessibilityModifier}
                onChange={(e) => {
                  handleInputChange(e, index, "accessibilityModifier");
                }}
                sx={{ gap: 0 }}
              >
                <FormControlLabel
                  value="Shift"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Shift
                    </span>
                  }
                />
                <FormControlLabel
                  value="Control"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Control
                    </span>
                  }
                />
                <FormControlLabel
                  value="Alt"
                  control={<Radio style={{ color: "#654DF7" }} />}
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}
                    >
                      Alt
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </>
      );
    case "Set variable":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Variale name"
              value={variableName}
              onChange={(e) => {
                handleInputChange(e, index, "variableName");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "Extract from element":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Variale name"
              value={extractVariable}
              onChange={(e) => {
                handleInputChange(e, index, "extractVariable");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "Extract from javaScript":
      return (
        <>
          <Grid item xs={6}>
            Javascript field
          </Grid>
          <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Variale name"
              value={javascriptVariable}
              onChange={(e) => {
                handleInputChange(e, index, "javascriptVariable");
              }}
            />
          </StyledFormControl>
          </Grid>
        </>
      );
    case "Import steps from test":
      return (
        <Grid item xs={6}>
          <Select
            isClearable={true}
            placeholder="type"
            options={testCases}
            value={{label:step?.importingStepFrom, value:step?.importingStepFrom}}
            onChange={(val)=>{handleInputChange(val,index,'importingStepFrom')}}
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
      );
    default:
      return null;
  }
}
