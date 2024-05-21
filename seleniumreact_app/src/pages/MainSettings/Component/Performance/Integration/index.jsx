import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Switch,
  FormControlLabel,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { useStyles } from "./styles";
import AddJira from "./Jira/AddJira";

const cardData = [
  {
    title: "Jira",
    content: "This is Jira.",
    description:
      "Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3d/JIRA_logo_%282019%29.svg",
  },
  {
    title: "MS Teams",
    content: "This is Microsoft Teams.",
    description:
      "Microsoft Teams is a collaboration app that helps your team stay organized and have conversations all in one place.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Teams-Logo.png",
    isIntegrated: true,
  },
  {
    title: "Google Meet",
    content: "This is Google Meet.",
    description:
      "Google Meet is a video-communication service developed by Google.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_Meet_Logo.png",
  },
  {
    title: "Zoom",
    content: "This is Zoom.",
    description: "Zoom is a cloud-based video conferencing service.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Zoom_Communications_Logo.svg",
  },
  {
    title: "Slack",
    content: "This is Slack.",
    description:
      "Slack is a messaging app for businesses that connects people to the information they need.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
  },
  {
    title: "Skype",
    content: "This is Skype.",
    description:
      "Skype is a telecommunications application that provides video chat and voice call services.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Skype_icon_2020.svg",
  },
  {
    title: "Cisco Webex",
    content: "This is Cisco Webex.",
    description:
      "Cisco Webex is a suite of video conferencing, online meetings, and collaboration solutions.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Cisco_Webex_Meetings_logo.png",
  },
];

export default function Integration() {
  const classes = useStyles();

  const [switchState, setSwitchState] = useState(
    cardData.reduce((acc, card) => {
      acc[card.title] = false;
      return acc;
    }, {})
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSwitchChange = (name) => {
    if (!switchState[name]) {
      setSelectedCard(name);
      if (name == "Jira") setOpenModal(true);
    } else {
      setSwitchState((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCard(null);
  };

  return (
    <>
      {/* Modal component */}
      <AddJira open={openModal} onClose={handleCloseModal} />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        className={classes.gridContainer}
      >
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <div className={classes.cardHeader}>
                <div className={classes.logoAndTitle}>
                  <Avatar
                    src={card.logo}
                    alt={`${card.title} logo`}
                    className={classes.logo}
                  />
                  <Typography variant="h6" component="div">
                    {card.title}
                  </Typography>
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchState[card.title]}
                      onChange={() => handleSwitchChange(card.title)}
                      name={card.title}
                      color="primary"
                      sx={{
                        "& .MuiSwitch-thumb": {
                          backgroundColor: switchState[card.title]
                            ? "#654DF7"
                            : "",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: switchState[card.title]
                            ? "#654DF7"
                            : "",
                        },
                      }}
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
