import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddLocation from "./AddLocation";
import { LocationTable } from "./LocationTable";
import { getLocationList } from "../../../../../redux/actions/locationAction";

let data = [
  {
    ApplicationId: 1000,
    ApplicationName: "Anish1",
  },
  {
    ApplicationId: 1001,
    ApplicationName: "dev23",
  },
  {
    ApplicationId: 1003,
    ApplicationName: "fas-dev",
  },
  {
    ApplicationId: 1005,
    ApplicationName: "dhas-dhd",
  },
  {
    ApplicationId: 1006,
    ApplicationName: "clocksession",
  },
];

let location = [{
  "id": 1,
  "ref": "ebaf2d5a-37f8-4189-8715-c33403b77f09",
  "location_name": "Private Location 1",
  "parallel_engine_runs": 1,
  "functionality": "performance",
  "location_type": "unshared",
  "max_threads_per_engine": 50,
  "console_xms_mb": 1024,
  "console_xmx_mb": 4096,
  "created_at": "2024-05-07T14:21:12.847866Z",
  "updated_at": "2024-05-07T14:21:12.847895Z"
}]

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
            // onClick={handleAddApplication}
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
