import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { getTestSuitesList } from "../../redux/actions/settingAction";
import { useDispatch } from "react-redux";
import { ListItemIcon } from "@material-ui/core";
import {
  Environment,
  RoleIcon,
  StyledDashBoardIcon,
  UserManagementIcon,
} from "../../comman/icons";
import { Link, Outlet } from "react-router-dom";
import { GetApplication,GetBrowser } from "../../redux/actions/seleniumAction";

//JSON is showing circular reference error
import * as flatted from 'flatted';

// import { BrowserIcon } from "../../comman/icons/BrowserIcon";
export default function Settings() {
  const classess = useStyles();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(() => {
    // Initialize with the value from localStorage or a default value
    const storedItem = sessionStorage.getItem("selectedCategory");
    return storedItem
      ? flatted.parse(storedItem)
      : {
          title: "Environment",
          icon: <StyledDashBoardIcon />,
          path: "/",
        };
  });

  useEffect(() => {
    dispatch(getTestSuitesList());
    dispatch(GetApplication())
    dispatch(GetBrowser())
  }, []);

  // useEffect(()=>{
  //   setSelectedItem(()=>{
  //     const storedItem = sessionStorage.getItem("selectedCategory");
  //   return flatted.parse(storedItem)
  //   })
  // },[sessionStorage.getItem("selectedCategory")])

  const handleItemClick = (category) => {
    sessionStorage.setItem("selectedCategory", flatted.stringify(category));
    setSelectedItem(category);
  };

  const tabLableStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    padding: "10px 22px",
  };

  const categories = [
    {
      title: "Environment",
      icon: <StyledDashBoardIcon />,
      path: "/",
    },
    {
      title: "Application",
      icon: <Environment />,
      path: "/accordian",
    },
    {
      title: "Browser",
      icon: <Environment />,
      path: "/bbbbbb",
    },
    {
      title: "Roles",
      icon: <RoleIcon />,
      path: "/Performance",
    },
    {
      title: "User",
      icon: <UserManagementIcon />,
      path: "/Performance",
    },
  ];

  const renderedCategories = categories.map((category, index) => (
    <Grid item key={index}>
      <Link to={category.title} className={classess.linkStyle}>
      <Paper
        className={`${classess.paper} ${
          selectedItem && selectedItem.title === category.title
            ? classess.paperActive
            : ""
        }`}
        onClick={() => handleItemClick(category)}
      >
        <Grid
          container
          alignItems="center"
          className={classess.paperGrid}
          style={{ display: "flex" }}
        >
          <Grid
            item
            className={classess.infoGridHeader}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ListItemIcon className={classess.icon}>
              {React.cloneElement(category.icon, {
                color:
                  selectedItem && selectedItem.title === category.title
                    ? "white"
                    : "black",
              })}
            </ListItemIcon>
            <Typography
              className={`${classess.infoHeader} ${
                selectedItem && selectedItem.title === category.title
                  ? classess.infoHeaderActive
                  : ""
              }`}
              style={{ marginLeft: "8px" }}
            >
              {category.title}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      </Link>
    </Grid>
  ));

  return (
    <>
      <div className={classess.main}>
        <Grid container spacing={2}>
          {/* First Section */}
          <Grid item xs={12} sm={2}>
            <Card style={{ paddingBottom: "30px", minHeight: "84vh" }}>
              <Box className={classess.sideBar}>Settings</Box>
              {renderedCategories}
            </Card>
          </Grid>

          {/* Middle Section */}

          {/* <Grid item xs={12} sm={3}>
            <Card style={{ paddingBottom: "30px", minHeight: "84vh" }}>
              <Box style={tabLableStyle}>Test Suits</Box>
              <Grid container></Grid>
            </Card>
          </Grid> */}

          {/* Right Section */}

          <Grid item xs={12} sm={10}>
            <Card style={{ paddingBottom: "30px", minHeight: "84vh" }}>
              {/* Common Header */}
              {/* <Box style={tabLableStyle}>
                {selectedItem ? selectedItem.title : "Test Case"}
              </Box> */}

              <Grid container>
                {/* Render content based on the selected item */}
                {selectedItem ? (
                  <>
                    {/* {selectedItem.title === "Environment" && (
                      <ExecutionEnvironment />
                    )}
                    {selectedItem.title === "Application" && (
                      <Application />
                    )}
                    {selectedItem.title === "Roles Management" && (
                      <RoleManagement />
                    )}
                    {selectedItem.title === "User Management" && (
                      <UserManagement />
                    )} */}
                    <Outlet/>
                  </>
                ) : (
                  <>
                    <Box style={tabLableStyle}>
                      {selectedItem ? selectedItem.title : "Test Case"}
                    </Box>
                  </>
                )}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}