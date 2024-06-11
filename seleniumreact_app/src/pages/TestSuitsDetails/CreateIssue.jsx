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
} from "../../redux/actions/settingAction";
import { getUserId } from "../../redux/actions/authActions";
import { toast } from "react-toastify";
import { getVideoUrl, getImageUrl } from "../../utils/configService";

export default function BugReport({ row }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { testRunName, testSuiteName } = useParams();
  const { userId } = useSelector((state) => state.auth);
  const { jiraProjectList, jiraIssueTypes } = useSelector(
    (state) => state.settings
  );

  const { testCaseSteps } = useSelector(
    (state) => state.selenium
  );
  const [imageBaseUrl, setImageBaseUrl] = useState("");
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
  const [baseUrl, setBaseUrl] = useState("");

  // Load baseUrl when the component mounts
  useEffect(() => {
    const loadBaseUrl = async () => {
      const fetchedBaseUrl = await getVideoUrl();
      setBaseUrl(fetchedBaseUrl);
    };
    loadBaseUrl();
  }, []);

  // Fetch image base URL
  useEffect(() => {
    const fetchBaseUrl = async () => {
      const url = await getImageUrl();
      setImageBaseUrl(url);
    };
    fetchBaseUrl();
  }, []);

  const imageUrl = (apiPath) => {
    return `${imageBaseUrl}${apiPath?.replace(/\\/g, "/")}`;
  };

  const videoUrl = (apiPath) => {
    return `${baseUrl}${apiPath?.replace(/\\/g, "/")}`;
  };

  const handleCreate = () => {
    if (!selectedIssue || !selectedProject) {
      toast.error("Both issue type and project must be selected");
      return;
    }

    // Parse testCaseSteps
    const testSteps = JSON.parse(testCaseSteps?.TestCaseSteps) || [];

    // Generate content for testCaseSteps
    const testCaseStepsContent = testSteps.map((step) => {
      // Check if step is an object and extract the necessary text content
      const stepText = typeof step === "object" ? JSON.stringify(step) : step;

      return {
        text: `${stepText}\n`,
        type: "text",
        marks: [],
      };
    });

    // Filter and map failure screenshots
    const failureScreenshots = testSteps
      .map((step) => step.FailureScreenShots)
      .filter((screenshot) => screenshot && screenshot.trim() !== "");

      const screenshotContent = failureScreenshots.map((screenshot) => {
        const url = imageUrl(screenshot);
        return {
          text: `Click here for image result\n`,
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
              },
            },
          ],
        };
      });

    // Combine testCaseSteps content and screenshot content
    const combinedContent = [
      ...testCaseStepsContent,
      {
        text: `Click here for video result\n`,
        type: "text",
        marks: [
          {
            type: "link",
            attrs: {
              href: videoUrl(row.TestCaseVideoURL),
            },
          },
        ],
      },
      ...screenshotContent,
    ];

    const payload = {
      jiraCreateIssueModel: {
        fields: {
          issuetype: { id: selectedIssue },
          project: { id: selectedProject },
          summary: `${testSuiteName}-${testRunName}-${row.TestCaseName}`,
          description: {
            content: [
              {
                // content: [
                //   {
                //     text: "Order entry fails when selecting. supplier.\n",
                //     type: "text",
                //     marks: [],
                //   },
                //   {
                //     text: `${videoUrl(row.TestCaseVideoURL)}\n`,
                //     type: "text",
                //     marks: [
                //       {
                //         type: "link",
                //         attrs: {
                //           href: videoUrl(row.TestCaseVideoURL),
                //         },
                //       },
                //     ],
                //   },
                //   ...screenshotContent,
                // ],

                content: combinedContent,

                type: "paragraph",
              },
            ],
            type: "doc",
            version: 1,
          },
        },
      },
      userId,
    };
    dispatch(createIssueOnJira(payload, setIsOpen, userId));
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
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={12} lg={6} style={{ padding: "10px" }}>
                  <StyledTypography>Create New Issue</StyledTypography>
                </Grid>
                <Grid item xs={12} md={6} lg={3} style={{ padding: "10px" }}>
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
                <Grid item xs={12} md={6} lg={3} style={{ padding: "10px" }}>
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
