import React, { useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { EnvironmentTable } from "./EnvironmentTable";
import { Button } from "@mui/material";
import SearchField from "../../../../comman/SearchField";
import AddNewEnvironment from "./AddNewEnvironment";

const staticData = [
  {
    EnvironmentName: "Dev",
    EnvironmentDescription: "Development",
    application:"clocksession",
    baseUrl:'https://codearrest.dyndns.org/'
  },
  {
    EnvironmentName: "QA",
    EnvironmentDescription: "QA For Test",
    application:"Ghost-Qa",
    baseUrl:'https://codearrest.dyndns.org/'
  },
  {
    EnvironmentName: "PROD",
    EnvironmentDescription: "Production",
    application:"clocksession-prod",
    baseUrl:'https://codearrest.dyndns.org/'
  },
];

export default function ExecutionEnvironment() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddNewEnvironment, setShowAddNewEnvironment] = useState(false);

  const handleAddEnvironment = () => {
    setShowAddNewEnvironment(true);
    console.log("Adding Environment...");
  };

  const filteredData = staticData?.filter((data) =>
    data?.EnvironmentName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleBackFromAddNew = () => {
    setShowAddNewEnvironment(false);
  };

  return (
    <>
      {showAddNewEnvironment ? (
        <AddNewEnvironment onBack={handleBackFromAddNew}/>
      ) : (
        <Grid
          container
          className={classes.header}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} className={classes.header}>
            Enviroment
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
              Add New Environment
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Body */}
      {!showAddNewEnvironment && (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Card style={{ textAlign: "center", margin: "20px" }}>
              <Grid item style={{ margin: "8px 20px" }}>
                <SearchField
                  placeholder="Search Environment..."
                  onChange={(value) => setSearchTerm(value)}
                />
              </Grid>
              <Grid item>
                <EnvironmentTable rows={filteredData} />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}
