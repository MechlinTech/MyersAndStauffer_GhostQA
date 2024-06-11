import React from "react";
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

const AddTeams = ({
  open,
  onClose,
  handleSave,
  loading,
  setwebHookUrl, 
  webhooksUrl, 
  errors
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
         MS Teams/Slack  Details
        </Typography>
        <div className={classes.modalBody}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Webhook URL</Typography>
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
                value={webhooksUrl} 
                onChange={(e) => setwebHookUrl(e.target.value)} 
                placeholder="Enter Webhooks URL"
                error={errors.webhooksUrl}
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
            onClick={handleSave}
            className={classes.button}
            style={{ background: "#654DF7" }}
            endIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            Save & Enable
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTeams;

