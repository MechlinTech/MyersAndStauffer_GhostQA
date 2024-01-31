import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { EnvironmentTable } from "./EnvironmentTable";
import { Button } from "@mui/material";
import SearchField from "../../../../comman/SearchField";
import AddNewEnvironment from "./AddNewEnvironment";
import EditNewEnvironment from "./EditNewEnvironment";

const staticData = [
  {
    EnvironmentName: "Dev",
    EnvironmentDescription: "Development",
    application: "clocksession",
    browser:"chrome",
    baseUrl: "https://codearrest.dyndns.org/",
    DriverPath:"C:\\GhostQA\\MyersAndStauffer_GhostQA\\TestSeleniumReport\\wwwroot\\",
    BasePath:"C:\\GhostQA\\MyersAndStauffer_GhostQA\\TestSeleniumReport\\wwwroot\\"
  },
  {
    EnvironmentName: "QA",
    EnvironmentDescription: "QA For Test",
    application: "Ghost-Qa",
    browser:"chrome",
    baseUrl: "https://codearrest.dyndns.org/",
    DriverPath:"C:\\GhostQA\\MyersAndStauffer_GhostQA\\TestSeleniumReport\\wwwroot\\",
    BasePath:"C:\\GhostQA\\MyersAndStauffer_GhostQA\\TestSeleniumReport\\wwwroot\\"
  },
  {
    EnvironmentName: "PROD",
    EnvironmentDescription: "Production",
    application: "clocksession-prod",
    browser:"chrome",
    baseUrl: "https://codearrest.dyndns.org/",
    DriverPath:"C:\\GhostQA\\MyersAndStauffer_GhostQA\\TestSeleniumReport\\wwwroot\\",
    BasePath:"C:\\GhostQA\\MyersAndStauffer_GhostQA\\TestSeleniumReport\\wwwroot\\"
  },
];

export default function ExecutionEnvironment() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddNewEnvironment, setShowAddNewEnvironment] = useState(false);
  const [showEditNewEnvironment, setShowEditNewEnvironment] = useState(false);
  const [editEnvironmentData, setEditEnvironmentData] = useState(null);
  const { environementList} =useSelector((state) => state.selenium);
  console.log("environments",environementList);
  const handleAddEnvironment = () => {
    setShowAddNewEnvironment(true);
    console.log("Adding Environment...");
  };

  const handleEditEnvironment = (rowData) => {
    setShowEditNewEnvironment(true);
    setEditEnvironmentData(rowData);
  };

  const handleBackFromAddNew = () => {
    setShowAddNewEnvironment(false);
    setShowEditNewEnvironment(false);
  };

  const filteredData = staticData?.filter((data) =>
    data?.EnvironmentName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <>
      {showAddNewEnvironment ? (
        <AddNewEnvironment onBack={handleBackFromAddNew} />
      ) : showEditNewEnvironment ? (
        <EditNewEnvironment
          onBack={handleBackFromAddNew}
          rowData={editEnvironmentData}
        />
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
      {!showAddNewEnvironment && !showEditNewEnvironment && (
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
                <EnvironmentTable rows={filteredData} handleEditEnvironment={handleEditEnvironment} />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}