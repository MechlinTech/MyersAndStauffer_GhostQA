import { Paper, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Grid, Tab } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "./style";
import Person2Icon from "@mui/icons-material/Person2";
import PeopleIcon from "@mui/icons-material/People";
import Profile from "./Profile";
import Users from "./Users";

const RightSection = (props) => {
  const { children, value, index, ...other } = props;
  return <Box>{value === index && <Typography>{children}</Typography>}</Box>;
};
export default function AccountNew() {
  const classes = useStyles();
  const [value, setvalue] = useState("1");

  return (
    <Grid container spacing={2} mt={2}>
      {/* left section */}
      <Grid item xs={12} sm={3} md={2}>
        <Card sx={{ padding: "10px" }}>
          <Paper
            className={`${classes.paper} ${
              value === "1" ? classes.paperActive : ""
            }`}
            onClick={() => {
              setvalue("1");
            }}
          >
            {" "}
            <Box>
              <Person2Icon/>Profile
              </Box>
          </Paper>
          <Paper
            className={`${classes.paper} ${
              value === "2" ? classes.paperActive : ""
            }`}
            onClick={() => {
              setvalue("2");
            }}
          >
            <Box>
              <PeopleIcon/>Users
            </Box>
          </Paper>
        </Card>
      </Grid>
      {/* Right section */}
      <Grid item xs={12} sm={9} md={10}>
        <Card sx={{ padding: "10px" }}>
          <RightSection value={value} index="1">
            <Profile/>
          </RightSection>
          <RightSection value={value} index="2">
            <Users/>
          </RightSection>
        </Card>
      </Grid>
    </Grid>
  );
}
