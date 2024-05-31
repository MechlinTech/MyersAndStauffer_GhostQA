import React from 'react';
import { useStyles } from '../../Layout/styles';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { StyledDashBoardIcon } from '../../comman/icons';
import * as Flatted from 'flatted';

export default function Functional() {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <Grid container alignItems="center" style={{ marginTop:"-7px",height:"50px" ,padding: "0 20px", position: "fixed", background: '#fafafa', zIndex: 1000, width: '100%' }}>
                <Grid item>
                    <Link
                        to="/"
                        className={`${classes.linkStyle} ${location.pathname === "/" && classes.activeLink}`}
                    >
                        Home
                    </Link>
                </Grid>
                <Grid item>
                    <Link
                        to="/settings/Environment"
                        className={`${classes.linkStyle} ${location.pathname.startsWith("/settings") && classes.activeLink}`}
                        style={{ marginLeft: "20px" }}
                        onClick={() => {
                            sessionStorage.setItem("selectedCategory", Flatted.stringify({
                                title: "Environment",
                                icon: <StyledDashBoardIcon />,
                                path: "/",
                            }));
                        }}
                    >
                        Settings
                    </Link>
                </Grid>
                <Grid item>
                   
                    <Link
                        to="/testLab"
                        style={{ marginLeft: "20px" }}
                        className={`${classes.linkStyle} ${location.pathname.startsWith("/testLab") && classes.activeLink}`}
                    >
                         Test Lab
                    </Link>
                </Grid>
                <Grid item>
                   
                    {/* <Link
                        to="/testcase"
                        style={{ marginLeft: "20px" }}
                        className={`${classes.linkStyle} ${location.pathname.startsWith("/testcase") && classes.activeLink}`}
                    >
                         Test Cases
                    </Link> */}
                </Grid>
            </Grid>
            
            <div style={{ paddingTop: '30px' }}>
                <Outlet />
            </div>
        </>
    );
}
