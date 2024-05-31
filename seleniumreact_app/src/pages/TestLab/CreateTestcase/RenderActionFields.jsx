import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import {
  StyledFormControl,
  StyledOutlinedInput,
  StyledTextField,
  useStyles
} from "./styleTestCase";
import { keyList, accessibilityList, users } from "../Comman/DropDownOptions";
import Select from "react-select";
import { testCases } from "../Comman/DropDownOptions";
export default function RenderActionFields({
  action,
  step,
  index,
  Errors,
  handleInputChange,
  isEditable,
}) {
  const classes = useStyles()
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
                // error={Errors[index]?.sendKeyInputError}
                value={step?.sendKeyInput}
                onChange={(e) => {
                  handleInputChange(e, index, "sendKeyInput");
                }}
              />
              {Errors[index]?.sendKeyInputError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
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
              // error={Errors[index]?.scrollPixelError}
              value={step?.scrollPixel}
              onChange={(e) => {
                handleInputChange(e, index, "scrollPixel");
              }}
            />
          {Errors[index]?.scrollPixelError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
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
              // error={Errors[index]?.urlError}
              value={step?.url}
              onChange={(e) => {
                handleInputChange(e, index, "url");
              }}
            />
          {Errors[index]?.urlError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "select_option":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Input field"
              disabled={!isEditable}
              // error={Errors[index]?.selectedUserError}
              value={step?.selectedUser}
              onChange={(e) => {
                handleInputChange(e, index, "selectedUser");
              }}
            />
          {Errors[index]?.selectedUserError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
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
              // error={Errors[index]?.fileNameError}
              // value={step?.fileName}  not aplicable for file
              onChange={(e) => {
                handleInputChange(e, index, "fileName");
              }}
            />
          {Errors[index]?.fileNameError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
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
              // error={Errors[index]?.elementValueError}
              onChange={(e) => {
                handleInputChange(e, index, "elementValue");
              }}
            />
          {Errors[index]?.elementValueError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
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
                // error={Errors[index]?.cssPropertyError}
                onChange={(e) => {
                  handleInputChange(e, index, "cssProperty");
                }}
              />
              {Errors[index]?.cssPropertyError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
            </StyledFormControl>
          </Grid>
          <Grid item xs={6}>
            <StyledFormControl>
              <StyledOutlinedInput
                type="text"
                placeholder="css value"
                disabled={!isEditable}
                value={step?.cssValue}
                // error={Errors[index]?.cssValueError}
                onChange={(e) => {
                  handleInputChange(e, index, "cssValue");
                }}
              />
            {Errors[index]?.cssValueError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
            </StyledFormControl>
          </Grid>
        </>
      );
    case "validate_page_title":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Page title"
              disabled={!isEditable}
              // error={Errors[index]?.pageTitleError}
              value={step?.pageTitle}
              onChange={(e) => {
                handleInputChange(e, index, "pageTitle");
              }}
            />
          {Errors[index]?.pageTitleError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "validate_current_url":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Current url"
              value={step?.currentUrl}
              disabled={!isEditable}
              // error={Errors[index]?.currentUrlError}
              onChange={(e) => {
                handleInputChange(e, index, "currentUrl");
              }}
            />
          {Errors[index]?.currentUrlError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "should_not_equal":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.shouldNotEqualError}
              value={step?.shouldNotEqualValue}
              onChange={(e) => {
                handleInputChange(e, index, "shouldNotEqualValue");
              }}
            />
          {Errors[index]?.shouldNotEqualError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "should_include":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.shouldIncludeError}
              value={step?.shouldIncludeValue}
              onChange={(e) => {
                handleInputChange(e, index, "shouldIncludeValue");
              }}
            />
            {Errors[index]?.shouldIncludeError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "should_equal":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.shouldEqualError}
              value={step?.shouldEqualValue}
              onChange={(e) => {
                handleInputChange(e, index, "shouldEqualValue");
              }}
            />
            {Errors[index]?.shouldEqualError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "should_be_greater_than":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.shouldGreaterThanError}
              value={step?.shouldGreaterThanValue}
              onChange={(e) => {
                handleInputChange(e, index, "shouldGreaterThanValue");
              }}
            />
            {Errors[index]?.shouldGreaterThanError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "should_be_less_than":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.shouldLessError}
              value={step?.shouldLessValue}
              onChange={(e) => {
                handleInputChange(e, index, "shouldLessValue");
              }}
            />
          {Errors[index]?.shouldLessError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "contain_text":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.containTextError}
              value={step?.containTextValue}
              onChange={(e) => {
                handleInputChange(e, index, "containTextValue");
              }}
            />
          {Errors[index]?.containTextError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "have_attribute":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="input value"
              disabled={!isEditable}
              // error={Errors[index]?.haveAttributeError}
              value={step?.haveAttributeValue}
              onChange={(e) => {
                handleInputChange(e, index, "haveAttributeValue");
              }}
            />
          {Errors[index]?.haveAttributeError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "click element using text":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="text"
              placeholder="Text value"
              disabled={!isEditable}
              // error={Errors[index]?.haveAttributeError}
              value={step?.textValue}
              onChange={(e) => {
                handleInputChange(e, index, "textValue");
              }}
            />
          {Errors[index]?.haveAttributeError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    case "wait":
      return (
        <Grid item xs={6}>
          <StyledFormControl>
            <StyledOutlinedInput
              type="number"
              placeholder="Wait Time(in ms)"
              disabled={!isEditable}
              // error={Errors[index]?.haveAttributeError}
              value={step?.textValue}
              onChange={(e) => {
                handleInputChange(e, index, "textValue");
              }}
            />
          {Errors[index]?.haveAttributeError&& (
                <span className={classes.errorAsterisk}>*</span>
              )}
          </StyledFormControl>
        </Grid>
      );
    default:
      return null;
  }
}
