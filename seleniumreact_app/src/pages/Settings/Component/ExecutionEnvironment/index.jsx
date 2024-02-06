import React, { useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { EnvironmentTable } from "./EnvironmentTable";
import { Button } from "@mui/material";
import SearchField from "../../../../comman/SearchField";
import AddNewEnvironment from "./AddNewEnvironment";
import EditNewEnvironment from "./EditNewEnvironment";
import useEnvironment from "../../../../hooks/useEnvironment";



export default function ExecutionEnvironment() {
    const{
      searchTerm,
       showAddNewEnvironment,
       handleBackFromAddNew,
       showEditNewEnvironment,
       editEnvironmentData,
       handleAddEnvironment,
       setSearchTerm,
       handleEditEnvironment,
       environementList
    }=useEnvironment();
  const classes = useStyles();
  
  
  
  console.log("listenv",environementList);
  const filteredData = environementList
  ? environementList.filter((data) =>
      data?.EnvironmentName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  : [];

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
          <Grid item xs={6}  className={`${classes.header}`}>
          <div className={classes.highlight}>Enviroment</div>
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