import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  AddLocationAgent,
  updateLocationAgent,
} from "../../../../../redux/actions/locationAction";

const AddAgent = ({ open, onClose, row }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addAgents } = useSelector((state) => state.location);
  const initialFormData = {
    AgentName: "",
    Address: "",
    DockerCommand: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    AgentName: false,
    Address: false,
    DockerCommand: false,
  });
  const [showDockerCommand, setShowDockerCommand] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (addAgents) {
      const { docker_command } = addAgents;
      setFormData((prevFormData) => ({ ...prevFormData, DockerCommand: docker_command }));
    }
  }, [addAgents]);

  useEffect(() => {
    if (row && row.agents && row.agents.length > 0) {
      const { name, agent_address } = row.agents[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        AgentName: name,
        Address: agent_address,
      }));
      setIsEditing(true);
    } else {
      setFormData(initialFormData);
      setIsEditing(false);
    }
  }, [row]);

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
  };

  const handleSave = () => {
    if (!formData.AgentName.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, AgentName: true }));
      setTimeout(() => {
        setErrors((prevErrors) => ({ ...prevErrors, AgentName: false }));
      }, 1500);
      return;
    }
    const data = {
      location: row?.id,
      name: formData.AgentName,
      agent_address: formData.Address,
    };

    const ref = row?.agents[0]?.ref;

    if (isEditing) {
      dispatch(updateLocationAgent(data, setShowDockerCommand, ref));
    } else {
      dispatch(AddLocationAgent(data, setShowDockerCommand));
    }
  };

  const handleCopyCommand = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formData.DockerCommand)
        .then(() => {
          setCopied(true);
          console.log("Copy successful");
        })
        .catch((error) => {
          console.error("Copy failed:", error);
          setCopied(false);
          fallbackCopyTextToClipboard(formData.DockerCommand);
        });
    } else {
      console.error("Clipboard API not supported");
      fallbackCopyTextToClipboard(formData.DockerCommand);
    }
  };
  
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
  
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setCopied(true);
        console.log("Fallback copy successful");
      } else {
        setCopied(false);
        console.error("Fallback copy failed");
      }
    } catch (err) {
      console.error("Fallback copy failed:", err);
      setCopied(false);
    }
  
    document.body.removeChild(textArea);
  };

  const handleClose = () => {
    onClose();
    // Reset form data when the modal is closed
    setFormData(initialFormData);
    setErrors({
      AgentName: false,
      Address: false,
      DockerCommand: false,
    });
    setShowDockerCommand(false);
    setCopied(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={classes.modalContainer}>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          {isEditing ? "Edit Agent" : "Create Agent"}
        </Typography>
        <div className={classes.modalBody}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Agent Name</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: errors.AgentName ? "red" : "transparent",
                  "&:hover fieldset": {
                    borderColor: errors.AgentName ? "red" : "#654DF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.AgentName ? "red" : "#654DF7",
                  },
                },
              }}
            >
              <OutlinedInput
                className={classes.Outlined}
                type="text"
                placeholder="Enter agent name"
                value={formData.AgentName}
                error={errors.AgentName}
                onChange={(e) => handleFieldChange("AgentName", e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">Address (Optional)</Typography>
            <FormControl
              fullWidth
              className={clsx(classes.margin, classes.textField)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: errors.Address ? "red" : "transparent",
                  "&:hover fieldset": {
                    borderColor: errors.Address ? "red" : "#654DF7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.Address ? "red" : "#654DF7",
                  },
                },
              }}
            >
              <OutlinedInput
                className={classes.Outlined}
                type="text"
                placeholder="Enter address"
                value={formData.Address}
                error={errors.Address}
                onChange={(e) => handleFieldChange("Address", e.target.value)}
              />
            </FormControl>
          </Grid>

          {showDockerCommand && (
            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              <Typography variant="subtitle1">Docker Command</Typography>
              <Box
                sx={{
                  border: "1px solid #D1D1D1",
                  borderRadius: "5px",
                  padding: "8px",
                  minHeight: "100px",
                  overflowY: "auto",
                }}
              >
                {formData.DockerCommand}
              </Box>
            </Grid>
          )}
        </div>

        <div className={classes.modalFooter}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#6c757d" }}
            onClick={handleClose}
            className={classes.button}
            sx={{ marginRight: 1 }}
          >
            Close
          </Button>
          {!showDockerCommand ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className={classes.button}
              style={{ background: "#654DF7" }}
            >
              {isEditing ? "Edit Agent" : "Create Agent"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCopyCommand}
              className={classes.button}
              style={{ background: "#654DF7" }}
            >
              {copied ? (
                <CheckCircleIcon style={{ marginRight: "8px" }} />
              ) : (
                <FileCopyIcon style={{ marginRight: "8px" }} />
              )}
              Copy Command
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddAgent;
