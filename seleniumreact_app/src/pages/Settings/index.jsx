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
import { getUserId } from "../../redux/actions/authActions";

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(() => {
    const storedItem = sessionStorage.getItem("selectedChild");
    if (storedItem) {
      try {
        return flatted.parse(storedItem);
      } catch (error) {
        console.error("Error parsing stored item:", error);
        return null;
      }
    }
    return null;
  });

  const tabLabelStyle = {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px",
    padding: "10px 22px",
  };

  const [activeParent, setActiveParent] = useState(() => {
    const storedItem = sessionStorage.getItem("selectedParent");
    if (storedItem) {
      try {
        const parentData = flatted.parse(storedItem);
        return parentData?.title || null;
      } catch (error) {
        console.error("Error parsing stored item:", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    dispatch(getTestSuitesList());
    dispatch(GetApplication());
    dispatch(GetBrowser());
  }, [dispatch]);

  const handleItemClick = (category) => {
    try {
      const categoryData = flatted.stringify(category);
      sessionStorage.setItem("selectedParent", categoryData);
      // setSelectedItem(category);

      if (activeParent === category?.title) {
        setActiveParent(null);
      } else {
        setActiveParent(category.title);
        if (category.title === "User Account") {
          dispatch(getUserId());
        }
      }
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  };

  const handleChildClick = (child) => {
    const childData = flatted.stringify(child);
    sessionStorage.setItem("selectedChild", childData);
    setSelectedItem(child);
    // const parentCategory = categories.find(
    //   (category) =>
    //     category?.children &&
    //     category?.children.some((c) => c.title === child.title)
    // );
    // if (parentCategory) {
    //   setActiveParent(parentCategory.title);
    // }
  };

  const toggleParentExpansion = (parentTitle) => {
    setActiveParent((prev) => (prev === parentTitle ? null : parentTitle));
  };

  const categories = [
    {
      title: "User Account",
      path: "/settings/detail",
      children: [
        {
          title: "Detail",
          path: "/settings/detail",
        },
        {
          title: "Organization",
          path: "/settings/organization",
        },
      ],
    },
    {
      title: "Organizational Setting",
      path: "/settings/members",
      children: [
        {
          title: "Members List",
          path: "/settings/members",
        },
      ],
    },
    {
      title: "Performance",
      path: "/settings/location",
      children: [
        {
          title: "In-Private Locations",
          path: "/settings/location",
        },
        {
          title: "Integration",
          path: "/settings/on-prem/integration",
        },
      ],
    },
    {
      title: "Functional - Local Testing",
      path: "/settings",
      children: [
        {
          title: "Application",
          path: "/settings/application",
        },
        {
          title: "Browser",
          path: "/settings/browser",
        },
        {
          title: "Environment",
          path: "/settings/environment",
        },
        {
          title: "Test Users",
          path: "/settings/test-user",
        },
        {
          title: "Integration",
          path: "",
          path: "/settings/integration",
        },
      ],
    },
    {
      title: "Functional - Test Lab",
      path: "/settings",
      children: [
        {
          title: "Application",
          path: "/settings/test-lab-application",
        },
        {
          title: "Browser",
          path: "/settings/test-lab-browser",
        },
        {
          title: "Environment",
          path: "/settings/test-lab-environment",
        },
        {
          title: "Test Users",
          path: "/settings/test-lab-test-user",
        },
        {
          title: "Integration",
          path: "",
          path: "/settings/on-prem/integration",
        },
      ],
    },
  ];

  // Function to render categories and their submenus
  const renderCategoriesAndSubmenus = categories?.map((category, index) => {
    const isParentActive =
      category.title === activeParent &&
      category.children.every((child) => child.title !== selectedItem?.title);

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
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <Box className={classes.subMenu}>
              {category.children?.map((child, childIndex) => (
                <Link
                  to={child.path}
                  className={classes.linkStyle}
                  key={childIndex}
                >
                  <Paper
                    className={`
                    ${classes.paper}
                    ${classes.subPaper}
                    ${
                      selectedItem?.title === child.title
                        ? classes.paperActive
                        : ""
                    }
                  `}
                    onClick={() => handleChildClick(child)}
                  >
                    <Grid container alignItems="left">
                      <Typography
                        className={`
                          ${classes.infoHeader}
                          ${
                            selectedItem?.title === child.title
                              ? classes.infoHeaderActive
                              : ""
                          }
                        `}
                        style={{ marginLeft: "8px" }}
                      >
                        {child.title}
                      </Typography>
                    </Grid>
                  </Paper>
                </Link>
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
        <Grid item xs={12} sm={3} xl={2}>
          <Card style={{ paddingBottom: "30px", maxHeight: "84vh" }}>
            {renderCategoriesAndSubmenus}
          </Card>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} sm={9} xl={10}>
          <Card style={{ maxHeight: "84vh" }}>
            <Grid container>
              <Outlet />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
