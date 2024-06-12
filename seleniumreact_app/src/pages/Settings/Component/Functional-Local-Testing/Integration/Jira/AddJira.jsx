import React, { useState } from "react";
import {
  Modal,
  Grid,
  Typography,
  FormControl,
  Button,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import clsx from "clsx";
import { useStyles } from "./styles";

const AddJira = ({
  open,
  onClose,
  handleSave,
  errors,
  accountUrl,
  setAccountUrl,
  userEmail,
  setUserEmail,
  apiKey,
  setApiKey,
  confirmApiKey,
  setConfirmApiKey,
  loading
}) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="jira-modal-title"
      aria-describedby="jira-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={classes.modalContainer}>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          Jira Details
        </Typography>
        <div className={classes.modalBody}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Account URL</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: errors.accountUrl ? "red" : "transparent",
                  "&:hover fieldset": {
                    borderColor: errors.accountUrl ? "red" : "#654DF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.accountUrl ? "red" : "#654DF7",
                  },
                },
              }}
            >
              <OutlinedInput
                className={classes.Outlined}
                type="text"
                value={accountUrl}
                onChange={(e) => setAccountUrl(e.target.value)}
                placeholder="Enter Account URL"
                error={errors.accountUrl}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">User Email</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: errors.userEmail ? "red" : "transparent",
                  "&:hover fieldset": {
                    borderColor: errors.userEmail ? "red" : "#654DF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.userEmail ? "red" : "#654DF7",
                  },
                },
              }}
            >
              <OutlinedInput
                className={classes.Outlined}
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter User Email"
                error={errors.userEmail}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">API Key</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: errors.apiKey ? "red" : "transparent",
                  "&:hover fieldset": {
                    borderColor: errors.apiKey ? "red" : "#654DF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.apiKey ? "red" : "#654DF7",
                  },
                },
              }}
            >
              <OutlinedInput
                className={classes.Outlined}
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key"
                error={errors.apiKey}
              />
            </FormControl>
          </Grid>
        </div>

        <div className={classes.modalFooter}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#6c757d" }}
            onClick={onClose}
            className={classes.button}
            sx={{ marginRight: 1 }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ background: "#654DF7" }}
            onClick={handleSave}
            endIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            Save & Enable
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddJira;
