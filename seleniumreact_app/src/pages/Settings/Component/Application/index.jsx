import React, { useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@mui/material";
import SearchField from "../../../../comman/SearchField";
import { CustomTable } from "./CustomTable";

const staticData = [
  {
    projectName: "ClockSession",
    applicationName: "Test App",
    email:"test@gmail.com",
    runnerPath:'D://test/'
  },
  {
    projectName: "Ghost Qa",
    applicationName: "Test App",
    email:"test@gmail.com",
    runnerPath:'D://test/'
  },
 
];

export default function Application() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddEnvironment = () => {
   console.log("hii")
  };

  const filteredData = staticData?.filter((data) =>
    data?.projectName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );


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
          Application
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            onClick={handleAddEnvironment}
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
            Add New Application
          </Button>
        </Grid>
      </Grid>

      {/* Body */}

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Card style={{ textAlign: "center", margin: "20px" }}>
            <Grid item style={{ margin: "8px 20px" }}>
              <SearchField
                placeholder="Search application..."
                onChange={(value) => setSearchTerm(value)}
              />
            </Grid>
            <Grid item>
              <CustomTable rows={filteredData} />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
