import React, { useEffect } from 'react';
import { Grid, Typography, Paper, Box, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useStyles } from './styles';
import { getTestSuitesList } from '../../redux/actions/settingAction';
import { GetApplication, GetBrowser } from '../../redux/actions/seleniumAction';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { getUserId } from '../../redux/actions/authActions';
import { setActiveParent, setSelectedItem } from './../../redux/actions/settingAction';

export default function Settings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { activeParent } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getTestSuitesList());
    dispatch(GetApplication());
    dispatch(GetBrowser());
  }, [dispatch]);

  useEffect(() => {
    if (!location.pathname.startsWith('/settings')) {
      dispatch(setActiveParent(null));
      dispatch(setSelectedItem(null));
    }
  }, [location.pathname, dispatch]);

  const handleItemClick = (category) => {
    if (activeParent === category?.title) {
      dispatch(setActiveParent(null));
    } else {
      dispatch(setActiveParent(category.title));
      if (category.title === 'User Account') {
        dispatch(getUserId());
      }
    }
  };

  const handleChildClick = (child) => {
    dispatch(setSelectedItem(child));
  };

  const toggleParentExpansion = (parentTitle) => {
    dispatch(setActiveParent((prev) => (prev === parentTitle ? null : parentTitle)));
  };

  const categories = [
    {
      title: 'User Account',
      path: '/settings/detail',
      children: [
        {
          title: 'Detail',
          path: '/settings/detail',
        },
        {
          title: 'Organization',
          path: '/settings/organization',
        },
      ],
    },
    {
      title: 'Organizational Setting',
      path: '/settings/members',
      children: [
        {
          title: 'Members List',
          path: '/settings/members',
        },
      ],
    },
    {
      title: 'Performance',
      path: '/settings/location',
      children: [
        {
          title: 'In-Private Locations',
          path: '/settings/location',
        },
        {
          title: 'Integration',
          path: '/settings/on-prem/integration',
        },
      ],
    },
    {
      title: 'Functional - Local Testing',
      path: '/settings',
      children: [
        {
          title: 'Application',
          path: '/settings/application',
        },
        {
          title: 'Browser',
          path: '/settings/browser',
        },
        {
          title: 'Environment',
          path: '/settings/environment',
        },
        {
          title: 'Test Users',
          path: '/settings/test-user',
        },
        {
          title: 'Integration',
          path: '/settings/integration',
        },
      ],
    },
    {
      title: 'Functional - Test Lab',
      path: '/settings',
      children: [
        {
          title: 'Application',
          path: '/settings/test-lab-application',
        },
        {
          title: 'Browser',
          path: '/settings/test-lab-browser',
        },
        {
          title: 'Environment',
          path: '/settings/test-lab-environment',
        },
        {
          title: 'Test Users',
          path: '/settings/test-lab-test-user',
        },
        {
          title: 'Integration',
          path: '/settings/on-prem/integration',
        },
      ],
    },
  ];

  const renderCategoriesAndSubmenus = categories?.map((category, index) => {
    const isParentActive = category.title === activeParent;

    return (
      <Grid item key={index} xs={12}>
        <Paper
          className={`${classes.paper} ${isParentActive ? classes.paperActive : ''}`}
          onClick={() => handleItemClick(category)}
        >
          <Grid container alignItems="left" className={classes.paperGrid}>
            <Typography
              className={`${classes.infoHeader} ${isParentActive ? classes.infoHeaderActive : ''}`}
              style={{ marginLeft: '8px' }}
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
                {isParentActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Box>
            )}
          </Grid>
        </Paper>
        {category.children && isParentActive && (
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            <Box className={classes.subMenu}>
              {category.children?.map((child, childIndex) => {
                const isChildActive = location.pathname === child.path;
                return (
                  <Link to={child.path} className={classes.linkStyle} key={childIndex}>
                    <Paper
                      className={`${classes.paper} ${classes.subPaper} ${
                        isChildActive ? classes.paperActive : ''
                      }`}
                      onClick={() => handleChildClick(child)}
                    >
                      <Grid container alignItems="left">
                        <Typography
                          className={`${classes.infoHeader} ${
                            isChildActive ? classes.infoHeaderActive : ''
                          }`}
                          style={{ marginLeft: '8px' }}
                        >
                          {child.title}
                        </Typography>
                      </Grid>
                    </Paper>
                  </Link>
                );
              })}
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
          <Card style={{ paddingBottom: '30px', maxHeight: '84vh' }}>{renderCategoriesAndSubmenus}</Card>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} sm={9} xl={10}>
          <Card style={{ maxHeight: '84vh' }}>
            <Grid container>
              <Outlet />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
