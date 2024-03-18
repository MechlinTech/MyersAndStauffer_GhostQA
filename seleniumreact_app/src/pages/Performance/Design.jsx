import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import Button from "@mui/material/Button";
import { useStyles } from "./styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Add } from "@mui/icons-material";
import TableTestCase from "./TableTestCase";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Typography } from "@mui/material";

export default function Design({ addTestCase }) {
  const classes = useStyles();
  useEffect(()=>{
    console.log('in side design ',addTestCase)
  },[addTestCase])
  const [showAddNewElement, setShowAddNewElement] = useState(true);
  return (
    <Grid
      container
      alignItems="center"
      style={{
        margin: "20px 0px",
        border: "solid 2px #DADADA",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Grid
        container
        alignItems="center"
        style={{
          margin: "20px 0px",
        }}
      >
        <Grid item xs={8} style={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{
            fontFamily: 'Lexend Deca',
            fontSize:'18px',
            fontWeight:'500'
          }}>Summary</Typography>

          <List
            sx={{ width: "100%" }}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ListItem
              key={"LocationOnOutlinedIcon"}
              disableGutters
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "28%",
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ color: "#654df7" }}
                style={{ marginRight: "8px" }}
              />
              <ListItemText primary={<span style={{
                fontFamily: 'Lexend Deca',
                fontSize:'14px',
              }}>10 locations</span>} />
            </ListItem>
            <ListItem
              key={"FeaturedPlayListOutlinedIcon"}
              disableGutters
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "28%",
              }}
            >
              <FeaturedPlayListOutlinedIcon
                sx={{ color: "#654df7" }}
                style={{ marginRight: "8px" }}
              />
              <ListItemText primary={<span style={{
                fontFamily: 'Lexend Deca',
                fontSize:'14px',
              }}>20 scenarios</span>} />
            </ListItem>
            <ListItem
              key={"PersonOutlineOutlinedIcon"}
              disableGutters
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "25%",
              }}
            >
              <PersonOutlineOutlinedIcon
                sx={{ color: "#654df7" }}
                style={{ marginRight: "8px" }}
              />
              <ListItemText primary={<span style={{
                fontFamily: 'Lexend Deca',
                fontSize:'14px',
              }}>100 VU</span>} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            style={{
              fontSize: 14,
              backgroundColor: "rgb(101, 77, 247)",
              color: "#ffffff",
              cursor: "pointer",
              padding: "12px 18px",
            }}
          >
            <PlayCircleOutlineIcon /> Run Now
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <TableTestCase
            addTestCase={addTestCase}
            setShowAddNewElement={setShowAddNewElement}
            showAddNewElement={showAddNewElement}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      {showAddNewElement && (
        <Button
          variant="contained"
          onClick={() => setShowAddNewElement(!showAddNewElement)}
          style={{
            fontSize: 14,
            backgroundColor: "rgb(101, 77, 247)",
            color: "#ffffff",
            cursor: "pointer",
            padding: "12px 18px",
            marginTop: "10px",
            marginLeft: "auto",
          }}
        >
          Add more test
        </Button>
      )}
    </Grid>
  );
}
