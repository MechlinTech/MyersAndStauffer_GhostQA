import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import { Button } from "@mui/material";
import SearchField from "../../../../comman/SearchField";
import { CustomTable } from "./CustomTable";
import AddNewBrowser from "./AddNewBrowser";
import { useSelector,useDispatch } from "react-redux";
import { GetBrowser } from "../../../../redux/actions/seleniumAction";

export default function Browser() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const [addOredit, setaddOredit] = useState("");
  const [showAddNewBrowser, setShowAddNewBrowser] = useState(false);
  const [browserToEdit, setBrowserToEdit] = useState(null);
  const { browserList } = useSelector((state) => state.selenium);

  useEffect(()=>{
    dispatch(GetBrowser())
  },[])
  
  const handleAddBrowser = () => {
    setShowAddNewBrowser(true);
    setaddOredit("Add");
  };
 
  const handleEditBrowser = (row) => {
    setBrowserToEdit(row)
    setaddOredit("Edit");
    setShowAddNewBrowser(true);
  };

  const handleBackFromAddNew = () => {
    setShowAddNewBrowser(false);
    setBrowserToEdit(null)
  };


  const filteredData = browserList?.filter((data) =>
    data?.BrowserName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <>
      {showAddNewBrowser ? (
        <AddNewBrowser
          onBack={handleBackFromAddNew}
          addOredit={addOredit}
          browserToEdit={browserToEdit}
          setBrowserToEdit={setBrowserToEdit}
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
          <div className={classes.highlight}> Browser</div>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              onClick={handleAddBrowser}
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
              Add New Browser
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Body */}

      {!showAddNewBrowser && (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Card style={{ textAlign: "center", margin: "20px" }}>
              <Grid item style={{ margin: "8px 20px" }}>
                <SearchField
                  placeholder="Search Browser..."
                  onChange={(value) => setSearchTerm(value)}
                />
              </Grid>
              <Grid item>
                <CustomTable
                  rows={filteredData}
                  handleEditBrowser={handleEditBrowser}
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}
