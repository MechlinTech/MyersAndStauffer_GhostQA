import React from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { useStylesTestCase } from "./styles";
import Button from '@mui/material/Button';
import TableTestCase from "./TableTestCase";
import { useNavigate } from "react-router-dom";


export default function AddTestCase() {
  const classes = useStylesTestCase();
  const navigate = useNavigate()
  
  return (
    <>
  <Grid
          container
          className={classes.header}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}  className={`${classes.header}`}>
          <div className={classes.highlight}>Folder (Testcase)</div>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              //onClick={handleAddEnvironment}
              sx={{
                backgroundColor: "rgb(101, 77, 247)",
                "&:hover": {
                  backgroundColor: "rgb(101, 77, 247) !important",
                  borderColor: "#654DF7",
                  color: "#fff",
                  "&:before": {
                    backgroundColor: "rgb(101, 77, 247) !important",
                    color: "#fff",
                  },
                },
                color: "#fff",
              }}
              onClick={()=>navigate('/testLab/createTestcase')}
            >
              Add New TestCase
            </Button>
          </Grid>
        </Grid>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Card style={{ textAlign: "center", margin: "20px" }}>
             
              <Grid item>
               <TableTestCase />
              </Grid>
            </Card>
          </Grid>
        </Grid>
    </>
  );
}