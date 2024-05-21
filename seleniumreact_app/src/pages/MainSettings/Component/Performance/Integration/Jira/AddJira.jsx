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
import clsx from "clsx";
import { useStyles } from "./styles";

const AddJira = ({ open, onClose }) => {
  const classes = useStyles();
  
  const [accountUrl, setAccountUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [confirmApiKey, setConfirmApiKey] = useState("");

  const handleSave = () => {
    // Handle save logic here
    console.log({
      accountUrl,
      userName,
      apiKey,
      confirmApiKey
    });
  };

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
                value={accountUrl}
                onChange={(e) => setAccountUrl(e.target.value)}
                placeholder="Enter Account URL"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">User Name</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "transparent",
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter User Name"
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
                  borderColor: "transparent",
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
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">Confirm API Key</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "transparent",
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
                value={confirmApiKey}
                onChange={(e) => setConfirmApiKey(e.target.value)}
                placeholder="Enter Confirm API Key"
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
          >
            Save & Enable
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddJira;
