import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useStyles } from "./styles";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Add } from "@mui/icons-material";
import TableTestCase from "./TableTestCase";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Typography } from "@mui/material";

export default function Design() {
    const classes = useStyles();
    
    return (
        <Grid container alignItems="center" style={{
            margin: '20px 0px',
            border: 'solid 2px #DADADA',
            borderRadius: '5px',
            padding: '10px'
        }}>


            <Grid container alignItems="center" style={{
                margin: '20px 0px',

            }}>
                <Grid item xs={8} style={{ display: 'flex',alignItems: 'center' }} >
                    <Typography>
                        Summary
                    </Typography>


                    <List sx={{ width: '100%', }} style={{ display: 'flex' }}>
                        <ListItem
                            key={'LocationOnOutlinedIcon'}
                            disableGutters

                        >
                            <LocationOnOutlinedIcon sx={{ color: '#654df7' }} />
                            <ListItemText primary={`10 locations`} />
                        </ListItem>
                        <ListItem
                            key={'FeaturedPlayListOutlinedIcon'}
                            disableGutters

                        >
                            <FeaturedPlayListOutlinedIcon sx={{ color: '#654df7' }}/>
                            <ListItemText primary={` 20 scenarios`} />
                        </ListItem>
                        <ListItem
                            key={'PersonOutlineOutlinedIcon'}
                            disableGutters

                        >
                            <PersonOutlineOutlinedIcon sx={{ color: '#654df7' }}/>
                            <ListItemText primary={`100 VU`} />
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
                            padding: "12px 18px"
                        }}
                    >
                        <PlayCircleOutlineIcon /> Run Now
                    </Button>

                </Grid>

            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <TableTestCase />
                </Grid>
                <Grid item xs={12}>
                 
                </Grid>
            </Grid>
            <Button
                variant="contained"

                style={{
                    fontSize: 14,
                    backgroundColor: "rgb(101, 77, 247)",
                    color: "#ffffff",
                    cursor: "pointer",
                    padding: "12px 18px",
                    marginTop: '10px',
                    marginLeft: "auto",
                }}
            >
                Add
            </Button>

        </Grid>
    );
}