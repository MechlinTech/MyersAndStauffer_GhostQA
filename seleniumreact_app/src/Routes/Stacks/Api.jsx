import React from 'react'
import { useStyles } from '../../Layout/styles'
import { Link, Outlet, useLocation } from 'react-router-dom';
import {Grid } from '@material-ui/core';

export default function Api() {
    const classes = useStyles()
    const location = useLocation()
  return (
    <>
        <Grid container alignItems="center" style={{ padding: "0 20px" }}>
            <Grid item>
            <Link
              to=""
              className={`${classes.linkStyle} ${
                location.pathname === "/test" && classes.activeLink
              }`}
            >
              api1
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="api2"
              className={`${classes.linkStyle} ${
                location.pathname === "/test/api2" && classes.activeLink
              }`}
              style={{ marginLeft: "20px" }}
            >
              api2
            </Link>
          </Grid>
        </Grid>
        <Outlet/>
      </>
  )
}
