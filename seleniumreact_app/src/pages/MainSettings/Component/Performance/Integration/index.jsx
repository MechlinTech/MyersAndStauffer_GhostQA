import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useStyles } from "./styles";
import AddJira from "./Jira/AddJira";
import AddTeams from "./Teams";
import { useDispatch, useSelector } from "react-redux";
import {
  getPerformanceIntegrationList,
  updateZiraIntegration,
} from "../../../../../redux/actions/settingAction";
import { getUserId } from "../../../../../redux/actions/authActions";

export default function Integration() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { performanceIntegration } = useSelector((state) => state.settings);
  const [accountUrl, setAccountUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [confirmApiKey, setConfirmApiKey] = useState("");
  const [switchState, setSwitchState] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    accountUrl: false,
    userEmail: false,
    apiKey: false,
  });

  useEffect(() => {
    dispatch(getUserId());
  }, [dispatch]);

  useEffect(() => {
    if (userId) dispatch(getPerformanceIntegrationList(userId));
  }, [userId, dispatch]);

  const handleCloseTeamsModal = () => {
    resetFormData();
    setOpenTeamsModal(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    if (performanceIntegration) {
      const newSwitchState = {};
      performanceIntegration.forEach((integration) => {
        newSwitchState[integration.AppName] = integration.IsIntegrated;
      });
      setSwitchState(newSwitchState);
    }
  }, [performanceIntegration]);

  const handleSwitchChange = (name) => {
    if (name === "Jira" && switchState[name]) {
      const payload = {
        userId: userId,
        appName: "Jira",
        isIntegrated: false,
        domain: "",
        email: "",
        apiKey: "",
      };

      dispatch(
        updateZiraIntegration(payload, setOpenModal, setLoading, (success) => {
          if (success) {
            setSwitchState((prevState) => ({
              ...prevState,
              [name]: false,
            }));
          }
        })
      );

      return;
    }

    setSelectedCard(name);
    if (name === "Jira" && !switchState[name]) {
      setOpenModal(true);
    } else if (name === "MS Teams/Slack" && !switchState[name]) {
      setOpenTeamsModal(true);
    } else {
      setSwitchState((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    }
  };


  const resetFormData = () => {
    setAccountUrl("");
    setUserEmail("");
    setApiKey("");
    setConfirmApiKey("");
  };

  const handleCloseModal = () => {
    resetFormData();
    setOpenModal(false);
    setSelectedCard(null);
  };

  const handleSave = () => {
    const newErrors = {
      accountUrl: !accountUrl,
      userEmail: !userEmail,
      apiKey: !apiKey,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      setLoading(true);

      const payload = {
        userId: userId,
        appName: selectedCard,
        isIntegrated: true,
        domain: accountUrl,
        email: userEmail,
        apiKey: apiKey,
      };

      dispatch(
        updateZiraIntegration(payload, setOpenModal, setLoading, (success) => {
          if (success) {
            setSwitchState((prevState) => ({
              ...prevState,
              [selectedCard]: true,
            }));
            resetFormData();
          } else {
            setSwitchState((prevState) => ({
              ...prevState,
              [selectedCard]: false,
            }));
          }
        })
      );
    }
  };

  return (
    <>
      <AddJira
        open={openModal}
        onClose={handleCloseModal}
        handleSave={handleSave}
        errors={errors}
        accountUrl={accountUrl}
        setAccountUrl={setAccountUrl}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        apiKey={apiKey}
        setApiKey={setApiKey}
        confirmApiKey={confirmApiKey}
        setConfirmApiKey={setConfirmApiKey}
        loading={loading}
      />
       <AddTeams
        open={openTeamsModal}
        onClose={handleCloseTeamsModal}
        errors={errors}
        loading={loading}
      />
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        className={classes.gridContainer}
      >
        {performanceIntegration.map((integration, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <div className={classes.cardHeader}>
                <div className={classes.logoAndTitle}>
                  <Avatar
                    src={integration.logo}
                    alt={`${integration.AppName} logo`}
                    className={classes.logo}
                  />
                  <Typography variant="h6" component="div">
                    {integration.AppName}
                  </Typography>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchState[integration.AppName] || false}
                      onChange={() => handleSwitchChange(integration.AppName)}
                      name={integration.AppName}
                      color="primary"
                    />
                  }
                  label=""
                />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
