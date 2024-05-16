import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddLocation from "./AddLocation";
import { LocationTable } from "./LocationTable";
import { getLocationList } from "../../../../../redux/actions/locationAction";

export default function Location() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { locationList } = useSelector((state) => state.location);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getLocationList())
  },[])

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddApplication = () => {
    setOpenModal(true);
  };

  return (
    <>
      <AddLocation open={openModal} onClose={handleClose} />

      <Grid
        container
        className={classes.header}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6} className={classes.header}>
          <div className={classes.highlight}>In Private Location</div>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            onClick={handleAddApplication}
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
            Add New Location
          </Button>
        </Grid>
      </Grid>
      {/* Body */}

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", margin: "20px" }}>
            <Grid item>
              <LocationTable rows={locationList} />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
