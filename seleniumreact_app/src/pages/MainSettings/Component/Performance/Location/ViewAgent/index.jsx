import React, { useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@mui/material";
import { AgentTable } from "./AgentTable";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAgentById } from "../../../../../../redux/actions/locationAction";


export default function ViewAgent() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { agentsData } = useSelector((state) => state.location);
  const { id } = useParams()

  useEffect(() => {
    dispatch(getAgentById(id))
  },[])

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Grid
        container
        className={classes.header}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6} className={classes.header}>
          <div className={classes.highlight}>Agent View</div>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            onClick={handleBack}
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
          >
            Back
          </Button>
        </Grid>
      </Grid>

      {/* Body */}
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", margin: "20px" }}>
            <Grid item>
              <AgentTable rows={agentsData} />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
