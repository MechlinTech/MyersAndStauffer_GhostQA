import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@mui/material";
import SearchField from "../../../../comman/SearchField";
import { CustomTable } from "./CustomTable";
import AddNewApplication from "./AddNewApplication";
import { useDispatch, useSelector } from "react-redux";
import { GetApplication } from "../../../../redux/actions/seleniumAction";
const staticData = [
  {
    projectName: "ClockSession",
    applicationName: "Test App",
    email: "test@gmail.com",
    runnerPath: "D://test/",
  },
  {
    projectName: "Ghost Qa",
    applicationName: "Test App",
    email: "test@gmail.com",
    runnerPath: "D://test/",
  },
];

export default function Application() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [addOredit, setaddOredit] = useState("");
  const [applicationToEdit, setApplicationToEdit] = useState({});
  const [showAddNewApplication, setShowAddNewApplication] = useState(false);
  const { applicationList } = useSelector((state) => state.selenium);

  // useEffect(() => {
  //   dispatch(GetApplication())
  // }, [])

  const handleAddApplication = () => {
    setShowAddNewApplication(true);
    setaddOredit("Add");
    console.log("Adding Environment...");
  };

  const handleEditApplication = (row) => {
    setaddOredit("Edit");
    setApplicationToEdit(row);
    setShowAddNewApplication(true);
  };

  const handleBackFromAddNew = () => {
    setShowAddNewApplication(false);
    setApplicationToEdit({})
  };

  const filteredData = applicationList?.filter((data) =>
    data?.ApplicationName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  console.log("filtered : ", filteredData);
  return (
    <>
      {showAddNewApplication ? (
        <AddNewApplication
          onBack={handleBackFromAddNew}
          addOredit={addOredit}
          applicationToEdit={applicationToEdit}
          setApplicationToEdit={setApplicationToEdit}
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
            Application
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
              Add New Application
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Body */}

      {!showAddNewApplication && (
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
                <CustomTable
                  rows={filteredData}
                  handleEditApplication={handleEditApplication}
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}
