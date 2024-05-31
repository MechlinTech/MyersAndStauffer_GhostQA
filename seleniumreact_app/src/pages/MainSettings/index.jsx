import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useStyles } from "./styles";
import { getTestSuitesList } from "../../redux/actions/settingAction";
import { GetApplication, GetBrowser } from "../../redux/actions/seleniumAction";
import * as flatted from "flatted";
import { StyledDashBoardIcon } from "../../comman/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(() => {
    const storedItem = sessionStorage.getItem("selectedCategory");
    return storedItem
      ? flatted.parse(storedItem)
      : {
          title: "Environment",
          icon: <StyledDashBoardIcon />,
          path: "/",
        };
  });

  const tabLabelStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    padding: "10px 22px",
  };

  const [activeParent, setActiveParent] = useState(null);

  useEffect(() => {
    dispatch(getTestSuitesList());
    dispatch(GetApplication());
    dispatch(GetBrowser());
  }, [dispatch]);

  const handleItemClick = (category) => {
    try {
      const categoryData = flatted.stringify(category);
      sessionStorage.setItem("selectedCategory", categoryData);
      setSelectedItem(category);

      
      if (activeParent === category.title) {
        setActiveParent(null);
      } else {
        setActiveParent(category.title);
      }
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  };

  const handleChildClick = (child) => {
    const childData = flatted.stringify(child);
    sessionStorage.setItem("selectedCategory", childData);
    setSelectedItem(child);
    const parentCategory = categories.find(category =>
        category?.children && category?.children.some(c => c.title === child.title)
    );
    if (parentCategory) {
        setActiveParent(parentCategory.title);
    }
};


  const toggleParentExpansion = (parentTitle) => {
    setActiveParent((prev) => (prev === parentTitle ? null : parentTitle));
  };

  const categories = [
    {
      title: "User Account",
      path: "/main-settings/detail",
      children: [
        {
          title: "Detail",
          path: "/main-settings/detail",
        },
        {
          title: "Organization",
          path: "/main-settings/organization",
        },
      ],
    },,
    {
      title: "Performance",
      path: "/main-settings/location",
      children: [
        {
          title: "In-Private Locations",
          path: "/main-settings/location",
        },
        {
          title: "Integration",
          path: "/main-settings/integration",
        },
      ],
    },
    // {
    //   title: "Funcational",
    //   path: "/settings/Application",
    //   children: [
    //     {
    //       title: "browser",
    //       path: "/settings/Application/Sub-Application",
    //     },
    //     {
    //         title: "Environment",
    //         path: "/settings/Application/Sub-Application",
    //       },
    //   ],
    // },
  ];

  // Function to render categories and their submenus
  const renderCategoriesAndSubmenus = categories.map((category, index) => {
    const isParentActive = category.title === activeParent || category.children.some(child => child.title === selectedItem?.title);
    
    return (
      <Grid item key={index} xs={12}>
        <Paper
          className={`
            ${classes.paper}
            ${isParentActive ? classes.paperActive : ""}
          `}
          onClick={() => handleItemClick(category)}
        >
          <Grid container alignItems="left" className={classes.paperGrid}>
            <Typography
              className={`
                ${classes.infoHeader}
                ${isParentActive ? classes.infoHeaderActive : ""}
              `}
              style={{ marginLeft: "8px" }}
            >
              {category.title}
            </Typography>
            {category.children && (
              <Box
                className={classes.expandButton}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleParentExpansion(category.title);
                }}
              >
                {activeParent === category.title ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Box>
            )}
          </Grid>
        </Paper>
        {category.children && activeParent === category.title && (
          <Grid item xs={12}>
            <Box className={classes.subMenu} style={{ marginTop: "10px" }}>
              {category.children.map((child, childIndex) => (
                <Paper
                  key={childIndex}
                  className={`
                    ${classes.paper}
                    ${classes.subPaper}
                    ${selectedItem?.title === child.title ? classes.paperActive : ""}
                  `}
                  onClick={() => handleChildClick(child)}
                >
                  <Link to={child.path} className={classes.linkStyle}>
                    <Grid container alignItems="left">
                      <Typography
                        className={`
                          ${classes.infoHeader}
                          ${selectedItem?.title === child.title ? classes.infoHeaderActive : ""}
                        `}
                        style={{ marginLeft: "8px" }}
                      >
                        {child.title}
                      </Typography>
                    </Grid>
                  </Link>
                </Paper>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    );
  });
  

  return (
    <div className={classes.main}>
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={12} sm={2}>
          <Card style={{ paddingBottom: "30px", maxHeight: "84vh" }}>
            {renderCategoriesAndSubmenus}
          </Card>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} sm={10}>
          <Card style={{ maxHeight: "84vh" }}>
            <Grid container>
              {selectedItem ? (
                <Outlet />
              ) : (
                <Box style={tabLabelStyle}>
                  {selectedItem ? selectedItem.title : "Test Case"}
                </Box>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
