import React, { useState, useRef } from "react";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Grid,
  Modal,
  Button,
  MenuItem,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core/";
import { Avatar } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

import { useStyles } from "./styles";
import Navigations from "../Routes/Navigations";
import { LogoutIcon, UserIcon } from "../comman/icons";
import { Box } from "@mui/material";

export default function MiniDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const anchorRef = useRef(null);
  const [menustate] = useState(true);
  const [showmodel, setshowmodel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const userData = useSelector((store) => store.auth.userData);
  const getName = () => {
    const email = sessionStorage.getItem("email");
    const i = email.indexOf("@");
    const name = email.substring(0, i);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
    navigate("/");
  };
  const handleMouseOver = () => {
    setShowMenu(true);
  };

  const handleMouseOut = () => {
    setShowMenu(false);
  };
  const isActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/testLab");
  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* Header Bar ...........  */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: menustate,
        })}
      >
        <Toolbar>
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item>
              <img src={"/images/Logo_GhostQA.svg"} alt="logo" />{" "}
            </Grid>
            <Grid item>
              <Link
                to="/"
                className={`${classes.linkStyle} ${
                  isActive && classes.activeLink
                }`}
              >
                Functional
              </Link>
            </Grid>
            <Grid item>
              <Link
                className={`${classes.linkStyle} ${
                  location.pathname.slice(0, 5) === "/api" && classes.activeLink
                }`}
              >
                API
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/performance"
                className={`${classes.linkStyle} ${
                  location.pathname === "/performance" && classes.activeLink
                }`}
              >
                Performance
              </Link>
            </Grid>
          </Grid>

          {/* <Grid container justifyContent="flex-end" spacing={2} style={{border:'1px solid red'}}>
            <Grid item> */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "5px" }}>
                  <Avatar sx={{ m: 1, bgcolor: "#654DF7" }} src="" />
                </Box>
                <Box>
                  <Box
                    style={{
                      paddingTop: "5px",
                      alignItems: "flex-start",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                    ref={anchorRef}
                    aria-controls={showMenu ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={setShowMenu}
                  >
                    <Typography
                      className={classes.profileEmail}
                      ref={anchorRef}
                      aria-controls={showMenu ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      {getName()}
                      {showMenu ? <ArrowDropUp /> : <ArrowDropDown />}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Popper
                open={showMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                className={classes.mainPoper}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <ClickAwayListener onClickAway={() => setShowMenu(false)}>
                        <MenuList
                          autoFocusItem={showMenu}
                          id="menu-list-grow"
                          onKeyDown={() => setShowMenu(false)}
                          className={classes.customMenuList}
                        >
                          <MenuItem
                            onClick={() => {
                              setShowMenu(false);
                              navigate("/myaccount");
                            }}
                          >
                            <UserIcon />
                            <span style={{ marginLeft: "10px" }}>
                              My Account
                            </span>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setShowMenu(false);
                              setshowmodel(true);
                            }}
                          >
                            <LogoutIcon />
                            <span style={{ marginLeft: "10px" }}>Log out</span>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            {/* </Grid>
          </Grid> */}
        </Toolbar>
      </AppBar>

      {/* pages ............ */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* here comes stack  */}
        <Navigations />
      </main>

      {/* model */}
      <Modal
        open={showmodel}
        onClose={() => setshowmodel(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.model}>
          <p id="simple-modal-description" className={classes.modelPara}>
            Hi,{userData.u_first_name} are you sure you want to logout?
          </p>
          <Grid
            container
            className={classes.buttonMain}
            justifyContent="center"
          >
            <Grid item>
              <Button
                className={classes.buttonyes}
                variant="contained"
                size="large"
                style={{
                  marginRight: "10px",
                  backgroundColor: "#654DF7",
                  height: "40px",
                  width: "120px",
                }}
                color="primary"
                onClick={() => handleLogout()}
              >
                YES
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.buttonNo}
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#6c757d",
                  width: "120px",
                  height: "40px",
                }}
                color="primary"
                onClick={() => setshowmodel(false)}
              >
                NO
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
