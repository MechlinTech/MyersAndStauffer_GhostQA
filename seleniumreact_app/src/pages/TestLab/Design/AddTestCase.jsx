import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, Card } from "@material-ui/core";
import { StyledTypography, useStylesTestCase } from "../styles";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TableTestCase from "./TableTestCase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { header } from "../../../utils/authheader";
import { getBaseUrl } from "../../../utils/configService";
import { useSelector, useDispatch } from "react-redux";
import { fetchTestCases } from "../../../redux/actions/testlab/designAction";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function AddTestCase() {
  const classes = useStylesTestCase();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {selectedNodeId,selectedNode } = useSelector((state) => state.testlab);
  const {testCases,isFetching } = useSelector((state) => state.testlabTestCase);

  useEffect(() => {
    if(selectedNodeId)
    dispatch(fetchTestCases(selectedNodeId))
  }, [selectedNodeId]);

  return (
    <>
      <Grid
        container
        className={classes.header}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6} className={`${classes.header}`}>
          <div className={classes.highlight}>
            {selectedNode?.name.length > 40 ? selectedNode?.name.slice(0, 40) + "..." : selectedNode?.name}
          </div>
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
            onClick={() => navigate(`/testLab/createTestcase/${selectedNodeId}`)}
          >
            Add New Testcase
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", }}>
            <Grid item>
              {isFetching ? (
                <StyledTypography p={5}>
                  <CircularProgress
                    style={{ color: "rgb(101, 77, 247)" }}
                    size={25}
                  />
                </StyledTypography>
              ) : testCases.length !== 0 ? (
                <TableTestCase/>
              ) : (
                <StyledTypography p={5}>No test cases found</StyledTypography>
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
