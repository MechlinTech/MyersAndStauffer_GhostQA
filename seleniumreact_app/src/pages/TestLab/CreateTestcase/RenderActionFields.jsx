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
    
    case "type":
      return (
        <>
          <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Input value"
              disabled={!isEditable}
              error={Errors[index]?.sendKeyInputError}
              value={step?.sendKeyInput}
              onChange={(e) => {
                handleInputChange(e, index, "sendKeyInput");
              }}
            />
          </StyledFormControl>
          </Grid>
        </>
      );
    case "scroll_to_window":
      return (
        <Grid item xs={6}>
         <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Window pixel"
              disabled={!isEditable}
              error={Errors[index]?.scrollPixelError}
              value={step?.scrollPixel}
              onChange={(e) => {
                handleInputChange(e, index, "scrollPixel");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "go_to_url":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="URL"
              disabled={!isEditable}
              error={Errors[index]?.urlError}
              value={step?.url}
              onChange={(e) => {
                handleInputChange(e, index, "url");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "upload_file":
      return (
        <Grid item xs={6}>
           <StyledFormControl>
            <StyledOutlinedInput
              type="file"
              placeholder="File here"
              disabled={!isEditable}
              error={Errors[index]?.fileNameError}
              // value={step?.fileName}  not aplicable for file
              onChange={(e) => {
                handleInputChange(e, index, "fileName");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "element_has_value":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Input value"
              disabled={!isEditable}
              value={step?.elementValue}
              error={Errors[index]?.elementValueError}
              onChange={(e) => {
                handleInputChange(e, index, "elementValue");
              }}
            />
          </StyledFormControl>
        </Grid>
      );
    case "element_has_css_property_with_value":
      return (
        <>
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="css property"
              disabled={!isEditable}
              value={step?.cssProperty}
              error={Errors[index]?.cssPropertyError}
              onChange={(e) => {
                handleInputChange(e, index, "cssProperty");
              }}
            />
          </StyledFormControl>
          
        </Grid>
        <Grid item xs={6}>
        <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="css value"
              disabled={!isEditable}
              value={step?.cssValue}
              error={Errors[index]?.cssValueError}
              onChange={(e) => {
                handleInputChange(e, index, "cssValue");
              }}
            />
          </StyledFormControl>
        </Grid>
        </>
        
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
