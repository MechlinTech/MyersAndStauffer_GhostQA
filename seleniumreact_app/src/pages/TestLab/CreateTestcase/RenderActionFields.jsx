import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { StyledFormControl, StyledOutlinedInput, StyledTextField } from "./styleTestCase";
import { keyList, accessibilityList } from "../DropDownOptions";
import Select from "react-select";
import { testCases } from "../DropDownOptions";
export default function RenderActionFields({
  action,
  step,
  index,
  Errors,
  handleInputChange,
  isEditable,
}) {
  switch (action) {
    case "click":
      return (
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="radio-buttons"
              name="radio-buttons-group"
              value={step?.clickType}
              onChange={(e) => {
                handleInputChange(e, index, "clickType");
              }}
              sx={{
                border: Errors[index]?.clickTypeError
                  ? "1px solid red"
                  : "1px solid transparent",
              }}
            >
              <FormControlLabel
                value="Left Click"
                disabled={!isEditable}
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Left Click
                  </span>
                }
              />
              <FormControlLabel
                value="Right Click"
                disabled={!isEditable}
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Right Click
                  </span>
                }
              />
              <FormControlLabel
                value="Double Click"
                disabled={!isEditable}
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
    case "drag_and_drop":
      return (
        <>
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Element Selector (Drop area)"
                disabled={!isEditable}
                value={step?.elementSelector}
                error={Errors[index]?.elementSelectorError}
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
                value={step?.selectedDragDropType}
                onChange={(e) => {
                  handleInputChange(e, index, "selectedDragDropType");
                }}
                sx={{
                  border: Errors[index]?.selectedDragDropTypeError
                    ? "1px solid red"
                    : "1px solid transparent",
                }}
              >
                <FormControlLabel
                  value="Native"
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
              disabled={!isEditable}
              error={Errors[index]?.assignInputValueError}
              value={step?.assignInputValue}
              onChange={(e) => {
                handleInputChange(e, index, "assignInputValue");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "SendKeys":
      return (
        <>
          <Grid item xs={6}>
            <Select
              isClearable={true}
              placeholder="type"
              isDisabled={!isEditable}
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
                  borderColor: Errors[index]?.keyPressValueError
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
                value={step?.selectedModifierKey}
                onChange={(e) => {
                  handleInputChange(e, index, "selectedModifierKey");
                }}
                sx={{
                  border: Errors[index]?.selectedModifierKeyError
                    ? "1px solid red"
                    : "1px solid transparent",
                }}
              >
                <FormControlLabel
                  value="Shift"
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
          <StyledTextField
            label="JavaScript Code"
            multiline
            disabled={!isEditable}
            rows={5}
            fullWidth
            value={step?.executeJavaScript}
            onChange={(e) => {
              handleInputChange(e, index, "executeJavaScript");
            }}
            InputLabelProps={{
              style: {
                color: "black",
                fontFamily: "Lexend Deca",
              },
            }}
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
              disabled={!isEditable}
              error={Errors[index]?.pauseTimeError}
              value={step?.pauseTime}
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
              value={step?.exitTestStatus}
              onChange={(e) => {
                handleInputChange(e, index, "exitTestStatus");
              }}
              sx={{
                border: Errors[index]?.exitTestStatusError
                  ? "1px solid red"
                  : "1px solid transparent",
              }}
            >
              <FormControlLabel
                value="Passing"
                disabled={!isEditable}
                control={<Radio style={{ color: "#654DF7" }} />}
                label={
                  <span style={{ fontSize: "14px", fontFamily: "Lexend Deca" }}>
                    Passing
                  </span>
                }
              />
              <FormControlLabel
                value="Failing"
                disabled={!isEditable}
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
              disabled={!isEditable}
              value={step?.navigateTo}
              error={Errors[index]?.navigateToError}
              onChange={(e) => {
                handleInputChange(e, index, "navigateTo");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "JavaScript returns true":
      return (
        <Grid item xs={6}>
          <StyledTextField
            label="JavaScript Code"
            multiline
            rows={1}
            disabled={!isEditable}
            fullWidth
            value={step?.javaScriptCode}
            onChange={(e) => {
              handleInputChange(e, index, "javaScriptCode");
            }}
          />
        </Grid>
      );
    case "Check accessibility":
      return (
        <>
          <Grid item xs={6}>
            <Select
              isClearable={true}
              placeholder="type"
              isDisabled={!isEditable}
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
                  borderColor: Errors[index]?.accessibilityError
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
          {/* <Grid item xs={6}>
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
          </Grid> */}
        </>
      );
    case "Set variable":
      return (
        <>
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Input value"
                value={step?.variableInput}
                disabled={!isEditable}
                error={Errors[index]?.variableInputError}
                onChange={(e) => {
                  handleInputChange(e, index, "variableInput");
                }}
              />
            </StyledFormControl>
          </Grid>
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Variale name"
                disabled={!isEditable}
                error={Errors[index]?.variableNameError}
                value={step?.variableName}
                onChange={(e) => {
                  handleInputChange(e, index, "variableName");
                }}
              />
            </StyledFormControl>
          </Grid>
        </>
      );
    case "Extract from element":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Variale name"
              disabled={!isEditable}
              error={Errors[index]?.extractVariableError}
              value={step?.extractVariable}
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
            <StyledTextField
              label="JavaScript Code"
              multiline
              rows={1}
              disabled={!isEditable}
              fullWidth
              value={step?.extractJavaScript}
              onChange={(e) => {
                handleInputChange(e, index, "extractJavaScript");
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="Variale name"
                disabled={!isEditable}
                value={step?.javaScriptVariable}
                error={Errors[index]?.javascriptVariableError}
                onChange={(e) => {
                  handleInputChange(e, index, "javaScriptVariable");
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
            isDisabled={!isEditable}
            options={testCases}
            value={{
              label: step?.importingStepFrom,
              value: step?.importingStepFrom,
            }}
            onChange={(val) => {
              handleInputChange(val, index, "importingStepFrom");
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
                borderColor: Errors[index]?.importingStepFromError
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
