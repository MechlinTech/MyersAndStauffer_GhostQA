import React from 'react'
import { useStyles } from '../../Layout/styles'
import { Link, Outlet, useLocation } from 'react-router-dom';
import {Grid } from '@material-ui/core';

export default function Functional() {
    const classes = useStyles()
    const location = useLocation()
  return (
    <>
        <Grid container alignItems="center" style={{ padding: "0 20px" }}>
            <Grid item>
            <Link
              to="/"
              className={`${classes.linkStyle} ${
                location.pathname === "/" && classes.activeLink
              }`}
            >
              Home
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="/settings/Environment"
              className={`${classes.linkStyle} ${
                location.pathname.slice(0,9) === "/settings" && classes.activeLink
              }`}
              style={{ marginLeft: "20px" }}
            >
              Settings
            </Link>
          </Grid>
        </Grid>
        <Outlet/>
      </>
  )
}