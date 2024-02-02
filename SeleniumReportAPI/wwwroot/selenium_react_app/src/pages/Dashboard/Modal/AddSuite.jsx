import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import {
  OutlinedInput,
  FormControl,
  IconButton,
  Button,
  Typography,
  FormControlLabel,
  Grid,
  Box,
} from "@mui/material";
import Select from "react-select";
import useStyles from "./styles";
import clsx from "clsx";

const AddSuite = ({ open, onClose, hookProps }) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("option1");
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [Error, setError] = useState({ name: "", additionalName: "" });

  const staticOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    // Add more options as needed
  ];

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAdditionalNameChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  const CustomIndicator = (props) => (
    <div className={classes.customIndicator}>
      <CloseIcon />
    </div>
  );

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
      <div className={classes.modalContent}>
        {/* Header */}
        <div className={classes.header}>
          {/* Left-side content in the header */}
          <Typography className={classes.customFontSize}>Add Suite</Typography>

          {/* Right-side close button */}
          <IconButton onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Body Form Section */}
        <Grid container className={classes.body}>
          {/* Row 1: Radio Buttons */}
          <Grid item>
            <FormControl component="fieldset" className={classes.radioGroup}>
              <RadioGroup
                aria-label="options"
                name="options"
                value={selectedValue}
                onChange={handleRadioChange}
                row
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label={
                    <Typography
                      variant="body1"
                      className={classes.radioButtonLabel}
                    >
                      Custom Suites

                    </Typography>
                  }
                  className={clsx(classes.radioLabel, classes.customFontSize)}
                />
                {/* <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label={
                    <Typography
                      variant="body1"
                      className={classes.radioButtonLabel}
                    >
                     Built In Suites
                    </Typography>
                  }
                  className={classes.radioLabel}
                /> */}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Row 2: Name Input */}
          <Grid item>
            <div className={classes.input}>
              <Typography
                variant="subtitle1"
                className={clsx(classes.customFontSize)}
              >
                Name:
              </Typography>
              <FormControl
                className={clsx(classes.textField)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#654DF7",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#654DF7",
                    },
                    "& fieldset": {
                      borderColor: "transparent ",
                    },
                  },
                  height: "40px",
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  className={clsx(
                    classes.customheight,
                    classes.customFontSize,
                    classes.customBackgroung
                  )}
                />
              </FormControl>
              {Error.name && (
                <Typography className={classes.inputError}>
                  {Error.name}
                </Typography>
              )}
            </div>
          </Grid>

          {/* Row 3: Additional Name Dropdown */}
          <Grid item>
            <div className={classes.input}>
              <Typography
                variant="subtitle1"
                className={clsx(classes.customFontSize)}
              >
                Application
              </Typography>
              <Select
                options={staticOptions}
                value={selectedOption}
                onChange={handleAdditionalNameChange}
                className={clsx(classes.select, classes.customBackgroung)}
                sx={{
                  "& .MuiSelect-outlined": {
                    backgroundColor: "red", // Background color
                    "&:hover": {
                      borderColor: "red", // Hover border color
                    },
                    "&.Mui-focused": {
                      borderColor: "green !important", // Active border color
                    },
                  },
                }}
              />
              {Error.additionalName && (
                <Typography className={classes.inputError}>
                  {Error.additionalName}
                </Typography>
              )}
            </div>
          </Grid>

          {/* Row 4: Radio Buttons */}
          <Grid container alignItems="center" sx={{ display: "grid" }}>
            <Grid item>
              <Typography className={classes.customFontSize}>
                Email Recipient
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset" className={classes.radioGroup}>
                <RadioGroup
                  aria-label="options"
                  name="options"
                  value={selectedValue}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    value="option3"
                    control={<Radio />}
                    label={
                      <Typography
                        variant="body1"
                        className={classes.radioButtonLabel}
                      >
                       Only for me
                      </Typography>
                    }
                    className={clsx(classes.radioLabel, classes.customFontSize)}
                  />
                  <FormControlLabel
                    value="option4"
                    control={<Radio />}
                    label={
                      <Typography
                        variant="body1"
                        className={classes.radioButtonLabel}
                      >
                      All users
                      </Typography>
                    }
                    className={classes.radioLabel}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          {/* Row 5: Environemnt Setting Dropdown */}
          <Grid item>
            <div className={classes.input}>
              <Typography
                variant="subtitle1"
                className={clsx(classes.customFontSize)}
              >
                Environment Setting
              </Typography>
              <Select
                options={staticOptions}
                value={selectedOption}
                onChange={handleAdditionalNameChange}
                className={classes.select}
              />
              {Error.additionalName && (
                <Typography className={classes.inputError}>
                  {Error.additionalName}
                </Typography>
              )}
            </div>
          </Grid>

          {/* Row 6: Browser Dropdown */}
          <Grid item>
            <div className={classes.input}>
              <Typography
                variant="subtitle1"
                className={clsx(classes.customFontSize)}
              >
                Browser
              </Typography>
              <Select
                options={staticOptions}
                value={selectedOption}
                onChange={handleAdditionalNameChange}
                className={classes.select}
              />
              {Error.additionalName && (
                <Typography className={classes.inputError}>
                  {Error.additionalName}
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>

        {/* Footer Section */}

        <div className={classes.footer}>
          {/* Buttons */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            sx={{
              backgroundColor: "rgb(101, 77, 247)",
              "&:hover": {
                backgroundColor: "rgb(101, 77, 247)",
                borderColor: "#654DF7",
              },
            }}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            sx={{
              backgroundColor: "rgb(101, 77, 247)",
              "&:hover": {
                backgroundColor: "rgb(101, 77, 247)",
                borderColor: "#654DF7",
              },
            }}
          >
            Save & Execute
          </Button>

          <Button
            onClick={onClose}
            color="primary"
            className={classes.button}
            sx={{
              backgroundColor: "rgb(242, 242, 242)",
              color: "rgb(56, 56, 56)",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSuite;