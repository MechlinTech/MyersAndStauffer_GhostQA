import React, { useEffect, useState } from "react";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Box, Button, Grid, Modal } from "@mui/material";
import { StyledTypography, useStyles } from "./drawerStyle";
import ClearIcon from "@mui/icons-material/Clear";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetAllJiraIssueTypes,
  GetProjectListJira,
  createIssueOnJira,
} from "../../redux/actions/seleniumAction";
import { getUserId } from "../../redux/actions/authActions";
import { toast } from "react-toastify";

export default function BugReport({ row }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { testRunName } = useParams();
  const { userId } = useSelector((state) => state.auth);
  const { jiraProjectList, jiraIssueTypes } = useSelector(
    (state) => state.selenium
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(getUserId());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(GetProjectListJira(userId));
      dispatch(GetAllJiraIssueTypes(userId));
    }
  }, [userId, dispatch]);

  const handleCreate = () => {
    if (!selectedIssue || !selectedProject) {
      toast.error("Both issue type and project must be selected");
      return;
    }
    const payload = {
      jiraCreateIssueModel: {
        fields: {
          issuetype: { id: selectedIssue },
          project: { id: selectedProject },
          summary: `${testRunName}-${row.TestCaseName}`,
        },
      },
      userId,
    };
    dispatch(createIssueOnJira(payload, setIsOpen));
  };

  const selectStyles = {
    container: (provided) => ({
      ...provided,
      backgroundColor: "rgb(242, 242, 242)",
      width: "100%",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgb(242, 242, 242)",
      "&:hover": { borderColor: "#654DF7" },
      borderColor: state.isFocused ? "#654DF7" : "rgb(242, 242, 242)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#654DF7" : "transparent",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": { color: "#654DF7" },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
      ":hover": { color: "#654DF7" },
    }),
  };
  if (row?.TestCaseStatus === "Passed") return null;

  return (
    <>
      <BugReportIcon
        style={{ color: "#dc3545" }}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      />

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="jira-modal-title"
        aria-describedby="jira-modal-description"
        style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <Box className={classes.modalContainer}>
          <Grid container>
            <Grid item xs={12}>
              <Box
                className={classes.headingDisplay}
                sx={{ background: "#f1f1f1" }}
              >
                <StyledTypography>
                  <BugReportIcon />
                  Report
                </StyledTypography>
                <ClearIcon onClick={() => setIsOpen(false)} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ display: 'flex', alignItems: 'center'}}>
                <Grid item xs={12} lg={6} style={{padding:'10px'}}
                >
                  <StyledTypography>Create New Issue</StyledTypography>
                </Grid>
                <Grid item xs={12} md={6} lg={3} style={{padding:'10px'}}>
                  <Select
                    isClearable
                    options={jiraIssueTypes}
                    placeholder="Issue"
                    onChange={(issue) =>
                      setSelectedIssue(issue ? issue.value : null)
                    }
                    styles={selectStyles}
                    menuPosition="fixed"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={3} style={{padding:'10px'}}>
                  <Select
                    isClearable
                    options={jiraProjectList}
                    placeholder="Project"
                    onChange={(project) =>
                      setSelectedProject(project ? project.value : null)
                    }
                    styles={selectStyles}
                    menuPosition="fixed"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ position: "absolute", bottom: "5px", right: "5px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsOpen(false)}
              sx={{
                backgroundColor: "rgb(108, 117, 125)",
                color: "#f1f1f1",
                "&:hover": { backgroundColor: "rgb(101, 77, 247)" },
                marginRight: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{
                backgroundColor: "rgb(101, 77, 247)",
                "&:hover": {
                  backgroundColor: "rgb(101, 77, 247)",
                  borderColor: "#654DF7",
                },
              }}
            >
              Create Ticket
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
